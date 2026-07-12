"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ensureDefaultActions } from "@/lib/chatbot/actions";
import { chatbotConfig } from "@/lib/chatbot/config";
import type { ChatApiResponse, ChatMessage } from "@/lib/chatbot/types";

const STORAGE_KEY = "fbs-chat-session";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadStoredMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed.filter((m) => m.role !== "system") : [];
  } catch {
    return [];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(loadStoredMessages());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, hydrated]);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isTyping) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed.slice(0, chatbotConfig.maxMessageLength),
      createdAt: Date.now(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const history = [...messages, userMessage]
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-chatbotConfig.maxHistoryMessages)
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      let payload: ChatApiResponse;

      if (!response.ok) {
        if (response.status === 429) {
          payload = (await response.json()) as ChatApiResponse;
        } else {
          throw new Error("request_failed");
        }
      } else {
        payload = (await response.json()) as ChatApiResponse;
      }

      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: payload.message,
        actions: ensureDefaultActions(payload.actions),
        card: payload.card,
        createdAt: Date.now(),
        status: "sent",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;

      setError(chatbotConfig.offlineMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: chatbotConfig.offlineMessage,
          createdAt: Date.now(),
          status: "error",
          actions: ensureDefaultActions([
            {
              label: `Call ${chatbotConfig.phone}`,
              type: "phone",
              href: chatbotConfig.phoneHref,
            },
            {
              label: "View Available Times",
              type: "booking",
              href: chatbotConfig.bookingHref,
            },
          ]),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages]);

  const clearConversation = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    isTyping,
    error,
    hydrated,
    sendMessage,
    clearConversation,
    hasConversation: messages.length > 0,
  };
}
