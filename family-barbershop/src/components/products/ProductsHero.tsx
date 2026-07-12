"use client";

import { Calendar, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductCoverflow } from "@/components/products/ProductCoverflow";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ProductsHero() {
  const { hero } = business.productsPage;
  const reduceMotion = useReducedMotion();
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${8 + ((i * 19) % 84)}%`,
    top: `${12 + ((i * 23) % 76)}%`,
    delay: `${i * 0.55}s`,
  }));

  return (
    <section
      aria-labelledby="products-hero-heading"
      className="products-hero relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      <div className="products-hero-ambient-base pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="products-hero-ambient-warm pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="products-hero-ambient-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="products-hero-ambient-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="products-hero-ambient-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div
        className="products-hero-ambient-spotlight pointer-events-none absolute inset-0"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.9, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="products-hero-particles pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="products-hero-particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <Container className="relative z-[1] py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.1, 0.05)}
          >
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/85"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id="products-hero-heading"
              className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.35rem]"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
            >
              {hero.headline}
              <span className="mt-1 block text-white">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.ul
              className="mt-7 grid gap-3 sm:grid-cols-2"
              variants={staggerContainer(0.07, 0.22)}
            >
              {hero.badges.map((badge) => (
                <motion.li
                  key={badge}
                  className="flex items-center gap-2.5 text-sm font-medium text-white/58"
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: LUXURY_EASE }}
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10">
                    <Check className="h-3 w-3 text-[#D4AF37]" aria-hidden="true" />
                  </span>
                  {badge}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              <ButtonLink
                href="/contact"
                size="lg"
                className="products-hero-btn-primary group relative h-14 w-full overflow-hidden !text-white sm:w-auto"
              >
                <span className="products-hero-btn-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
                <span className="relative z-10">{hero.primaryCtaLabel}</span>
              </ButtonLink>
              <ButtonLink
                href={bookingHref}
                target={bookingTarget}
                variant="secondary"
                size="lg"
                className="products-hero-btn-secondary group h-14 w-full sm:w-auto"
              >
                <Calendar className="relative z-10 h-5 w-5" aria-hidden="true" />
                <span className="relative z-10">{hero.secondaryCtaLabel}</span>
              </ButtonLink>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
          >
            <ProductCoverflow />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
