"use client";

import { Award, Clock, Leaf, RefreshCw, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business, type ProductsWhyBarberIcon } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

const ICONS: Record<ProductsWhyBarberIcon, LucideIcon> = {
  award: Award,
  clock: Clock,
  leaf: Leaf,
  refresh: RefreshCw,
};

export function ProductsWhyBarbers() {
  const { whyBarbersTitle, whyBarbers } = business.productsPage;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="products-why-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28"
    >
      <Container>
        <motion.h2
          id="products-why-heading"
          className="text-center text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
        >
          {whyBarbersTitle}
        </motion.h2>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer(0.1, 0.1)}
        >
          {whyBarbers.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                className="products-why-card group relative rounded-[1.25rem] border border-white/[0.07] bg-[#0c0c0c] p-6 text-center sm:p-7"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              >
                <motion.span
                  className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 text-[#D4AF37]"
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 3 }}
                  transition={{ duration: 0.35, ease: LUXURY_EASE }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
                <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/48">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
