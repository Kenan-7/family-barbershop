"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Check, Phone } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { getShopStatus } from "@/lib/shopStatus";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PARTICLE_COUNT = 5;

function PremiumCtaButton({
  href,
  variant,
  children,
  target,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  target?: string;
}) {
  const isExternal = href.startsWith("http");

  const className = cn(
    "premium-cta-btn group relative inline-flex h-14 min-w-[200px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 text-sm font-semibold sm:min-w-[220px] sm:text-base",
    variant === "primary"
      ? "premium-cta-btn--primary border border-brand/40 bg-gradient-to-r from-[#a67c3a] via-[#c59d5f] to-[#e6c88f] text-white"
      : "premium-cta-btn--secondary border border-white/15 bg-white/[0.06] text-white backdrop-blur-md",
  );

  const content = (
    <>
      <span className="premium-cta-btn-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </>
  );

  if (isExternal || target) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function PremiumClosingCta() {
  const { footer, googleReviews } = business;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsOpen(getShopStatus(new Date()).isOpen);
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      { id: "stars", label: "★★★★★", accent: true },
      { id: "rating", label: `${googleReviews.aggregateRating.toFixed(1)} Rating` },
      { id: "reviews", label: `${googleReviews.reviewCount}+ Reviews` },
      { id: "open", label: isOpen ? "Open Today" : "Closed Now" },
      { id: "family", label: "Family Friendly" },
    ],
    [googleReviews.aggregateRating, googleReviews.reviewCount, isOpen],
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        ref={sectionRef}
        className={cn(
          "premium-closing-section relative overflow-hidden border-t border-white/10",
          inView && "premium-closing-section--in-view",
        )}
      >
        <div className="premium-closing-bg absolute inset-0" aria-hidden="true" />
        <div className="premium-closing-vignette absolute inset-0" aria-hidden="true" />
        <div className="premium-closing-glow absolute inset-0" aria-hidden="true" />
        <div className="premium-closing-noise absolute inset-0" aria-hidden="true" />

        <div className="premium-closing-particles absolute inset-0" aria-hidden="true">
          {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
            <span
              key={index}
              className="premium-closing-particle"
              style={{
                left: `${12 + index * 18}%`,
                top: `${18 + ((index * 29) % 58)}%`,
                animationDelay: `${index * 0.9}s`,
              }}
            />
          ))}
        </div>

        <div
          className="premium-closing-watermark pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          FAMILY BARBER SHOP
        </div>

        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-16 sm:px-8 lg:min-h-[500px] lg:px-10">
          <m.div
            className="premium-closing-glass relative w-full rounded-[1.75rem] border border-white/10 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={containerVariants}
          >
            <m.h2
              className="premium-closing-headline mx-auto max-w-4xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[4.25rem] lg:leading-[1.05]"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {footer.closingHeadline}
            </m.h2>

            <m.p
              className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-white/58 sm:text-lg"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {footer.closingSubheadline}
            </m.p>

            <m.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8"
              variants={containerVariants}
            >
              {stats.map((stat) => (
                <m.div
                  key={stat.id}
                  className={cn(
                    "text-center text-sm font-medium sm:text-base",
                    stat.accent ? "tracking-[0.12em] text-brand" : "text-white/62",
                  )}
                  variants={statVariants}
                >
                  {stat.label}
                </m.div>
              ))}
            </m.div>

            <m.div
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <PremiumCtaButton href={bookingHref} variant="primary" target={bookingTarget}>
                <Calendar className="premium-cta-btn-icon h-5 w-5" aria-hidden="true" />
                Book Appointment
              </PremiumCtaButton>
              <PremiumCtaButton href={business.phoneHref} variant="secondary">
                <Phone className="premium-cta-btn-icon h-5 w-5" aria-hidden="true" />
                Call Now
              </PremiumCtaButton>
            </m.div>

            <m.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {footer.trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/48 sm:text-sm"
                >
                  <Check className="h-3.5 w-3.5 text-brand/80" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </m.div>

            <m.div
              className="premium-closing-divider-wrap mt-10 flex justify-center"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div
                className="premium-closing-divider h-px w-full max-w-md origin-center bg-gradient-to-r from-transparent via-brand to-transparent"
                aria-hidden="true"
              />
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
