"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { COARSE_POINTER_QUERY, readMobilePerfFlags } from "@/lib/mobilePerformance";

const BarberChatbot = dynamic(
  () => import("@/components/chatbot/BarberChatbot").then((mod) => mod.BarberChatbot),
  { ssr: false, loading: () => null },
);

const TOUCH_DEFER_MS = 2800;
const DESKTOP_DEFER_MS = 120;

export function ChatbotLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const flags = readMobilePerfFlags();
    if (flags.disableChatbot) return;

    const coarse = window.matchMedia(COARSE_POINTER_QUERY).matches;
    const deferMs = coarse ? TOUCH_DEFER_MS : DESKTOP_DEFER_MS;

    function load() {
      setReady(true);
    }

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) =>
            window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), deferMs);

    const arm = () => schedule(load, { timeout: coarse ? 4000 : 1500 });

    if (document.readyState === "complete") {
      const timer = window.setTimeout(arm, deferMs);
      return () => window.clearTimeout(timer);
    }

    const onLoad = () => {
      window.setTimeout(arm, deferMs);
    };

    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  if (!ready) return null;
  return <BarberChatbot />;
}
