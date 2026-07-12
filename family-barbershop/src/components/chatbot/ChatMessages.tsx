"use client";

import { useEffect, useRef } from "react";
import { ChatMessageBubble } from "@/components/chatbot/ChatMessage";
import { ChatTypingIndicator } from "@/components/chatbot/ChatTypingIndicator";
import type { ChatMessage } from "@/lib/chatbot/types";

export function ChatMessages({
  messages,
  isTyping,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="chatbot-messages flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
      {isTyping ? <ChatTypingIndicator /> : null}
      <div ref={endRef} className="h-px shrink-0" aria-hidden="true" />
    </div>
  );
}
