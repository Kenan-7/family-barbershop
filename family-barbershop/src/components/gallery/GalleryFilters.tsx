"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GALLERY_CATEGORIES, type GalleryFilterCategory } from "@/content/gallery";
import { cn } from "@/lib/cn";

export function GalleryFilters({
  active,
  onChange,
}: {
  active: GalleryFilterCategory;
  onChange: (category: GalleryFilterCategory) => void;
}) {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<GalleryFilterCategory, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const button = buttonRefs.current.get(active);
    const list = listRef.current;
    if (!button || !list) return;

    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setIndicator({
      left: buttonRect.left - listRect.left + list.scrollLeft,
      width: buttonRect.width,
    });
  }, [active]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="gallery-filters-sticky sticky top-[80px] z-40 md:top-[92px] xl:top-[108px]">
      <div className="gallery-filters-glass border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div
            ref={listRef}
            className="gallery-filters-scroll relative flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Gallery categories"
          >
            <motion.span
              className="gallery-filters-indicator pointer-events-none absolute bottom-[0.85rem] top-[0.85rem] rounded-full border border-brand/28 bg-brand/[0.08] shadow-[0_0_28px_rgba(197,157,95,0.14)]"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 400, damping: 34 }
              }
              aria-hidden="true"
            />

            {GALLERY_CATEGORIES.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  ref={(node) => {
                    if (node) buttonRefs.current.set(category, node);
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChange(category)}
                  className={cn(
                    "gallery-filter-btn relative z-[1] shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300",
                    isActive ? "text-brand-2" : "text-white/48 hover:text-white/72",
                  )}
                >
                  {category}
                  {isActive ? (
                    <motion.span
                      layoutId="gallery-filter-underline"
                      className="gallery-filters-underline absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand/80 to-transparent"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
