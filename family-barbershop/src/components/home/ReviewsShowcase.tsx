"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { business } from "@/content/business";
import type { Testimonial } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 6000;
const COUNT_DURATION_MS = 1400;

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M21.8 12.2c0-.7-.1-1.2-.2-1.8H12v3.4h5.5c-.1.9-.8 2.3-2.2 3.2l2.9 2.2c1.7-1.6 2.8-4 2.8-7Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.8 0 5.2-.9 6.9-2.5l-2.9-2.2c-.8.6-1.8 1.1-4 1.1-3 0-5.6-2-6.5-4.8l-3 .2v2.3A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M5.5 13.8A6.1 6.1 0 0 1 5.2 12c0-.6.1-1.2.3-1.8l-3-.2V7.7A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.5l2.4-2.7Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.9c1.8 0 3.1.8 3.8 1.4l2.8-2.7C17.1 3.2 14.8 2 12 2A10 10 0 0 0 2.5 7.7l3 2.3C6.4 7.9 9 5.9 12 5.9Z"
      />
    </svg>
  );
}

function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
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
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useAnimatedNumber(
  target: number,
  enabled: boolean,
  decimals = 0,
  duration = COUNT_DURATION_MS,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = eased * target;
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, decimals, duration]);

  return value;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TrustStats({ visible }: { visible: boolean }) {
  const { googleReviews } = business;
  const reducedMotion = useReducedMotion();

  const animate = visible && !reducedMotion;
  const rating = useAnimatedNumber(googleReviews.aggregateRating, animate, 1);
  const reviewCount = useAnimatedNumber(googleReviews.reviewCount, animate);
  const verifiedPercent = useAnimatedNumber(googleReviews.verifiedPercent, animate);

  const displayRating = visible
    ? reducedMotion
      ? googleReviews.aggregateRating
      : rating
    : 0;
  const displayReviewCount = visible
    ? reducedMotion
      ? googleReviews.reviewCount
      : reviewCount
    : 0;
  const displayVerified = visible
    ? reducedMotion
      ? googleReviews.verifiedPercent
      : verifiedPercent
    : 0;

  return (
    <div
      className={cn(
        "review-showcase-stats mb-8 sm:mb-10",
        visible && "review-showcase-stats-visible",
      )}
    >
      <div className="flex items-center gap-1 text-[1.65rem] tracking-[0.12em] text-brand sm:text-3xl">
        <span aria-hidden="true">★★★★★</span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-5">
        <div className="review-showcase-stat">
          <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {displayRating.toFixed(1)}
          </div>
          <div className="mt-1 text-sm font-medium text-white/45">Rating</div>
        </div>

        <div className="review-showcase-stat">
          <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {displayReviewCount}
            <span className="text-brand">+</span>
          </div>
          <div className="mt-1 text-sm font-medium text-white/45">
            {googleReviews.reviewCountLabel}
          </div>
        </div>

        <div className="review-showcase-stat">
          <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {displayVerified}
            <span className="text-brand">%</span>
          </div>
          <div className="mt-1 text-sm font-medium text-white/45">
            {googleReviews.verifiedPercentLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSlide({ testimonial }: { testimonial: Testimonial }) {
  const location = testimonial.location ?? business.neighborhoodOrArea;

  return (
    <div className="review-showcase-card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0a0a0a] p-7 sm:p-8 lg:p-9">
      <div
        className="review-showcase-card-glow pointer-events-none absolute -inset-3 rounded-[2rem] opacity-0"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-gradient-to-br from-brand/20 to-brand/5 text-sm font-semibold tracking-wide text-brand-2"
            aria-hidden="true"
          >
            {getInitials(testimonial.name)}
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">
              {testimonial.name}
            </div>
            <div className="mt-0.5 text-sm text-white/45">{location}</div>
          </div>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
          aria-label="Google"
          title="Google"
        >
          <GoogleLogo className="h-6 w-6" />
        </div>
      </div>

      <div className="relative mt-6">
        <Stars rating={testimonial.rating} className="[&_svg]:h-5 [&_svg]:w-5" />
      </div>

      <blockquote className="relative mt-6 flex-1 text-base leading-[1.75] text-white/72 sm:text-[1.05rem] sm:leading-8">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <div className="relative mt-8 flex items-center gap-2 border-t border-white/[0.07] pt-6">
        <BadgeCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand/85">
          Verified Google Review
        </span>
      </div>
    </div>
  );
}

export function ReviewsShowcase() {
  const { googleReviews, testimonials } = business;
  const reviews = testimonials;
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      const total = reviews.length;
      setActiveIndex(((index % total) + total) % total);
    },
    [reviews.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, reviews.length]);

  return (
    <section className="section-glow relative overflow-hidden border-y border-white/10">
      <SectionAtmosphere variant="reviews" particleCount={11} />

      <Container className="relative z-[1] py-20 sm:py-24">
        <div
          ref={ref}
          className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16"
        >
          <div
            className={cn(
              "review-showcase-visual relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-white/[0.08] sm:min-h-[26rem] lg:min-h-[38rem]",
              visible && "review-showcase-visual-visible",
            )}
          >
            <div
              className="review-showcase-visual-glow pointer-events-none absolute -inset-3 -z-10 rounded-[2rem]"
              aria-hidden="true"
            />
            <Image
              src={googleReviews.imageSrc}
              alt={googleReviews.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-brand/10"
              aria-hidden="true"
            />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 lg:max-w-[18rem]">
              <div className="review-showcase-floating-badge rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Star className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
                  <span>{googleReviews.floatingBadgeRating}</span>
                </div>
                <div className="mt-2 text-sm font-medium text-white/55">
                  {googleReviews.floatingBadgeReviews}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
                  Reviews
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Loved by our community
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="/reviews" variant="secondary" size="sm">
                  All reviews
                </ButtonLink>
                {business.links.googleReviews ? (
                  <ButtonLink
                    href={business.links.googleReviews}
                    variant="ghost"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            <TrustStats visible={visible} />

            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsPaused(false);
                }
              }}
            >
              <div
                className="review-showcase-carousel relative min-h-[20rem] sm:min-h-[22rem] lg:min-h-[24rem]"
                aria-live="polite"
                aria-atomic="true"
              >
                {reviews.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className={cn(
                      "review-showcase-slide absolute inset-0",
                      index === activeIndex
                        ? "review-showcase-slide-active"
                        : "review-showcase-slide-inactive",
                    )}
                    aria-hidden={index !== activeIndex}
                  >
                    <ReviewSlide testimonial={testimonial} />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {reviews.map((testimonial, index) => (
                    <button
                      key={testimonial.name}
                      type="button"
                      aria-label={`Go to review ${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      onClick={() => goTo(index)}
                      className={cn(
                        "review-showcase-dot h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        index === activeIndex
                          ? "w-7 bg-brand"
                          : "w-2 bg-white/20 hover:bg-white/35",
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={goPrev}
                    className="review-showcase-nav inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/30 hover:bg-white/[0.07] hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={goNext}
                    className="review-showcase-nav inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/30 hover:bg-white/[0.07] hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <p className="sr-only">
                Review {activeIndex + 1} of {reviews.length}: {reviews[activeIndex]?.name}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
