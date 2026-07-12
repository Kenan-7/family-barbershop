import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/chatbot/rateLimit";
import { deliverContactMessage } from "@/lib/contact/delivery";
import type { ContactApiResponse } from "@/lib/contact/types";
import { validateContactPayload } from "@/lib/contact/validate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: "Too many requests. Please wait a few minutes or call the shop directly.",
        } satisfies ContactApiResponse,
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) },
        },
      );
    }

    const body = await request.json();
    const validation = validateContactPayload(body);

    if (!validation.ok) {
      const firstError = Object.values(validation.errors)[0] ?? "Please check the form and try again.";
      return NextResponse.json(
        { ok: false, message: firstError } satisfies ContactApiResponse,
        { status: 400 },
      );
    }

    const { delivered } = await deliverContactMessage(validation.data);

    if (!delivered) {
      return NextResponse.json(
        {
          ok: false,
          message: "We couldn't send your message right now. Please call the shop and we'll help you directly.",
        } satisfies ContactApiResponse,
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks — we received your message.",
    } satisfies ContactApiResponse);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong. Please try again or call the shop directly.",
      } satisfies ContactApiResponse,
      { status: 500 },
    );
  }
}
