"use client";

import { FormEvent, useState } from "react";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { chatbotConfig } from "@/lib/chatbot/config";
import { cn } from "@/lib/cn";

export function ChatInput({
  onSend,
  disabled,
  showPrivacy,
}: {
  onSend: (message: string) => void;
  disabled?: boolean;
  showPrivacy?: boolean;
}) {
  const [value, setValue] = useState("");
  const reduceMotion = useReducedMotion();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div className="chatbot-input-wrap relative shrink-0 px-5 py-4">
      {showPrivacy ? (
        <p className="mb-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/42">
          {chatbotConfig.privacyNotice}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-1 px-1">
            <button
              type="button"
              disabled
              aria-hidden="true"
              tabIndex={-1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/18"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              aria-hidden="true"
              tabIndex={-1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/18"
            >
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              aria-hidden="true"
              tabIndex={-1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/18"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>

          <label htmlFor="chatbot-message" className="sr-only">
            Message Family Barber Assistant
          </label>
          <textarea
            id="chatbot-message"
            rows={1}
            value={value}
            disabled={disabled}
            maxLength={chatbotConfig.maxMessageLength}
            placeholder={chatbotConfig.inputPlaceholder}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            className="chatbot-input min-h-12 max-h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/45 disabled:opacity-50"
          />
        </div>

        <motion.button
          type="submit"
          disabled={disabled || !value.trim()}
          className={cn(
            "chatbot-send-btn inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-black",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-35",
          )}
          aria-label="Send message"
          whileHover={reduceMotion ? undefined : { y: -2, boxShadow: "0 0 28px rgba(197,157,95,0.35)" }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </form>
    </div>
  );
}
