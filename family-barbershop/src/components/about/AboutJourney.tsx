"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function AboutJourney() {
  const { aboutJourney } = business;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-journey-heading"
      className="about-section relative overflow-hidden border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28 lg:py-32"
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
            Our Journey
          </motion.p>
          <motion.h2
            id="about-journey-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            Growing with our community
          </motion.h2>
        </motion.div>

        <div className="relative mt-14 lg:mt-16">
          <div className="about-journey-line hidden lg:block" aria-hidden="true" />

          <motion.ol
            className="flex flex-col items-center gap-0 lg:flex-row lg:items-start lg:justify-between lg:gap-4"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.12, 0.15)}
          >
            {aboutJourney.map((milestone, index) => (
              <li key={milestone.label} className="flex flex-col items-center lg:flex-1">
                <motion.div
                  className={cn(
                    "about-journey-node text-center",
                    milestone.emphasis && "about-journey-node--emphasis",
                  )}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: LUXURY_EASE }}
                >
                  <span
                    className={cn(
                      "inline-flex min-h-[3.5rem] items-center justify-center text-sm font-medium sm:text-base",
                      milestone.emphasis
                        ? "text-2xl font-semibold text-[#D4AF37] sm:text-3xl"
                        : "text-white/62",
                    )}
                  >
                    {milestone.label}
                  </span>
                </motion.div>

                {index < aboutJourney.length - 1 ? (
                  <span
                    className="my-3 text-[#D4AF37]/35 lg:hidden"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                ) : null}
              </li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
