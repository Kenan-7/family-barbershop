"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { GalleryItem } from "@/content/gallery";
import { GalleryProgressiveImage } from "@/components/gallery/GalleryProgressiveImage";

export function GalleryCinematicBreak({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 18, reduceMotion ? 0 : -18]);

  return (
    <section
      ref={ref}
      aria-labelledby="gallery-cinematic-heading"
      className="gallery-cinematic-break relative my-6 overflow-hidden sm:my-8 lg:my-10"
    >
      <div className="gallery-cinematic-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <motion.button
        type="button"
        onClick={onOpen}
        className="gallery-cinematic-card group relative block w-full overflow-hidden text-left"
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative min-h-[320px] w-full sm:min-h-[380px] lg:min-h-[440px]">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <GalleryProgressiveImage
              src={item.image}
              alt={item.altText}
              sizes="100vw"
              priority={false}
              style={{ objectPosition: item.objectPosition ?? "center 40%" }}
            />
          </motion.div>

          <div className="gallery-cinematic-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/25" />
          <div className="gallery-card-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-2/80">
            {item.category}
          </p>
          <h2
            id="gallery-cinematic-heading"
            className="gallery-cinematic-title mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
          >
            {item.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/58 sm:text-lg">
            {item.description}
          </p>
          <span className="gallery-card-cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-2">
            {item.ctaLabel ?? "Explore"}
          </span>
        </div>
      </motion.button>
    </section>
  );
}
