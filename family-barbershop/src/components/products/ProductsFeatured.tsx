"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/content/business";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

function FeaturedProductCard({ product }: { product: Product }) {
  const usesTransparent = product.transparentImage !== false;

  return (
    <motion.article
      className="products-featured-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0c0c0c]"
      variants={fadeUp}
      transition={{ duration: 0.65, ease: LUXURY_EASE }}
    >
      <span className="products-featured-glow pointer-events-none absolute -inset-2 rounded-[1.65rem] opacity-0" aria-hidden="true" />
      <span className="products-featured-border pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0" aria-hidden="true" />

      <div className="relative flex h-52 items-end justify-center overflow-hidden bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-6 sm:h-56">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt ?? product.name}
          width={240}
          height={240}
          className={cn(
            "products-featured-image max-h-[85%] w-auto object-contain transition duration-700 group-hover:scale-[1.08]",
            usesTransparent && "drop-shadow-[0_16px_24px_rgba(0,0,0,0.4)]",
          )}
        />
        {product.trustLabel ? (
          <span className="absolute left-4 top-4 rounded-full border border-[#D4AF37]/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37] backdrop-blur-sm">
            {product.trustLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/75">{product.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">{product.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.hold && product.hold !== "—" ? (
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/45">
              {product.hold} hold
            </span>
          ) : null}
          {product.finish ? (
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/45">
              {product.finish} finish
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
          <Link href="/contact" className="text-sm font-semibold text-[#D4AF37] transition hover:text-white">
            Ask In Shop →
          </Link>
          <span className="text-xl font-semibold text-[#D4AF37]">{product.price}</span>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductsFeatured() {
  const { featuredTitle, featuredDescription } = business.productsPage;
  const reduceMotion = useReducedMotion();
  const featured = business.products.filter((p) => p.popular).slice(0, 3);
  const display = featured.length >= 3 ? featured : business.products.slice(0, 3);

  return (
    <section
      aria-labelledby="products-featured-heading"
      className="relative border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28"
    >
      <Container>
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.08)}
        >
          <motion.h2
            id="products-featured-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {featuredTitle}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/52"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {featuredDescription}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.12, 0.1)}
        >
          {display.map((product) => (
            <FeaturedProductCard key={product.name} product={product} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
