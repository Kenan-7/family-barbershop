"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { contactPage } from "@/content/contact";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContactSummaryCard } from "@/components/contact/ContactSummaryCard";
import {
  LUXURY_EASE,
  fadeScale,
  fadeUpSmall,
  fadeUpMedium,
  headlineLine,
  slideInRight,
  staggerContainer,
} from "@/lib/motion";

export function ContactHero() {
  const reduceMotion = useReducedMotion();
  const bookingHref = business.links.bookingUrl || "/contact#form";
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${6 + ((i * 19) % 88)}%`,
    top: `${10 + ((i * 23) % 78)}%`,
    delay: `${i * 0.65}s`,
    size: i % 3 === 0 ? 2 : 3,
  }));

  const motionProps = reduceMotion
    ? { initial: false as const }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <section className="contact-hero relative overflow-hidden border-b border-white/[0.06]">
      <div className="contact-hero-ambient-base pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="contact-hero-ambient-warm pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="contact-hero-glow-gold pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="contact-hero-glow-charcoal pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="contact-hero-ambient-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="contact-hero-ambient-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        className="contact-hero-bg-word pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        aria-hidden="true"
      >
        <span>{contactPage.backgroundWord}</span>
      </div>

      <div className="contact-hero-particles pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="contact-hero-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <Container className="contact-hero-inner relative z-[1] flex min-h-[min(720px,calc(100vh-124px))] items-center py-14 sm:py-16 lg:min-h-[42rem] lg:py-20 xl:min-h-[45rem]">
        <div className="contact-hero-grid grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div {...motionProps} variants={staggerContainer(0.08, 0)}>
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/85"
              variants={fadeUpSmall}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
            >
              {contactPage.eyebrow}
            </motion.p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              <motion.span className="block" variants={headlineLine} transition={{ duration: 0.65, ease: LUXURY_EASE }}>
                {contactPage.headline}
              </motion.span>
              <motion.span
                className="mt-2 block text-brand-2"
                variants={headlineLine}
                transition={{ duration: 0.65, ease: LUXURY_EASE }}
              >
                {contactPage.headlineAccent}
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-white/58 sm:text-lg"
              variants={fadeUpMedium}
              transition={{ duration: 0.55, ease: LUXURY_EASE, delay: 0.16 }}
            >
              {contactPage.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={staggerContainer(0.08, 0.22)}
            >
              <motion.div variants={fadeScale} transition={{ duration: 0.5, ease: LUXURY_EASE }}>
                <ButtonLink
                  href={bookingHref}
                  variant="primary"
                  size="lg"
                  className="contact-hero-cta w-full text-white hover:text-white sm:w-auto"
                >
                  Book Appointment
                </ButtonLink>
              </motion.div>
              <motion.div variants={fadeScale} transition={{ duration: 0.5, ease: LUXURY_EASE }}>
                <ButtonLink
                  href={business.phoneHref}
                  variant="secondary"
                  size="lg"
                  className="contact-hero-cta w-full sm:w-auto"
                >
                  Call {business.phone}
                </ButtonLink>
              </motion.div>
            </motion.div>

            <motion.ul
              className="mt-9 flex flex-wrap gap-2.5"
              variants={staggerContainer(0.05, 0.34)}
            >
              {contactPage.trustChips.map((chip) => (
                <motion.li key={chip} variants={fadeUpSmall} transition={{ duration: 0.45, ease: LUXURY_EASE }}>
                  <span className="contact-trust-chip inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/58">
                    {chip}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="contact-hero-card-col"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={slideInRight}
            transition={{ duration: 0.75, delay: 0.2, ease: LUXURY_EASE }}
          >
            <ContactSummaryCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
