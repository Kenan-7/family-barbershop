"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { reviewsPageTrust } from "@/content/reviews";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AnimatedStars, CountUp, GoogleLogo } from "@/components/reviews/reviews-shared";
import { LUXURY_EASE, fadeUp, staggerContainer, useScrollReveal } from "@/lib/motion";

export function ReviewsTrustBanner() {
  const reduceMotion = useReducedMotion();
  const { googleReviews } = business;
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.2);

  return (
    <section className="relative overflow-hidden bg-[#080808] py-12 sm:py-14">
      <div className="reviews-trust-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container>
        <motion.div
          ref={ref}
          className="reviews-trust-banner reviews-trust-banner--premium relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.08, 0.04)}
        >
          <div className="reviews-trust-sweep pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-6 sm:flex-row lg:items-center">
              <div className="reviews-trust-logo flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <GoogleLogo className="h-10 w-10" />
              </div>

              <div>
                <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: LUXURY_EASE }}>
                  <AnimatedStars shimmer />
                </motion.div>

                <motion.p
                  className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: LUXURY_EASE }}
                >
                  <CountUp value={googleReviews.aggregateRating} decimals={1} enabled={visible} suffix=" Rating" />
                </motion.p>

                <motion.p
                  className="mt-2 text-base text-white/55"
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: LUXURY_EASE }}
                >
                  <CountUp value={googleReviews.reviewCount} enabled={visible} suffix="+ Reviews" />
                  {" · "}
                  {reviewsPageTrust.verifiedLabel}
                </motion.p>

                <motion.p
                  className="mt-1 text-sm text-white/38"
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: LUXURY_EASE }}
                >
                  {reviewsPageTrust.subtitle}
                </motion.p>
              </div>
            </div>

            <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: LUXURY_EASE }}>
              {business.links.googleReviews ? (
                <ButtonLink
                  href={business.links.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="reviews-trust-cta"
                >
                  {reviewsPageTrust.ctaLabel}
                </ButtonLink>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
