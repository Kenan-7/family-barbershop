import { NextResponse } from "next/server";
import {
  buildBusinessContext,
  CHATBOT_SYSTEM_PROMPT,
} from "@/lib/chatbot/businessContext";
import { chatbotConfig } from "@/lib/chatbot/config";
import { getFallbackResponse, parseAiJson } from "@/lib/chatbot/fallback";
import { checkRateLimit, getClientIp } from "@/lib/chatbot/rateLimit";
import { sanitizeHistory, sanitizeUserMessage } from "@/lib/chatbot/sanitize";
import type { ChatApiRequest, ChatApiResponse } from "@/lib/chatbot/types";

export const runtime = "nodejs";

async function callOpenAi(
  history: Array<{ role: "user" | "assistant"; content: string }>,
  latestMessage: string,
): Promise<ChatApiResponse | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const businessContext = buildBusinessContext();

  const messages = [
    {
      role: "system" as const,
      content: `${CHATBOT_SYSTEM_PROMPT}\n${businessContext}`,
    },
    ...history.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    { role: "user" as const, content: latestMessage },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 500,
      response_format: { type: "json_object" },
      messages,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content;
  if (!content) return null;

  return parseAiJson(content);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          message:
            "You're sending messages a bit quickly. Please wait a moment and try again, or call the shop directly.",
          source: "fallback",
        } satisfies ChatApiResponse,
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) },
        },
      );
    }

    const body = (await request.json()) as ChatApiRequest;
    const history = sanitizeHistory(body.messages, chatbotConfig.maxHistoryMessages);

    if (!history?.length) {
      return NextResponse.json({ error: "Invalid conversation history." }, { status: 400 });
    }

    const latest = history[history.length - 1];
    if (latest.role !== "user") {
      return NextResponse.json({ error: "Latest message must be from the user." }, { status: 400 });
    }

    const latestMessage = sanitizeUserMessage(
      latest.content,
      chatbotConfig.maxMessageLength,
    );

    if (!latestMessage) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const prior = history.slice(0, -1);
    let result: ChatApiResponse | null = null;

    try {
      result = await callOpenAi(prior, latestMessage);
    } catch {
      result = null;
    }

    if (!result) {
      result = getFallbackResponse(latestMessage);
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        message: chatbotConfig.errorMessage,
        source: "fallback",
      } satisfies ChatApiResponse,
      { status: 500 },
    );
  }
}
