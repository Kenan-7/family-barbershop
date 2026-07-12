"use client";

import Image from "next/image";
import { Minus, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { chatbotConfig } from "@/lib/chatbot/config";
import { getShopStatus } from "@/lib/chatbot/hours";
import { cn } from "@/lib/cn";

export function ChatHeader({
  onClose,
  onMinimize,
}: {
  onClose: () => void;
  onMinimize: () => void;
}) {
  const status = getShopStatus();
  const reduceMotion = useReducedMotion();

  return (
    <div className="chatbot-header relative shrink-0 px-5 py-4">
      <div className="flex items-start gap-3.5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-brand/25 bg-black/40 shadow-[0_0_20px_rgba(197,157,95,0.12)]">
          <Image
            src={chatbotConfig.logoSrc}
            alt={chatbotConfig.logoAlt}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <h2 className="truncate text-[15px] font-semibold text-white">
                {chatbotConfig.title}
              </h2>
              <p className="text-[11px] leading-snug text-white/45">{chatbotConfig.subtitle}</p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-300/85">
                  <motion.span
                    className="relative flex h-2 w-2"
                    aria-hidden="true"
                  >
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40"
                      animate={reduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={
                        reduceMotion
                          ? undefined
                          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                      }
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </motion.span>
                  Online
                </span>

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
                    status.isOpen
                      ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300/90"
                      : "border-white/10 bg-white/[0.04] text-white/55",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      status.isOpen ? "bg-emerald-400" : "bg-white/35",
                    )}
                    aria-hidden="true"
                  />
                  {status.label}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={onMinimize}
                className="chatbot-icon-btn inline-flex h-10 w-10 items-center justify-center rounded-full text-white/55"
                aria-label="Minimize chat"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="chatbot-icon-btn inline-flex h-10 w-10 items-center justify-center rounded-full text-white/55"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
