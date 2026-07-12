"use client";

import Image from "next/image";
import { Calendar, Users } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { useDisableDecorativeMotion } from "@/lib/mobilePerformance";

const badgeItem = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: LUXURY_EASE },
  },
};

export function AboutHero() {
  const { aboutHero } = business;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const disableParallax = useDisableDecorativeMotion() || reduceMotion;
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion || disableParallax ? ["0%", "0%"] : ["0%", "12%"],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-heading"
      className="about-hero relative min-h-[72vh] overflow-hidden border-b border-white/[0.06] lg:min-h-[78vh]"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY }}
        aria-hidden="true"
      >
        <Image
          src={aboutHero.imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="about-hero-image object-cover object-center"
        />
      </motion.div>

      <div className="about-hero-cinematic-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="about-hero-readability-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="about-hero-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div
        className="about-hero-radial-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.75] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-[2] flex min-h-[72vh] items-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[78vh] lg:items-center lg:pb-24 lg:pt-0">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer(0.11, 0.05)}
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/80"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {aboutHero.eyebrow}
          </motion.p>

          <motion.h1
            id="about-hero-heading"
            className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[0.98]"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
          >
            {aboutHero.headline}
            <span className="mt-2 block text-white">{aboutHero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-white/68 sm:text-lg sm:leading-[1.7]"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {aboutHero.subheadline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
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
              {aboutHero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={aboutHero.secondaryCtaHref}
              variant="secondary"
              size="lg"
              className="about-btn-secondary h-14 w-full border-white/15 bg-white/[0.04] sm:w-auto"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              {aboutHero.secondaryCtaLabel}
            </ButtonLink>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
            aria-label="Trust highlights"
            variants={staggerContainer(0.09, 0.35)}
          >
            {aboutHero.trustBadges.map((badge) => (
              <motion.li
                key={badge}
                className="flex items-center gap-2.5 text-sm font-medium text-white/62"
                variants={badgeItem}
              >
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                  aria-hidden="true"
                />
                {badge}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
