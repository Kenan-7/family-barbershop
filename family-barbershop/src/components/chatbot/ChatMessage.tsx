"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChatActionButton } from "@/components/chatbot/ChatActionButton";
import { ChatSmartCard } from "@/components/chatbot/ChatSmartCard";
import { LUXURY_EASE } from "@/lib/motion";
import type { ChatMessage } from "@/lib/chatbot/types";
import { cn } from "@/lib/cn";

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const reduceMotion = useReducedMotion();
  const isUser = message.role === "user";

  return (
    <motion.div
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
      initial={
        reduceMotion
          ? false
          : isUser
            ? { opacity: 0, x: 18 }
            : { opacity: 0, y: 12, scale: 0.98 }
      }
      animate={isUser ? { opacity: 1, x: 0 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: LUXURY_EASE }}
    >
      <div className={cn("max-w-[92%]", isUser ? "text-right" : "text-left")}>
        <div
          className={cn(
            "chatbot-bubble whitespace-pre-wrap text-sm leading-relaxed",
            isUser ? "chatbot-bubble--user" : "chatbot-bubble--assistant",
          )}
        >
          {message.content}
        </div>

        {!isUser && message.card ? <ChatSmartCard card={message.card} /> : null}

        {!isUser && message.actions && message.actions.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <ChatActionButton key={`${action.label}-${action.href}`} action={action} />
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
