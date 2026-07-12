"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { galleryItems, type GalleryItem } from "@/content/gallery";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

function masonryClass(featured?: boolean) {
  return featured
    ? "about-gallery-item--large sm:col-span-2 sm:row-span-2"
    : "about-gallery-item--medium";
}

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={cn(
        "about-gallery-tile group relative min-h-[220px] overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0c0c0c] text-left sm:min-h-[240px]",
        masonryClass(item.featured),
      )}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: LUXURY_EASE, delay: index * 0.05 }}
    >
      <span className="about-gallery-tile-shine pointer-events-none absolute inset-0 z-[2] opacity-0" aria-hidden="true" />
      <span className="about-gallery-tile-glow pointer-events-none absolute -inset-1 rounded-[1.35rem] opacity-0" aria-hidden="true" />

      <Image
        src={item.image}
        alt={item.altText}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="about-gallery-tile-image object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-90" />

      <div className="absolute inset-x-0 bottom-0 z-[3] p-5">
        <p className="text-sm font-semibold text-white">{item.title}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37]/85 opacity-0 transition duration-400 group-hover:opacity-100">
          View
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </motion.button>
  );
}

export function AboutGalleryPreview() {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () => galleryItems.slice(0, business.aboutGalleryLimit),
    [],
  );

  return (
    <section
      aria-labelledby="about-gallery-heading"
      className="about-section relative border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            className="max-w-xl"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer(0.08)}
          >
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/75"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              Gallery
            </motion.p>
            <motion.h2
              id="about-gallery-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
            >
              Life inside the shop
            </motion.h2>
          </motion.div>

          <ButtonLink href="/gallery" variant="secondary" size="sm" className="shrink-0">
            View full gallery
          </ButtonLink>
        </div>

        <motion.div
          className="about-gallery-grid mt-12 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-5 lg:mt-14"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08, 0.1)}
        >
          {items.map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={index}
              onOpen={() => setLightboxIndex(index)}
            />
          ))}
        </motion.div>
      </Container>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          items={items}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
