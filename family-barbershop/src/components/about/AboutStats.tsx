"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer, useAnimatedNumber, useScrollReveal } from "@/lib/motion";

function StatBlock({
  display,
  numericValue,
  suffix,
  decimals,
  label,
  visible,
}: {
  display: string;
  numericValue?: number;
  suffix?: string;
  decimals?: number;
  label: string;
  visible: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const animate = visible && !reduceMotion && numericValue !== undefined;
  const animated = useAnimatedNumber(numericValue ?? 0, animate, decimals ?? 0);

  let value = display;
  if (numericValue !== undefined && visible) {
    if (reduceMotion) {
      value = `${numericValue}${suffix ?? ""}`;
      if (decimals) value = `${numericValue.toFixed(decimals)}${suffix ?? ""}`;
    } else if (decimals) {
      value = `${animated.toFixed(decimals)}${suffix ?? ""}`;
    } else {
      value = `${animated}${suffix ?? ""}`;
    }
  }

  if (display === "5.0★" && numericValue !== undefined && visible && !reduceMotion) {
    value = `${animated.toFixed(1)}★`;
  }

  return (
    <motion.div
      className="about-stat-block text-center lg:text-left"
      variants={fadeUp}
      transition={{ duration: 0.65, ease: LUXURY_EASE }}
    >
      <div className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem] lg:leading-none">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-white/42">
        {label}
      </div>
    </motion.div>
  );
}

export function AboutStats() {
  const { aboutStats } = business;
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      aria-labelledby="about-stats-heading"
      className="about-section relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.08)}
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/75"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            Why Customers Return
          </motion.p>
          <motion.h2
            id="about-stats-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            Numbers that reflect trust
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12, 0.2)}
        >
          {aboutStats.map((stat) => (
            <StatBlock
              key={stat.label}
              display={stat.display}
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
              visible={visible}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
