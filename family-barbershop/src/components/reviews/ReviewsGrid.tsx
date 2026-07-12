"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { filterReviews, type ReviewFilterCategory } from "@/content/reviews";
import { Container } from "@/components/site/Container";
import { ReviewsFilters } from "@/components/reviews/ReviewsFilters";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { FloatingDust, ReviewsSectionTitle } from "@/components/reviews/reviews-shared";

export function ReviewsGrid() {
  const [activeFilter, setActiveFilter] = useState<ReviewFilterCategory>("All Reviews");
  const filtered = useMemo(() => filterReviews(activeFilter), [activeFilter]);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-14">
      <FloatingDust count={5} className="opacity-35" />

      <Container className="relative z-[1]">
        <ReviewsSectionTitle
          title="All customer reviews"
          description="Filter by service to find experiences like yours."
        />

        <div className="mt-8 sm:mt-10">
          <ReviewsFilters active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="reviews-masonry mt-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((review, index) => (
              <div key={review.id} className="reviews-masonry-item">
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
