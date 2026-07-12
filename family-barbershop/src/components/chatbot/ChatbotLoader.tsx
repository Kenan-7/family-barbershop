"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BarberChatbot = dynamic(
  () => import("@/components/chatbot/BarberChatbot").then((mod) => mod.BarberChatbot),
  { ssr: false, loading: () => null },
);

export function ChatbotLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function load() {
      setReady(true);
    }

    if (typeof window === "undefined") return;

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 120);

    if (document.readyState === "complete") {
      schedule(load);
      return;
    }

    const onLoad = () => schedule(load);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  if (!ready) return null;
  return <BarberChatbot />;
}
