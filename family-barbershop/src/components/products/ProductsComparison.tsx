"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const ROWS = [
  { key: "hold", label: "Hold" },
  { key: "finish", label: "Finish" },
  { key: "shine", label: "Shine" },
  { key: "hairType", label: "Hair Type" },
  { key: "professionalRating", label: "Pro Rating" },
] as const;

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return <span className="text-white/30">—</span>;
  return (
    <span className="inline-flex items-center gap-0.5 text-[#D4AF37]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn("text-sm", i < rating ? "opacity-100" : "opacity-25")}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ProductsComparison() {
  const { comparisonTitle, comparisonDescription } = business.productsPage;
  const products = business.products;
  const reduceMotion = useReducedMotion();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="products-comparison-heading"
      className="relative border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28"
    >
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
        >
          <h2 id="products-comparison-heading" className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            {comparisonTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/52">{comparisonDescription}</p>
        </motion.div>

        <motion.div
          className="products-comparison-table mt-12 overflow-x-auto rounded-[1.35rem] border border-white/[0.08] bg-[#0a0a0a]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
        >
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="p-4 pl-6 font-medium text-white/40" scope="col">
                  Feature
                </th>
                {products.map((product) => (
                  <th
                    key={product.name}
                    className={cn(
                      "p-4 font-semibold text-white transition-colors",
                      highlighted === product.name && "bg-[#D4AF37]/8",
                    )}
                    scope="col"
                    onMouseEnter={() => setHighlighted(product.name)}
                    onMouseLeave={() => setHighlighted(null)}
                  >
                    <span className="block text-xs font-normal uppercase tracking-wider text-[#D4AF37]/70">
                      {product.category}
                    </span>
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-b border-white/[0.05] last:border-0">
                  <th className="p-4 pl-6 font-medium text-white/45" scope="row">
                    {row.label}
                  </th>
                  {products.map((product) => {
                    const value =
                      row.key === "professionalRating"
                        ? null
                        : (product[row.key as keyof typeof product] as string | undefined);
                    return (
                      <td
                        key={`${product.name}-${row.key}`}
                        className={cn(
                          "p-4 text-white/65 transition-colors",
                          highlighted === product.name && "bg-[#D4AF37]/6",
                        )}
                        onMouseEnter={() => setHighlighted(product.name)}
                        onMouseLeave={() => setHighlighted(null)}
                      >
                        {row.key === "professionalRating" ? (
                          <StarRating rating={product.professionalRating} />
                        ) : (
                          value ?? "—"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  );
}
