"use client";

import { motion, useReducedMotion } from "framer-motion";
import { chatbotConfig } from "@/lib/chatbot/config";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ChatWelcome({ onQuickAction }: { onQuickAction: (message: string) => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-5 px-5 py-6"
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={staggerContainer(0.05, 0.06)}
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.35, ease: LUXURY_EASE }}>
        <p className="text-base font-semibold text-white/92">{chatbotConfig.welcomeGreeting}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{chatbotConfig.welcomeMessage}</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-2.5"
        variants={fadeUp}
        transition={{ duration: 0.35, ease: LUXURY_EASE }}
      >
        {chatbotConfig.quickActions.map((action) => (
          <motion.button
            key={action.id}
            type="button"
            onClick={() => onQuickAction(action.message)}
            className="chatbot-quick-action group flex min-h-[52px] items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-left"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <span className="text-base" aria-hidden="true">
              {action.emoji}
            </span>
            <span className="text-xs font-semibold text-white/78 group-hover:text-brand-2">
              {action.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
