"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { galleryPageHero } from "@/content/gallery";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function GalleryHero() {
  const reduceMotion = useReducedMotion();
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${10 + ((i * 23) % 80)}%`,
    top: `${15 + ((i * 17) % 70)}%`,
    delay: `${i * 0.6}s`,
  }));

  return (
    <section
      aria-labelledby="gallery-hero-heading"
      className="gallery-page-hero relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      <div className="gallery-page-ambient-base pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="gallery-page-ambient-warm pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="gallery-page-ambient-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="gallery-page-ambient-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="gallery-page-ambient-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="gallery-page-particles pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="gallery-page-particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <p
        className="gallery-page-bg-word pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap"
        aria-hidden="true"
      >
        {galleryPageHero.backgroundWord}
      </p>

      <Container className="relative z-[1] pb-10 pt-14 sm:pb-12 sm:pt-16 lg:pb-14 lg:pt-18">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer(0.08, 0.04)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/85"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
          >
            {galleryPageHero.eyebrow}
          </motion.p>

          <motion.div
            className="gallery-page-divider mx-auto mt-5"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: LUXURY_EASE, delay: 0.08 }}
            aria-hidden="true"
          />

          <motion.h1
            id="gallery-hero-heading"
            className="gallery-page-headline-glow mt-6 text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem]"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {galleryPageHero.headline}
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/52 sm:text-lg"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {galleryPageHero.description}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
          >
            <ButtonLink href={bookingHref} target={bookingTarget} size="lg" className="h-14 w-full sm:w-auto">
              {galleryPageHero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg" className="h-14 w-full sm:w-auto">
              {galleryPageHero.secondaryCtaLabel}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
