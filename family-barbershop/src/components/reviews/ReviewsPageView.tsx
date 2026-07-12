"use client";

import { ReviewsFeaturedCarousel } from "@/components/reviews/ReviewsFeaturedCarousel";
import { ReviewsGrid } from "@/components/reviews/ReviewsGrid";
import { ReviewsHero } from "@/components/reviews/ReviewsHero";
import { ReviewsLeaveCta } from "@/components/reviews/ReviewsLeaveCta";
import { ReviewsMarquee } from "@/components/reviews/ReviewsMarquee";
import { ReviewsStats } from "@/components/reviews/ReviewsStats";
import { ReviewsTrustBanner } from "@/components/reviews/ReviewsTrustBanner";
import { ReviewsDivider } from "@/components/reviews/reviews-shared";

export function ReviewsPageView() {
  return (
    <div className="reviews-page overflow-x-hidden bg-[#050505]">
      <ReviewsHero />
      <ReviewsDivider />
      <ReviewsStats />
      <ReviewsDivider />
      <ReviewsFeaturedCarousel />
      <ReviewsDivider />
      <ReviewsTrustBanner />
      <ReviewsMarquee />
      <ReviewsDivider />
      <ReviewsGrid />
      <ReviewsDivider />
      <ReviewsLeaveCta />
    </div>
  );
}
