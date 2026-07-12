"use client";

import Image from "next/image";
import { Calendar, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { useDisableDecorativeMotion } from "@/lib/mobilePerformance";

const badgeItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: LUXURY_EASE } },
};

export function ServicesHero() {
  const { hero } = business.servicesPage;
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
    reduceMotion || disableParallax ? ["0%", "0%"] : ["0%", "10%"],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-hero-heading"
      className="services-hero relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.1, 0.05)}
          >
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/80"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id="services-hero-heading"
              className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
            >
              {hero.headline}
              <span className="mt-1 block text-white">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-base leading-relaxed text-white/58 sm:text-lg"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
            >
              {hero.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
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
                {hero.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                href={business.phoneHref}
                variant="secondary"
                size="lg"
                className="services-btn-secondary h-14 w-full sm:w-auto"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {hero.secondaryCtaLabel}
              </ButtonLink>
            </motion.div>

            <motion.ul
              className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6"
              variants={staggerContainer(0.07, 0.3)}
            >
              {hero.trustBadges.map((badge) => (
                <motion.li
                  key={badge}
                  className="text-sm font-medium text-white/55"
                  variants={badgeItem}
                >
                  {badge}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="services-hero-visual relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/[0.08] sm:aspect-[5/6] lg:aspect-[4/5]"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src={hero.imageSrc}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
            <div className="services-hero-visual-overlay absolute inset-0" aria-hidden="true" />
            <div className="services-hero-visual-glow absolute inset-0" aria-hidden="true" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
