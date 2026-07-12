"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ProductShowcaseCard } from "@/components/products/ProductShowcaseCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionAtmosphere, useAtmosphereMouse } from "@/components/ui/SectionAtmosphere";
import { cn } from "@/lib/cn";

const FEATURED_COUNT = 6;

function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

type ProductShowcaseProps = {
  limit?: number;
  showHeader?: boolean;
};

export function ProductShowcase({
  limit = FEATURED_COUNT,
  showHeader = true,
}: ProductShowcaseProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const products = business.products.slice(0, limit);
  const { onMouseMove } = useAtmosphereMouse(true);

  return (
    <section
      className="section-glow relative overflow-hidden border-y border-white/10"
      onMouseMove={onMouseMove}
      style={
        {
          "--atmosphere-mouse-x": "50%",
          "--atmosphere-mouse-y": "48%",
        } as CSSProperties
      }
    >
      <SectionAtmosphere variant="products" particleCount={12} />

      <Container className="relative z-[1] py-20 sm:py-24">
        {showHeader ? (
          <div
            className={cn(
              "product-showcase-reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
              visible && "product-showcase-reveal-visible",
            )}
            ref={ref}
          >
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
                Products
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Barber-Approved Products
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
                Professional grooming products we use and recommend in the shop.
              </p>
            </div>
            <ButtonLink href="/products" variant="secondary" size="sm" className="shrink-0">
              View all products
            </ButtonLink>
          </div>
        ) : null}

        <div
          ref={showHeader ? undefined : ref}
          className={cn(
            "grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7",
            showHeader ? "mt-12" : "mt-0",
          )}
        >
          {products.map((product, index) => (
            <ProductShowcaseCard
              key={product.name}
              product={product}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
