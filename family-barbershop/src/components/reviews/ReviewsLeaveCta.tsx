"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { reviewsPageCta } from "@/content/reviews";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AnimatedStars, FloatingDust, GoogleLogo } from "@/components/reviews/reviews-shared";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ReviewsLeaveCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="reviews-leave-cta relative overflow-hidden bg-[#040404] py-14 sm:py-16">
      <div className="reviews-leave-cta-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="reviews-leave-cta-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <FloatingDust count={10} />

      <Container className="relative z-[1]">
        <motion.div
          className="reviews-leave-cta-glass relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.04] px-8 py-12 backdrop-blur-2xl sm:px-12 sm:py-14"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.1, 0.06)}
        >
          <div className="reviews-leave-cta-sheen pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative text-center">
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: LUXURY_EASE }}>
              <AnimatedStars className="justify-center" size="lg" shimmer />
            </motion.div>

            <motion.div
              className="mt-5 flex justify-center"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: LUXURY_EASE }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                <GoogleLogo className="h-7 w-7" />
              </div>
            </motion.div>

            <motion.h2
              className="reviews-leave-cta-title mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
            >
              {reviewsPageCta.title}
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/52 sm:text-lg"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              {reviewsPageCta.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center gap-4"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              {business.links.googleReviews ? (
                <ButtonLink
                  href={business.links.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="reviews-leave-cta-button"
                >
                  {reviewsPageCta.buttonLabel}
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" variant="primary" size="lg" className="reviews-leave-cta-button">
                  Ask us for the review link
                </ButtonLink>
              )}

              <div className="reviews-thank-you flex items-center gap-2 text-sm font-medium text-brand-2">
                <span className="reviews-sparkle" aria-hidden="true">
                  ✦
                </span>
                <span>{reviewsPageCta.thankYouLabel}</span>
                <span className="reviews-sparkle reviews-sparkle-delay" aria-hidden="true">
                  ✦
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
