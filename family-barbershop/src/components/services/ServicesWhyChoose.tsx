"use client";

import { Droplets, Heart, Scissors, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business, type ServicesWhyChooseIcon } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

const ICONS: Record<ServicesWhyChooseIcon, LucideIcon> = {
  scissors: Scissors,
  sparkles: Sparkles,
  heart: Heart,
  droplets: Droplets,
};

export function ServicesWhyChoose() {
  const { whyChooseTitle, whyChoose } = business.servicesPage;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-why-heading"
      className="relative border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28"
    >
      <Container>
        <motion.h2
          id="services-why-heading"
          className="text-center text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
        >
          {whyChooseTitle}
        </motion.h2>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer(0.1, 0.1)}
        >
          {whyChoose.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                className="services-why-card group relative rounded-[1.25rem] border border-white/[0.07] bg-[#0c0c0c] p-6 text-center sm:p-7"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              >
                <span className="services-why-glow pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0" aria-hidden="true" />
                <span className="relative mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 text-[#D4AF37]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 text-base font-semibold text-white">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/48">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
