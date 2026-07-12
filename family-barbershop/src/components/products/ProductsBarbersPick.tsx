"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function ProductsBarbersPick() {
  const { barbersPick } = business.productsPage;
  const reduceMotion = useReducedMotion();
  const product = business.products.find((p) => p.name === barbersPick.productName);

  if (!product) return null;

  const usesTransparent = product.transparentImage !== false;

  return (
    <section
      aria-labelledby="products-pick-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28"
    >
      <Container>
        <div className="products-pick-panel overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#121212] via-[#0c0c0c] to-[#080808]">
          <div className="grid lg:grid-cols-2">
            <motion.div
              className="relative flex min-h-[280px] items-end justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-10 sm:min-h-[360px]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
            >
              <div className="products-pick-glow pointer-events-none absolute inset-0" aria-hidden="true" />
              <Image
                src={product.imageSrc}
                alt={product.imageAlt ?? product.name}
                width={320}
                height={320}
                className={cn(
                  "relative z-10 max-h-[280px] w-auto object-contain",
                  usesTransparent && "drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)]",
                )}
              />
            </motion.div>

            <motion.div
              className="flex flex-col justify-center p-8 sm:p-10 lg:p-12"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer(0.1, 0.08)}
            >
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D4AF37]"
                variants={fadeUp}
                transition={{ duration: 0.55, ease: LUXURY_EASE }}
              >
                {barbersPick.label}
              </motion.p>
              <motion.h2
                id="products-pick-heading"
                className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                variants={fadeUp}
                transition={{ duration: 0.65, ease: LUXURY_EASE }}
              >
                {product.name}
              </motion.h2>
              <motion.p
                className="mt-5 text-base leading-relaxed text-white/55"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              >
                {barbersPick.explanation}
              </motion.p>
              <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: LUXURY_EASE }}>
                <Link
                  href="/contact"
                  className="products-btn-primary mt-8 inline-flex h-12 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37] px-8 text-sm font-semibold !text-white transition hover:bg-[#e0c060]"
                >
                  {barbersPick.ctaLabel}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
