"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { reviewItems, type ReviewItem } from "@/content/reviews";
import { Container } from "@/components/site/Container";
import { Stars } from "@/components/ui/Stars";
import {
  FloatingDust,
  getInitials,
  GoogleLogo,
  ReviewsSectionTitle,
} from "@/components/reviews/reviews-shared";
import { debounce } from "@/lib/mobilePerformance";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 6000;
const SPRING = { type: "spring" as const, stiffness: 280, damping: 30, mass: 0.85 };

function getCircularOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function FeaturedReviewCard({
  review,
  isActive,
}: {
  review: ReviewItem;
  isActive: boolean;
}) {
  return (
    <article
      className={cn(
        "reviews-featured-card flex h-full flex-col rounded-[1.75rem] border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent p-7 backdrop-blur-xl sm:p-8",
        isActive && "reviews-featured-card-active",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-gradient-to-br from-brand/25 to-brand/5 text-sm font-semibold text-brand-2"
            aria-hidden="true"
          >
            {getInitials(review.name)}
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white">{review.name}</h3>
            <p className="mt-0.5 text-sm text-white/45">{review.location}</p>
          </div>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition",
            isActive && "reviews-featured-google-glow",
          )}
          aria-label="Google"
          title="Google"
        >
          <GoogleLogo className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-6">
        <Stars rating={review.rating} className="[&_svg]:h-5 [&_svg]:w-5" />
      </div>

      <blockquote className="mt-6 flex-1 text-base leading-[1.75] text-white/78 sm:text-[1.05rem] sm:leading-8">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-6">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand/85">
            Verified Google Review
          </span>
        </div>
        <time className="text-xs text-white/38">{review.date}</time>
      </div>
    </article>
  );
}

export function ReviewsFeaturedCarousel() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const reviews = useMemo(
    () =>
      [...reviewItems].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    [],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [slideWidth, setSlideWidth] = useState(340);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      setSlideWidth(width < 640 ? 268 : width < 1024 ? 310 : 370);
    };

    update();
    const onResize = debounce(update, 200);
    const observer = new ResizeObserver(update);
    observer.observe(node);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
    if (isPaused || !isInView || reduceMotion || reviews.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, isInView, reduceMotion, reviews.length]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  return (
    <section className="relative overflow-hidden bg-[#070707] py-12 sm:py-14">
      <div className="reviews-page-ambient-radial pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <FloatingDust count={6} className="opacity-50" />

      <Container className="relative z-[1]">
        <ReviewsSectionTitle
          title="Featured reviews"
          description="Real stories from customers who trust Family Barber Shop."
          className="mb-8 sm:mb-10"
        />

        <div
          ref={containerRef}
          className="relative outline-none"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured customer reviews"
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
            className="reviews-featured-stage relative mx-auto h-[min(28rem,72vh)] max-w-6xl overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            {reviews.map((review, index) => {
              const offset = getCircularOffset(index, activeIndex, reviews.length);
              const isVisible = Math.abs(offset) <= 1;
              if (!isVisible) return null;
              const isActive = offset === 0;

              return (
                <motion.div
                  key={review.id}
                  className="reviews-featured-slide absolute left-1/2 top-0 w-[min(90vw,38rem)]"
                  style={{
                    willChange: "transform, opacity, filter",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: `calc(-50% + ${offset * slideWidth}px)`,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                    z: isActive ? 0 : -140,
                    rotateY: offset * -6,
                  }}
                  transition={reduceMotion ? { duration: 0.2 } : SPRING}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50 || info.velocity.x < -400) goNext();
                    else if (info.offset.x > 50 || info.velocity.x > 400) goPrev();
                  }}
                  aria-hidden={!isActive}
                >
                  <FeaturedReviewCard review={review} isActive={isActive} />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              onClick={goPrev}
              className="reviews-carousel-nav inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex max-w-[50vw] items-center gap-2 overflow-hidden sm:max-w-none">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  aria-label={`Go to review ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-2 shrink-0 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-7 bg-brand" : "w-2 bg-white/20 hover:bg-white/35",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next review"
              onClick={goNext}
              className="reviews-carousel-nav inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="sr-only">
            Review {activeIndex + 1} of {reviews.length}: {reviews[activeIndex]?.name}. Use arrow keys to navigate.
          </p>
        </div>
      </Container>
    </section>
  );
}
