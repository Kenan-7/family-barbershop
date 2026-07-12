"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowUpRight,
  HeartHandshake,
  MapPin,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { WhyChooseUsFeature, WhyChooseUsIconKey } from "@/content/business";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { cn } from "@/lib/cn";

const { whyChooseUs } = business;

const FEATURE_ICONS: Record<WhyChooseUsIconKey, LucideIcon> = {
  award: Award,
  "heart-handshake": HeartHandshake,
  sparkles: Sparkles,
  "map-pin": MapPin,
};

function useScrollReveal<T extends HTMLElement>(threshold = 0.12) {
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

function FeatureCard({
  feature,
  index,
  visible,
}: {
  feature: WhyChooseUsFeature;
  index: number;
  visible: boolean;
}) {
  const Icon = FEATURE_ICONS[feature.icon];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[rgba(212,166,74,0.18)] bg-[rgba(255,255,255,0.04)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(212,166,74,0.42)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_44px_rgba(0,0,0,0.24),0_0_36px_rgba(197,157,95,0.12)]",
        visible ? "why-choose-reveal-visible" : "why-choose-reveal",
      )}
      style={{ transitionDelay: visible ? `${180 + index * 90}ms` : undefined }}
    >
      <span
        aria-hidden="true"
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/25 bg-black/35 text-brand-2 shadow-[0_0_22px_rgba(197,157,95,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      >
        <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
      </span>
      <h3 className="text-[17px] font-semibold tracking-tight text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/58">{feature.description}</p>
    </article>
  );
}

function ShowcasePanel({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "group/showcase relative overflow-hidden rounded-[1.5rem] border border-brand/35 bg-[rgba(255,255,255,0.02)] shadow-[0_20px_50px_rgba(0,0,0,0.34),0_0_48px_rgba(197,157,95,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-[transform,opacity,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_26px_60px_rgba(0,0,0,0.38),0_0_56px_rgba(197,157,95,0.14),inset_0_1px_0_rgba(255,255,255,0.08)]",
        visible ? "why-choose-reveal-visible translate-y-0" : "why-choose-reveal translate-y-5",
      )}
      style={{ transitionDelay: visible ? "120ms" : undefined }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px -z-10 rounded-[1.5rem] bg-brand/10 opacity-60 blur-2xl transition-opacity duration-500 group-hover/showcase:opacity-90"
      />

      <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[400px]">
        <Image
          src={whyChooseUs.imageSrc}
          alt={whyChooseUs.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/showcase:scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(197,157,95,0.14),transparent_45%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-brand/5"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="rounded-xl border border-brand/20 bg-[rgba(8,8,8,0.72)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_44px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" aria-hidden="true" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand/90">
              The Family Barber Shop Experience
            </p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {whyChooseUs.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[13px] font-medium text-white/88"
              >
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 rounded-full bg-brand shadow-[0_0_8px_rgba(197,157,95,0.5)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-choose-heading"
      className="why-choose-section section-glow relative overflow-hidden border-t border-transparent"
    >
      <SectionAtmosphere variant="why-choose" particleCount={12} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="why-choose-pattern pointer-events-none absolute inset-0 z-[1] opacity-[0.2]"
      />

      <Container className="relative z-[2] max-w-[1320px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div
            className={cn(
              "max-w-xl transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              visible ? "why-choose-reveal-visible" : "why-choose-reveal",
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand/75">
              {whyChooseUs.eyebrow}
            </p>

            <h2
              id="why-choose-heading"
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {whyChooseUs.headline}
              <span className="mt-1.5 block bg-gradient-to-r from-brand via-brand-2 to-[#f3e2c4] bg-clip-text text-transparent">
                {whyChooseUs.headlineAccent}
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/62">
              {whyChooseUs.description}
            </p>

            <Link
              href={whyChooseUs.ctaHref}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-2 transition-[color,transform,gap] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-3 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060607]"
            >
              {whyChooseUs.ctaLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </Link>
          </div>

          <ShowcasePanel visible={visible} />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {whyChooseUs.features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} visible={visible} />
          ))}
        </div>
      </Container>
    </section>
  );
}
