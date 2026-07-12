"use client";

import { motion, useReducedMotion } from "framer-motion";
import { reviewsPageStats, type ReviewStatItem } from "@/content/reviews";
import { Container } from "@/components/site/Container";
import { AnimatedStars } from "@/components/reviews/reviews-shared";
import { LUXURY_EASE, fadeUp, staggerContainer, useAnimatedNumber, useScrollReveal } from "@/lib/motion";

function StatCard({ stat, visible }: { stat: ReviewStatItem; visible: boolean }) {
  const reduceMotion = useReducedMotion();
  const animate = visible && !reduceMotion;
  const value = useAnimatedNumber(stat.numericValue ?? 0, animate, stat.decimals ?? 0);

  const display =
    stat.display ??
    `${stat.decimals ? value.toFixed(stat.decimals) : value}${stat.suffix ?? ""}`;

  return (
    <motion.div
      className="reviews-stat-card group rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md sm:p-6"
      variants={fadeUp}
      transition={{ duration: 0.55, ease: LUXURY_EASE }}
    >
      {stat.showStars ? (
        <AnimatedStars size="sm" className="mb-3 justify-start" />
      ) : null}
      <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{display}</div>
      <div className="mt-2 text-sm font-medium text-white/45">{stat.label}</div>
    </motion.div>
  );
}

export function ReviewsStats() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.2);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#060606] py-10 sm:py-12">
      <Container>
        <motion.div
          ref={ref}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.07, 0.05)}
        >
          {reviewsPageStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} visible={visible} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
