"use client";

import { motion, useReducedMotion } from "framer-motion";
import { chatbotConfig } from "@/lib/chatbot/config";

export function ChatTypingIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex justify-start" aria-live="polite">
      <div className="chatbot-bubble chatbot-bubble--assistant inline-flex items-center gap-2.5 px-4 py-3">
        <span className="text-xs text-white/50">{chatbotConfig.typingLabel}</span>
        <span className="inline-flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-brand"
              animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.14,
                      ease: "easeInOut",
                    }
              }
            />
          ))}
        </span>
      </div>
    </div>
  );
}
