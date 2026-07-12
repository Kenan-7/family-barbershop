"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { reviewsPageHero } from "@/content/reviews";
import { Container } from "@/components/site/Container";
import { AnimatedStars, CountUp } from "@/components/reviews/reviews-shared";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ReviewsHero() {
  const reduceMotion = useReducedMotion();
  const countEnabled = true;

  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${4 + ((i * 17) % 92)}%`,
    top: `${6 + ((i * 19) % 88)}%`,
    delay: `${i * 0.45}s`,
    bright: i % 4 === 0,
  }));

  const driftWords = [...reviewsPageHero.rotatingWords, ...reviewsPageHero.rotatingWords];

  return (
    <section
      aria-labelledby="reviews-hero-heading"
      className="reviews-page-hero relative overflow-hidden bg-[#050505]"
    >
      <div className="reviews-page-ambient-base pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="reviews-page-ambient-warm pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="reviews-page-ambient-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="reviews-page-ambient-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="reviews-page-ambient-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="reviews-hero-drift pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="reviews-hero-drift-track">
          {driftWords.map((word, index) => (
            <span key={`${word}-${index}`} className="reviews-hero-drift-word">
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="reviews-page-particles pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={p.bright ? "reviews-page-particle reviews-page-particle-bright" : "reviews-page-particle"}
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <Container className="relative z-[1] py-16 sm:py-20 lg:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer(0.09, 0.06)}
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/85"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
          >
            {reviewsPageHero.eyebrow}
          </motion.p>

          <motion.div
            className="mt-7 flex justify-center"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            <AnimatedStars size="lg" shimmer />
          </motion.div>

          <motion.div
            className="relative mt-6 inline-block"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            <div className="reviews-hero-rating-pulse pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
            <p id="reviews-hero-heading" className="reviews-page-headline-glow text-sm font-medium uppercase tracking-[0.2em] text-white/45">
              Google Rating
            </p>
            <div className="mt-2 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              <CountUp
                value={business.googleReviews.aggregateRating}
                decimals={1}
                enabled={countEnabled}
                className="tabular-nums"
              />
            </div>
          </motion.div>

          <motion.p
            className="mt-4 text-2xl font-medium text-brand-2 sm:text-3xl"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            <CountUp
              value={business.googleReviews.reviewCount}
              suffix="+ Reviews"
              enabled={countEnabled}
              className="tabular-nums"
            />
          </motion.p>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {reviewsPageHero.trustLine}
          </motion.p>

          <motion.p
            className="mt-4 text-sm text-white/38"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
          >
            {business.neighborhoodOrArea}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
