"use client";

import { Heart, Handshake, Scissors, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business, type AboutValueIcon } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

const VALUE_ICONS: Record<AboutValueIcon, LucideIcon> = {
  scissors: Scissors,
  heart: Heart,
  handshake: Handshake,
  sparkles: Sparkles,
};

export function AboutValues() {
  const { aboutValues } = business;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-values-heading"
      className="about-section relative border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer(0.08)}
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/75"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            Our Values
          </motion.p>
          <motion.h2
            id="about-values-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            What we stand for
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.1, 0.12)}
        >
          {aboutValues.map((value) => {
            const Icon = VALUE_ICONS[value.icon];
            return (
              <motion.article
                key={value.title}
                className={cn(
                  "about-value-card group relative overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-[#0c0c0c] p-7",
                )}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              >
                <span
                  className="about-value-card-border pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-0"
                  aria-hidden="true"
                />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 text-[#D4AF37] transition duration-500 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/52">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
