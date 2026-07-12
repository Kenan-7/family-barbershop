"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatLauncher } from "@/components/chatbot/ChatLauncher";
import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { useChat } from "@/components/chatbot/useChat";
import { chatbotConfig } from "@/lib/chatbot/config";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;

export function BarberChatbot() {
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

    resetInactivityTimer();

    function onActivity() {
      setShowTooltip(false);
      resetInactivityTimer();
    }

    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, onActivity, { passive: true });
    }

    return () => {
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
      for (const eventName of ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, onActivity);
      }
    };
  }, [hydrated, open, resetInactivityTimer]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!hydrated) return null;

  return (
    <>
      <ChatLauncher
        open={open}
        onToggle={handleToggle}
        showTooltip={showTooltip}
        onDismissTooltip={dismissTooltipForever}
      />
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
    </>
  );
}
