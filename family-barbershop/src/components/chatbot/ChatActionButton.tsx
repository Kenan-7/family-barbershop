"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ChatAction } from "@/lib/chatbot/types";
import { cn } from "@/lib/cn";

export function ChatActionButton({
  action,
  className,
}: {
  action: ChatAction;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isExternal =
    action.href.startsWith("http") ||
    action.href.startsWith("tel:") ||
    action.href.startsWith("mailto:");

  return (
    <motion.a
      href={action.href}
      target={isExternal && !action.href.startsWith("tel:") ? "_blank" : undefined}
      rel={isExternal && !action.href.startsWith("tel:") ? "noopener noreferrer" : undefined}
      className={cn(
        "chatbot-action-btn inline-flex min-h-10 items-center justify-center rounded-full border border-brand/25 bg-brand/[0.08] px-4 py-2 text-xs font-semibold text-brand-2",
        className,
      )}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.22), 0 0 16px rgba(197,157,95,0.12)",
              borderColor: "rgba(197, 157, 95, 0.45)",
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      {action.label}
    </motion.a>
  );
}
