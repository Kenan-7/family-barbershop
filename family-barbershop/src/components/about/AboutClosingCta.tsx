"use client";

import { Calendar, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function AboutClosingCta() {
  const { aboutClosing } = business;
  const reduceMotion = useReducedMotion();
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  return (
    <section
      aria-labelledby="about-closing-heading"
      className="about-closing relative overflow-hidden py-28 sm:py-32 lg:py-36"
    >
      <div className="about-closing-bg absolute inset-0" aria-hidden="true" />
      <div className="about-closing-vignette absolute inset-0" aria-hidden="true" />
      <motion.div
        className="about-closing-glow absolute inset-0"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="about-closing-noise absolute inset-0" aria-hidden="true" />

      <Container className="relative z-[1]">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.1, 0.05)}
        >
          <motion.h2
            id="about-closing-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[3rem] lg:leading-[1.08]"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
          >
            {aboutClosing.headline}
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg sm:leading-[1.7]"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {aboutClosing.description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            <ButtonLink
              href={bookingHref}
              target={bookingTarget}
              size="lg"
              className="about-btn-primary h-14 w-full border border-[#D4AF37]/35 bg-[#D4AF37] px-8 !text-white hover:bg-[#e0c060] sm:w-auto"
            >
              <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
              {aboutClosing.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="about-btn-secondary h-14 w-full border-white/15 bg-white/[0.04] sm:w-auto"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              {aboutClosing.secondaryCtaLabel}
            </ButtonLink>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: LUXURY_EASE, delay: 0.1 }}
          >
            <p className="text-sm font-medium tracking-wide text-[#D4AF37]/85">
              {aboutClosing.ratingLine}
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" aria-hidden="true" />
            <p className="text-sm font-medium text-white/48">{aboutClosing.reviewsLine}</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
