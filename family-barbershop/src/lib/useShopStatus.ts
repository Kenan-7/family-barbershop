"use client";

import { useEffect, useState } from "react";
import { getShopStatus, type ShopStatus } from "@/lib/shopStatus";

/**
 * Live shop status, computed only in the browser.
 * Returns null during prerender/hydration so server and client markup match
 * (pages are statically built, so a render-time `new Date()` would be stale).
 */
export function useShopStatus(): ShopStatus | null {
  const [status, setStatus] = useState<ShopStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}
