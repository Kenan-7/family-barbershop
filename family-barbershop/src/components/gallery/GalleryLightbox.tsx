"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/content/gallery";
import { cn } from "@/lib/cn";

type GalleryLightboxProps = {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[activeIndex];
  const total = items.length;

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + total) % total);
  }, [activeIndex, onNavigate, total]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % total);
  }, [activeIndex, onNavigate, total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="gallery-lightbox fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} — photo ${activeIndex + 1} of ${total}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        <button
          type="button"
          aria-label="Close lightbox"
          className="gallery-lightbox-backdrop absolute inset-0 bg-black/88 backdrop-blur-xl"
          onClick={onClose}
        />

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="gallery-lightbox-close absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 transition hover:border-brand/35 hover:text-white sm:right-8 sm:top-8"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={goPrev}
          className="gallery-lightbox-nav absolute left-3 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 transition hover:border-brand/35 hover:text-white sm:left-8 sm:flex"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Next photo"
          onClick={goNext}
          className="gallery-lightbox-nav absolute right-3 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 transition hover:border-brand/35 hover:text-white sm:right-8 sm:flex"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>

        <motion.div
          ref={panelRef}
          tabIndex={-1}
          className="gallery-lightbox-panel relative z-10 flex w-full max-w-6xl flex-col outline-none"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 6 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            if (start == null || end == null) return;
            const delta = end - start;
            if (Math.abs(delta) > 48) {
              if (delta > 0) goPrev();
              else goNext();
            }
            touchStartX.current = null;
          }}
        >
          <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_48px_rgba(197,157,95,0.1)]">
            <div className="relative aspect-[16/10] max-h-[68vh] w-full bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={item.image}
                    alt={item.altText}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    style={{ objectPosition: item.objectPosition ?? "center" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand/80">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/58">
                    {item.description}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium tabular-nums text-white/40">
                  {activeIndex + 1} / {total}
                </p>
              </div>
            </div>
          </div>

          <div className="gallery-lightbox-thumbs mt-4 hidden gap-2 overflow-x-auto pb-1 sm:flex">
            {items.map((thumb, index) => (
              <button
                key={thumb.id}
                type="button"
                onClick={() => onNavigate(index)}
                className={cn(
                  "gallery-lightbox-thumb relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition",
                  index === activeIndex
                    ? "border-brand/50 ring-2 ring-brand/25"
                    : "border-white/10 opacity-65 hover:opacity-100",
                )}
                aria-label={`View ${thumb.title}`}
                aria-current={index === activeIndex}
              >
                <Image
                  src={thumb.image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                  style={{ objectPosition: thumb.objectPosition ?? "center" }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
