"use client";

import { useEffect } from "react";
import { COARSE_POINTER_QUERY, readMobilePerfFlags } from "@/lib/mobilePerformance";

/**
 * Applies document-level performance classes without React re-renders during pinch-zoom.
 * - perf-coarse: touch / coarse-pointer devices
 * - perf-zooming: active viewport scale ≠ 1 (pinch zoom)
 * - perf-no-*: diagnostic isolation flags via ?perf_disableHeroVideo=1 etc.
 */
export function MobilePerformanceBoot() {
  useEffect(() => {
    const root = document.documentElement;
    const coarseQuery = window.matchMedia(COARSE_POINTER_QUERY);
    const viewport = window.visualViewport;

    const applyCoarse = () => {
      root.classList.toggle("perf-coarse", coarseQuery.matches);
    };

    const applyFlags = () => {
      const flags = readMobilePerfFlags();
      root.classList.toggle("perf-no-blur", flags.disableBackdropBlur);
      root.classList.toggle("perf-no-motion", flags.disableDecorativeMotion);
      root.classList.toggle("perf-no-hero-video", flags.disableHeroVideo);
      root.classList.toggle("perf-no-chatbot", flags.disableChatbot);
    };

    let zoomTimer: ReturnType<typeof setTimeout> | null = null;

    const applyZooming = () => {
      const zoomed = viewport ? Math.abs(viewport.scale - 1) > 0.01 : false;
      root.classList.toggle("perf-zooming", zoomed);
    };

    const onViewportChange = () => {
      if (zoomTimer) clearTimeout(zoomTimer);
      applyZooming();
      zoomTimer = setTimeout(applyZooming, 180);
    };

    applyCoarse();
    applyFlags();
    applyZooming();

    coarseQuery.addEventListener("change", applyCoarse);

    if (viewport) {
      viewport.addEventListener("resize", onViewportChange);
      viewport.addEventListener("scroll", onViewportChange);
    }

    return () => {
      coarseQuery.removeEventListener("change", applyCoarse);
      if (viewport) {
        viewport.removeEventListener("resize", onViewportChange);
        viewport.removeEventListener("scroll", onViewportChange);
      }
      if (zoomTimer) clearTimeout(zoomTimer);
      root.classList.remove(
        "perf-coarse",
        "perf-zooming",
        "perf-no-blur",
        "perf-no-motion",
        "perf-no-hero-video",
        "perf-no-chatbot",
      );
    };
  }, []);

  return null;
}
