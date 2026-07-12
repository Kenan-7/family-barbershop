"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChatHeader } from "@/components/chatbot/ChatHeader";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { ChatMessages } from "@/components/chatbot/ChatMessages";
import { ChatWelcome } from "@/components/chatbot/ChatWelcome";
import { useFocusTrap } from "@/components/chatbot/useFocusTrap";
import type { ChatMessage } from "@/lib/chatbot/types";

const PANEL_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.82,
};

export function ChatPanel({
  open,
  messages,
  isTyping,
  hasConversation,
  onClose,
  onMinimize,
  onSend,
}: {
  open: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  hasConversation: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSend: (message: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const trapRef = useFocusTrap(open);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close assistant"
            className="chatbot-backdrop fixed inset-0 z-[68] bg-black/35 backdrop-blur-[2px] sm:bg-black/20"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Family Barber Assistant"
            className="chatbot-panel fixed z-[70] flex flex-col overflow-hidden"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 10 }}
            transition={reduceMotion ? { duration: 0.01 } : PANEL_SPRING}
          >
            <div className="chatbot-panel-noise pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="chatbot-panel-glow pointer-events-none absolute inset-0" aria-hidden="true" />

            <ChatHeader onClose={onClose} onMinimize={onMinimize} />

            <div className="relative flex min-h-0 flex-1 flex-col">
              {!hasConversation ? <ChatWelcome onQuickAction={onSend} /> : null}
              {hasConversation ? <ChatMessages messages={messages} isTyping={isTyping} /> : null}
            </div>

            <ChatInput
              onSend={onSend}
              disabled={isTyping}
              showPrivacy={!hasConversation}
            />
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
