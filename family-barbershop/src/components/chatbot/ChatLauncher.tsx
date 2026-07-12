"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { chatbotConfig } from "@/lib/chatbot/config";
import { useDisableDecorativeMotion } from "@/lib/mobilePerformance";
import { cn } from "@/lib/cn";

export function ChatLauncher({
  open,
  onToggle,
  showTooltip,
  onDismissTooltip,
}: {
  open: boolean;
  onToggle: () => void;
  showTooltip: boolean;
  onDismissTooltip: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const disableDecorativeMotion = useDisableDecorativeMotion();
  const motionOff = reduceMotion || disableDecorativeMotion;
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (motionOff) {
        onToggle();
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      setRipple({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: Date.now(),
      });
      onToggle();
    },
    [onToggle, motionOff],
  );

  return (
    <div className="chatbot-launcher-wrap fixed z-[65]">
      <AnimatePresence>
        {showTooltip && !open ? (
          <motion.div
            key="tooltip"
            initial={motionOff ? false : { opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={motionOff ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="chatbot-tooltip mb-3"
            role="status"
          >
            <p className="text-sm text-white/82">{chatbotConfig.inactivityTooltip}</p>
            <button
              type="button"
              onClick={onDismissTooltip}
              className="mt-2 text-[11px] font-medium text-white/42 transition hover:text-white/65"
            >
              Dismiss
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-controls="family-barber-chat-panel"
        className={cn(
          "chatbot-launcher group relative overflow-hidden",
          open ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        animate={
          motionOff
            ? undefined
            : {
                boxShadow: [
                  "0 10px 36px rgba(0,0,0,0.42), 0 0 24px rgba(197,157,95,0.10)",
                  "0 14px 42px rgba(0,0,0,0.46), 0 0 38px rgba(197,157,95,0.20)",
                  "0 10px 36px rgba(0,0,0,0.42), 0 0 24px rgba(197,157,95,0.10)",
                ],
              }
        }
        transition={
          motionOff ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={motionOff ? undefined : { y: -2 }}
        whileTap={motionOff ? undefined : { scale: 0.98 }}
      >
        {ripple ? (
          <motion.span
            key={ripple.id}
            className="chatbot-launcher-ripple pointer-events-none absolute rounded-full bg-brand/30"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{ width: 180, height: 180, x: -90, y: -90, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() => setRipple(null)}
          />
        ) : null}

        <span className="relative z-[1] pl-4 text-[13px] text-brand-2/90" aria-hidden="true">
          {chatbotConfig.launcherSymbol}
        </span>
        <span className="relative z-[1] pr-4 text-sm font-semibold tracking-[0.01em] text-white/92">
          {chatbotConfig.launcherLabel}
        </span>
      </motion.button>
    </div>
  );
}
