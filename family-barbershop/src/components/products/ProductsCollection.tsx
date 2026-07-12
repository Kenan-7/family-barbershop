"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ProductShowcaseCard } from "@/components/products/ProductShowcaseCard";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function ProductsCollection() {
  const { collectionTitle, collectionDescription } = business.productsPage;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="products-collection-heading"
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
            id="products-collection-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {collectionTitle}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/52"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {collectionDescription}
          </motion.p>
        </motion.div>

        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {business.products.map((product, index) => (
            <CollectionCard key={product.name} index={index} productName={product.name} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CollectionCard({ productName, index }: { productName: string; index: number }) {
  const reduceMotion = useReducedMotion();
  const product = business.products.find((p) => p.name === productName);
  if (!product) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: LUXURY_EASE, delay: index * 0.06 }}
    >
      <ProductShowcaseCard product={product} visible />
    </motion.div>
  );
}
