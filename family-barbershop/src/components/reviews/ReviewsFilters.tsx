"use client";

import { REVIEW_FILTER_CATEGORIES, type ReviewFilterCategory } from "@/content/reviews";
import { cn } from "@/lib/cn";

export function ReviewsFilters({
  active,
  onChange,
}: {
  active: ReviewFilterCategory;
  onChange: (category: ReviewFilterCategory) => void;
}) {
  return (
    <div className="reviews-filters flex flex-wrap justify-center gap-2 sm:gap-2.5">
      {REVIEW_FILTER_CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "reviews-filter-pill rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition sm:px-5 sm:text-[11px]",
              isActive
                ? "border-brand/45 bg-brand/15 text-brand-2"
                : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white/75",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
