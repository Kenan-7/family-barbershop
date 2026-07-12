"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/business";
import { cn } from "@/lib/cn";

type ProductShowcaseCardProps = {
  product: Product;
  index?: number;
  visible?: boolean;
  className?: string;
};

export function ProductShowcaseCard({
  product,
  index = 0,
  visible = true,
  className,
}: ProductShowcaseCardProps) {
  const ctaLabel = product.ctaLabel ?? "Ask in Shop";
  const ctaHref = "/contact";
  const usesTransparentImage = product.transparentImage !== false;

  return (
    <article
      className={cn(
        "product-showcase-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0a0a0a]",
        "product-showcase-reveal",
        visible && "product-showcase-reveal-visible",
        className,
      )}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div
        className="product-showcase-card-glow pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-0"
        aria-hidden="true"
      />

      <div className="product-showcase-stage relative aspect-[4/3] shrink-0 overflow-hidden">
        <div
          className="product-showcase-stage-bg pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="product-showcase-stage-vignette pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="product-showcase-stage-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="product-showcase-stage-inner relative flex h-full items-end justify-center px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
          <div
            className="product-showcase-shadow product-showcase-shadow--soft pointer-events-none absolute bottom-[14%] left-1/2 h-4 w-[62%] rounded-[100%] bg-black/35 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="product-showcase-shadow product-showcase-shadow--core pointer-events-none absolute bottom-[15%] left-1/2 h-2.5 w-[42%] rounded-[100%] bg-black/55 blur-lg"
            aria-hidden="true"
          />

          <div className="product-showcase-image-frame relative z-10 flex h-full w-full items-end justify-center">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt ?? product.name}
              width={360}
              height={360}
              className={cn(
                "product-showcase-image h-auto max-h-[94%] w-auto max-w-[96%] object-contain object-bottom",
                usesTransparentImage
                  ? "product-showcase-image--transparent"
                  : "product-showcase-image--blend",
              )}
            />
          </div>
        </div>

        {product.badge ? (
          <div className="absolute left-5 top-5 z-20">
            <span className="product-showcase-badge inline-flex items-center rounded-full border border-brand/25 bg-black/55 px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur-md">
              {product.badge}
            </span>
          </div>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7 sm:pb-7 sm:pt-7">
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent sm:inset-x-7"
          aria-hidden="true"
        />

        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand/75">
          {product.category}
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-[1.3rem]">
          {product.name}
        </h3>

        {product.trustLabel ? (
          <p className="product-showcase-trust mt-2 flex items-center gap-2 text-[0.68rem] font-medium tracking-wide text-white/42">
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-brand/70"
              aria-hidden="true"
            />
            {product.trustLabel}
          </p>
        ) : null}

        <p className="mt-2.5 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-white/58">
          {product.description}
        </p>

        {(product.finish || product.hold) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.finish ? (
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white/50">
                {product.finish} finish
              </span>
            ) : null}
            {product.hold && product.hold !== "—" ? (
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white/50">
                {product.hold} hold
              </span>
            ) : null}
          </div>
        )}

        <div className="product-showcase-divider mt-auto flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
          <div className="product-showcase-cta-wrap min-h-[2.5rem] flex-1">
            <Link
              href={ctaHref}
              className="product-showcase-cta group/cta inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-2"
            >
              <span>{ctaLabel}</span>
              <span className="product-showcase-cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <span className="product-showcase-price shrink-0 text-2xl font-semibold tracking-tight text-brand">
            {product.price}
          </span>
        </div>
      </div>
    </article>
  );
}
