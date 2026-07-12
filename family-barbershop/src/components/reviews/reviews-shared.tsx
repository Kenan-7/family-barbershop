"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LUXURY_EASE, useAnimatedNumber, useScrollReveal } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function GoogleLogo({ className }: { className?: string }) {
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

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  enabled = true,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  enabled?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const animated = useAnimatedNumber(value, enabled && !reduceMotion, decimals);
  const display = reduceMotion || !enabled
    ? `${decimals ? value.toFixed(decimals) : value}${suffix}`
    : `${decimals ? animated.toFixed(decimals) : animated}${suffix}`;

  return <span className={className}>{display}</span>;
}

export function AnimatedStars({
  className,
  size = "md",
  shimmer = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  shimmer?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const sizeClass =
    size === "lg" ? "text-2xl sm:text-3xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        sizeClass,
        shimmer && "reviews-stars-shimmer",
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.span
          key={index}
          className="reviews-star-char text-brand"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.4, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 22,
            delay: index * 0.1,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export function ShimmerStars({ className }: { className?: string }) {
  return (
    <div className={cn("reviews-stars-shimmer flex gap-0.5 text-brand", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="reviews-star-char" style={{ animationDelay: `${i * 0.15}s` }}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsDivider() {
  return <div className="reviews-divider" aria-hidden="true" />;
}

export function ReviewsSectionTitle({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("mx-auto max-w-2xl text-center", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: LUXURY_EASE }}
    >
      <ShimmerStars className="justify-center text-base sm:text-lg" />
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-2 text-sm text-white/45">{description}</p> : null}
    </motion.div>
  );
}

export function FloatingDust({ count = 8, className }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${4 + ((i * 23) % 92)}%`,
    top: `${8 + ((i * 17) % 84)}%`,
    delay: `${i * 0.7}s`,
    size: i % 3 === 0 ? "sm" : "md",
  }));

  return (
    <div className={cn("reviews-dust pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn("reviews-dust-particle", p.size === "sm" && "reviews-dust-particle--sm")}
          style={{ left: p.left, top: p.top, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}

export function useReviewsReveal<T extends HTMLElement>(threshold = 0.12) {
  return useScrollReveal<T>(threshold);
}
