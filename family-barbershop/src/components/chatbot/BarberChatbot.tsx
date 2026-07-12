"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatLauncher } from "@/components/chatbot/ChatLauncher";
import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { useChat } from "@/components/chatbot/useChat";
import { chatbotConfig } from "@/lib/chatbot/config";
import { readMobilePerfFlags, useCoarsePointer, useMobilePerfFlags } from "@/lib/mobilePerformance";

const DESKTOP_ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart"] as const;
const TOUCH_ACTIVITY_EVENTS = ["mousedown", "keydown", "touchstart"] as const;

export function BarberChatbot() {
  const coarsePointer = useCoarsePointer();
  const perfFlags = useMobilePerfFlags();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { messages, isTyping, sendMessage, hasConversation, hydrated } = useChat();
  const inactivityTimerRef = useRef<number | null>(null);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleMinimize = useCallback(() => setOpen(false), []);
  const handleToggle = useCallback(() => {
    setShowTooltip(false);
    setOpen((value) => !value);
  }, []);

  const dismissTooltipForever = useCallback(() => {
    setShowTooltip(false);
    localStorage.setItem(chatbotConfig.tooltipDismissKey, "1");
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }

    if (open || localStorage.getItem(chatbotConfig.tooltipDismissKey) === "1") {
      return;
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      if (!open && localStorage.getItem(chatbotConfig.tooltipDismissKey) !== "1") {
        setShowTooltip(true);
      }
    }, chatbotConfig.inactivityDelayMs);
  }, [open]);

  useEffect(() => {
    if (!hydrated) return;
    if (readMobilePerfFlags().disableChatbot) return;

    resetInactivityTimer();

    function onActivity() {
      setShowTooltip(false);
      resetInactivityTimer();
    }

    const events = coarsePointer ? TOUCH_ACTIVITY_EVENTS : DESKTOP_ACTIVITY_EVENTS;
    for (const eventName of events) {
      window.addEventListener(eventName, onActivity, { passive: true });
    }

    return () => {
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
      for (const eventName of events) {
        window.removeEventListener(eventName, onActivity);
      }
    };
  }, [hydrated, open, resetInactivityTimer, coarsePointer]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  if (!hydrated || perfFlags.disableChatbot) return null;

  return (
    <>
      <ChatLauncher
        open={open}
        onToggle={handleToggle}
        showTooltip={showTooltip}
        onDismissTooltip={dismissTooltipForever}
      />
      {open ? (
        <div id="family-barber-chat-panel">
          <ChatPanel
            open={open}
            messages={messages}
            isTyping={isTyping}
            hasConversation={hasConversation}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onSend={sendMessage}
          />
        </div>
      ) : null}
    </>
  );
}
