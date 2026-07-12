"use client";

import { useEffect, useState } from "react";

export const COARSE_POINTER_QUERY = "(hover: none) and (pointer: coarse)";

export type MobilePerfFlags = {
  disableHeroVideo: boolean;
  disableBackdropBlur: boolean;
  disableChatbot: boolean;
  disableDecorativeMotion: boolean;
};

const PERF_FLAG_DEFAULTS: MobilePerfFlags = {
  disableHeroVideo: false,
  disableBackdropBlur: false,
  disableChatbot: false,
  disableDecorativeMotion: false,
};

function readFlag(key: keyof MobilePerfFlags): boolean {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get(`perf_${key}`) === "1") return true;

  try {
    return localStorage.getItem(`perf_${key}`) === "1";
  } catch {
    return false;
  }
}

export function readMobilePerfFlags(): MobilePerfFlags {
  return {
    disableHeroVideo: readFlag("disableHeroVideo"),
    disableBackdropBlur: readFlag("disableBackdropBlur"),
    disableChatbot: readFlag("disableChatbot"),
    disableDecorativeMotion: readFlag("disableDecorativeMotion"),
  };
}

export function matchesCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(COARSE_POINTER_QUERY).matches;
}

export function isViewportZoomed(): boolean {
  if (typeof window === "undefined") return false;
  const scale = window.visualViewport?.scale ?? 1;
  return Math.abs(scale - 1) > 0.01;
}

export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(COARSE_POINTER_QUERY);
    const update = () => setCoarse(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return coarse;
}

export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduce;
}

export function useMobilePerfFlags(): MobilePerfFlags {
  const [flags] = useState<MobilePerfFlags>(() =>
    typeof window === "undefined" ? PERF_FLAG_DEFAULTS : readMobilePerfFlags(),
  );

  return flags;
}

/** Decorative motion off on touch devices, reduced-motion, or diagnostic flags. */
export function useDisableDecorativeMotion(): boolean {
  const coarse = useCoarsePointer();
  const reduceMotion = usePrefersReducedMotion();
  const flags = useMobilePerfFlags();
  return coarse || reduceMotion || flags.disableDecorativeMotion;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, waitMs: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), waitMs);
  }) as T;
}
