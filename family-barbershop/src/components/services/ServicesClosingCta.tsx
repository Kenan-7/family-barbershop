"use client";

import { Calendar, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ServicesClosingCta() {
  const { closing } = business.servicesPage;
  const reduceMotion = useReducedMotion();
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${10 + ((i * 19) % 80)}%`,
    top: `${15 + ((i * 23) % 70)}%`,
    delay: `${i * 0.5}s`,
  }));

  return (
    <section
      aria-labelledby="services-closing-heading"
      className="services-closing relative overflow-hidden py-28 sm:py-32"
    >
      <div className="services-closing-bg absolute inset-0" aria-hidden="true" />
      <div className="services-closing-vignette absolute inset-0" aria-hidden="true" />
      <motion.div
        className="services-closing-glow absolute inset-0"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.72] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="services-closing-particles absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="services-closing-particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <Container className="relative z-[1]">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.1, 0.05)}
        >
          <motion.h2
            id="services-closing-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1]"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
          >
            {closing.headline}
          </motion.h2>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            <ButtonLink
              href={bookingHref}
              target={bookingTarget}
              size="lg"
              className="services-btn-primary h-14 w-full !text-white sm:w-auto"
            >
              <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
              {closing.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={business.phoneHref}
              variant="secondary"
              size="lg"
              className="services-btn-secondary h-14 w-full sm:w-auto"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {closing.secondaryCtaLabel}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
