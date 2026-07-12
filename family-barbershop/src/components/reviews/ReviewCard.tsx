"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { BadgeCheck, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getReviewLayout, type ReviewItem, type ReviewLayout } from "@/content/reviews";
import { getInitials, GoogleLogo, ShimmerStars } from "@/components/reviews/reviews-shared";
import { Stars } from "@/components/ui/Stars";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

function ReviewMeta({ review }: { review: ReviewItem }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-5">
      <div className="flex items-center gap-1.5">
        <BadgeCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand/80">
          Verified
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45">
          {review.category}
        </span>
        <time className="text-[11px] text-white/35">{review.date}</time>
      </div>
    </div>
  );
}

function AvatarBlock({
  review,
  large = false,
  photoReady = false,
}: {
  review: ReviewItem;
  large?: boolean;
  photoReady?: boolean;
}) {
  const sizeClass = large ? "h-14 w-14 text-base" : "h-10 w-10 text-xs";

  if (review.photoSrc) {
    return (
      <div className={cn("relative shrink-0 overflow-hidden rounded-full border border-brand/25", sizeClass)}>
        <Image src={review.photoSrc} alt="" fill className="object-cover" sizes="56px" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand/10 font-semibold text-brand-2",
        sizeClass,
        photoReady && "reviews-photo-placeholder",
      )}
      aria-hidden="true"
    >
      {getInitials(review.name)}
    </div>
  );
}

function QuoteLayout({ review }: { review: ReviewItem }) {
  return (
    <>
      <Quote
        className="reviews-quote-icon h-8 w-8 text-brand/25"
        aria-hidden="true"
        strokeWidth={1.25}
      />
      <ShimmerStars className="mt-4 text-sm" />
      <blockquote className="mt-5 text-lg font-medium leading-8 text-white/82 sm:text-xl sm:leading-9">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <AvatarBlock review={review} />
        <div>
          <h3 className="text-base font-semibold text-white">{review.name}</h3>
          <p className="text-xs text-white/42">{review.location}</p>
        </div>
      </div>
      <ReviewMeta review={review} />
    </>
  );
}

function CompactLayout({ review }: { review: ReviewItem }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AvatarBlock review={review} />
          <div>
            <h3 className="text-sm font-semibold text-white">{review.name}</h3>
            <p className="text-[11px] text-white/40">{review.location}</p>
          </div>
        </div>
        <div className="reviews-card-google-badge">
          <GoogleLogo className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4">
        <Stars rating={review.rating} className="[&_svg]:h-3.5 [&_svg]:w-3.5" />
      </div>
      <blockquote className="mt-3 line-clamp-4 text-sm leading-6 text-white/65">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <ReviewMeta review={review} />
    </>
  );
}

function HighlightLayout({ review }: { review: ReviewItem }) {
  return (
    <>
      <div className="reviews-highlight-ribbon text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
        Featured Review
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <AvatarBlock review={review} large />
        <GoogleLogo className="reviews-card-google-badge h-6 w-6 shrink-0" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{review.name}</h3>
      <p className="text-xs text-white/42">{review.location}</p>
      <div className="mt-4">
        <ShimmerStars className="text-sm" />
      </div>
      <blockquote className="mt-4 text-base leading-7 text-white/75">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <ReviewMeta review={review} />
    </>
  );
}

function GoogleLayout({ review }: { review: ReviewItem }) {
  return (
    <>
      <div className="reviews-google-header flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="reviews-card-google-badge reviews-card-google-badge--large flex h-12 w-12 items-center justify-center rounded-xl">
          <GoogleLogo className="h-7 w-7" />
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-white">Google Review</div>
          <Stars rating={review.rating} className="mt-1 justify-end [&_svg]:h-3.5 [&_svg]:w-3.5" />
        </div>
      </div>
      <blockquote className="mt-5 text-sm leading-7 text-white/68 sm:text-[0.95rem]">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <AvatarBlock review={review} />
        <div>
          <h3 className="text-sm font-semibold text-white">{review.name}</h3>
          <p className="text-xs text-white/42">{review.location}</p>
        </div>
      </div>
      <ReviewMeta review={review} />
    </>
  );
}

function PhotoLayout({ review }: { review: ReviewItem }) {
  return (
    <>
      <div className="flex items-start gap-4">
        <AvatarBlock review={review} large photoReady />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white">{review.name}</h3>
          <p className="text-xs text-white/42">{review.location}</p>
          <div className="mt-3">
            <Stars rating={review.rating} className="[&_svg]:h-4 [&_svg]:w-4" />
          </div>
        </div>
        <GoogleLogo className="reviews-card-google-badge h-5 w-5 shrink-0" />
      </div>
      <blockquote className="mt-5 text-sm leading-7 text-white/68">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <ReviewMeta review={review} />
    </>
  );
}

const layoutComponents: Record<ReviewLayout, ComponentType<{ review: ReviewItem }>> = {
  quote: QuoteLayout,
  compact: CompactLayout,
  highlight: HighlightLayout,
  google: GoogleLayout,
  photo: PhotoLayout,
};

export function ReviewCard({ review, index }: { review: ReviewItem; index: number }) {
  const reduceMotion = useReducedMotion();
  const layout = getReviewLayout(review, index);
  const LayoutComponent = layoutComponents[layout];

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2), ease: LUXURY_EASE }}
      className={cn(
        "reviews-glass-card group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.04] p-6 backdrop-blur-xl sm:p-7",
        layout === "highlight" && "reviews-glass-card--highlight",
        layout === "quote" && "reviews-glass-card--quote",
      )}
      style={{ willChange: "transform, opacity" }}
    >
      <Quote
        className="reviews-quote-hover pointer-events-none absolute right-5 top-5 h-10 w-10 text-brand/0"
        aria-hidden="true"
        strokeWidth={1.25}
      />
      <LayoutComponent review={review} />
    </motion.article>
  );
}
