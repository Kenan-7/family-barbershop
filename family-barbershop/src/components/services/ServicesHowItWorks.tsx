"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ServicesHowItWorks() {
  const { howItWorksTitle, howItWorksSteps } = business.servicesPage;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-how-heading"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28"
    >
      <Container>
        <motion.h2
          id="services-how-heading"
          className="text-center text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
        >
          {howItWorksTitle}
        </motion.h2>

        <div className="relative mt-14 lg:mt-16">
          <div className="services-timeline-line hidden lg:block" aria-hidden="true" />

          <motion.ol
            className="flex flex-col items-center gap-0 lg:flex-row lg:items-start lg:justify-between"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.14, 0.12)}
          >
            {howItWorksSteps.map((step, index) => (
              <li key={step.title} className="flex flex-col items-center lg:flex-1">
                <motion.div
                  className="services-timeline-step max-w-[11rem] text-center"
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: LUXURY_EASE }}
                >
                  <span className="services-timeline-dot mx-auto mb-4 hidden lg:block" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-white sm:text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/48">{step.description}</p>
                </motion.div>

                {index < howItWorksSteps.length - 1 ? (
                  <span className="my-4 text-[#D4AF37]/30 lg:hidden" aria-hidden="true">
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
