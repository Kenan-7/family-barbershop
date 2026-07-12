"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { GalleryItem } from "@/content/gallery";
import { GalleryProgressiveImage } from "@/components/gallery/GalleryProgressiveImage";
import { cn } from "@/lib/cn";

export function GalleryCard({
  item,
  index,
  onOpen,
  priority,
  layout = "editorial",
  featured,
  className,
  style,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
  priority?: boolean;
  layout?: "editorial" | "uniform";
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  const cta = item.ctaLabel ?? "View Photo";

  const sizes =
    layout === "editorial" && item.gridPlacement?.colSpan === 12
      ? "100vw"
      : layout === "editorial" && (item.gridPlacement?.colSpan ?? 0) >= 6
        ? "(max-width: 768px) 100vw, 50vw"
        : layout === "editorial"
          ? "(max-width: 768px) 100vw, 33vw"
          : "(max-width: 768px) 100vw, 50vw";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={cn(
        "gallery-card group relative w-full overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0d0d0d] text-left",
        featured && "gallery-card--featured",
        layout === "editorial" && item.gridPlacement?.rowSpan === 2 && "gallery-card--tall",
        className,
      )}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.42), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="gallery-card-glow pointer-events-none absolute -inset-3 rounded-[1.4rem] opacity-0" aria-hidden="true" />

      <div
        className="gallery-card-media relative h-full min-h-[220px] w-full overflow-hidden"
        style={{ aspectRatio: layout === "uniform" ? item.aspectRatio ?? "4/3" : undefined }}
      >
        <GalleryProgressiveImage
          src={item.image}
          alt={item.altText}
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: item.objectPosition ?? "center" }}
        />
        <div className="gallery-card-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="gallery-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/15" />
      </div>

      <div className="absolute left-4 top-4 z-10">
        <span className="inline-flex rounded-full border border-brand/25 bg-black/55 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-md">
          {item.category}
        </span>
      </div>

      <div className="gallery-card-caption absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <h3 className="gallery-card-title text-lg font-semibold tracking-tight text-white sm:text-xl">
          {item.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/62">{item.description}</p>
        <span className="gallery-card-cta mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-2">
          {cta}
          <ArrowUpRight className="gallery-card-cta-icon h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </motion.button>
  );
}
