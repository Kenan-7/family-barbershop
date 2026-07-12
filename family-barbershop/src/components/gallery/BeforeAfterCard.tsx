"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { GalleryItem } from "@/content/gallery";
import { cn } from "@/lib/cn";

export function BeforeAfterCard({
  item,
  index,
  className,
  style,
}: {
  item: GalleryItem;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const beforeSrc = item.beforeImage ?? item.image;
  const afterSrc = item.afterImage ?? item.image;
  const hasPair = Boolean(item.beforeImage && item.afterImage);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    setIsDragging(true);
    containerRef.current?.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - 5));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + 5));
    }
  };

  return (
    <motion.div
      className={cn(
        "gallery-card gallery-ba-card group relative w-full overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0d0d0d]",
        className,
      )}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.36), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="gallery-card-glow pointer-events-none absolute -inset-3 rounded-[1.4rem] opacity-0" aria-hidden="true" />

      <div
        ref={containerRef}
        className="gallery-ba-frame relative min-h-[220px] w-full cursor-ew-resize touch-none select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={`Before and after: ${item.title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
      >
        <Image
          src={afterSrc}
          alt={item.afterAlt ?? item.altText}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover contrast-[1.03]"
          style={{ objectPosition: item.objectPosition ?? "center 25%" }}
          draggable={false}
          priority={index < 3}
        />

        {hasPair ? (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeSrc}
              alt={item.beforeAlt ?? "Before"}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover contrast-[1.03]"
              style={{ objectPosition: item.objectPosition ?? "center 25%" }}
              draggable={false}
            />
          </div>
        ) : null}

        {hasPair ? (
          <>
            <div
              className="gallery-ba-handle absolute inset-y-0 z-10 w-0.5 bg-brand shadow-[0_0_16px_rgba(197,157,95,0.45)]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            >
              <span className="gallery-ba-knob absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/45 bg-black/70 backdrop-blur-sm">
                <ChevronLeft className="h-3.5 w-3.5 text-brand-2" aria-hidden="true" />
                <ChevronRight className="-ml-1 h-3.5 w-3.5 text-brand-2" aria-hidden="true" />
              </span>
            </div>
            <span className="absolute left-4 top-4 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              Before
            </span>
            <span className="absolute right-4 top-4 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-2 backdrop-blur-sm">
              After
            </span>
          </>
        ) : null}

        <div className="gallery-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />
      </div>

      <div className="absolute left-4 top-4 z-10">
        <span className="inline-flex rounded-full border border-brand/25 bg-black/55 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-md">
          {item.category}
        </span>
      </div>

      <div className="gallery-card-caption pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{item.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/62">{item.description}</p>
        <span className="gallery-card-cta mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-2">
          {item.ctaLabel ?? "View Transformation"}
          <ArrowUpRight className="gallery-card-cta-icon h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </motion.div>
  );
}
