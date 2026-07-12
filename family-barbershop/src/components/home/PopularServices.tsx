"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import type { Service } from "@/content/business";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { cn } from "@/lib/cn";

const FEATURED_COUNT = 6;

function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
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
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function serviceBadge(service: Service) {
  if (service.popular) return "Most Booked";
  return "Premium Service";
}

function ServiceCard({
  service,
  index,
  visible,
}: {
  service: Service;
  index: number;
  visible: boolean;
}) {
  const imageSrc = service.imageSrc ?? "/gallery/_DSC6268.jpg";
  const imageAlt = service.imageAlt ?? `${service.name} at Family Barber Shop`;

  return (
    <article
      className={cn(
        "service-showcase-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0a0a0a]",
        "service-showcase-reveal",
        visible && "service-showcase-reveal-visible",
      )}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div
        className="service-showcase-glow pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-0"
        aria-hidden="true"
      />

      <div className="service-showcase-image relative h-[148px] shrink-0 overflow-hidden sm:h-[168px] lg:h-[180px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="service-showcase-image-media object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="service-showcase-overlay pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="absolute left-5 top-5 z-10">
          <span className="service-showcase-badge inline-flex items-center rounded-full border border-brand/25 bg-black/55 px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur-md">
            {serviceBadge(service)}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7 sm:pb-7 sm:pt-7">
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent sm:inset-x-7"
          aria-hidden="true"
        />

        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
          {service.name}
        </h3>

        <p className="mt-2.5 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-white/58">
          {service.description}
        </p>

        <div className="service-showcase-divider mt-auto flex items-end justify-between gap-5 border-t border-white/[0.07] pt-5">
          <div className="flex items-center gap-1.5 text-xs text-white/42">
            {service.duration ? (
              <>
                <Clock className="h-3.5 w-3.5 shrink-0 text-brand/65" aria-hidden="true" />
                <span>{service.duration}</span>
              </>
            ) : (
              <span className="invisible" aria-hidden="true">
                —
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="service-showcase-price inline-block text-2xl font-semibold tracking-tight text-brand">
              {service.price}
            </span>
          </div>
        </div>

        <div className="service-showcase-cta-wrap mt-5 min-h-[2.5rem]">
          <Link
            href={business.links.bookingUrl}
            className="service-showcase-cta group/cta inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book Appointment</span>
            <span
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PopularServices() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const services = business.services.slice(0, FEATURED_COUNT);

  return (
    <section className="section-glow relative overflow-hidden border-y border-white/10">
      <SectionAtmosphere variant="services" particleCount={14} />

      <Container className="relative z-[1] py-20 sm:py-24">
        <div
          className={cn(
            "service-showcase-reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
            visible && "service-showcase-reveal-visible",
          )}
          ref={ref}
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Popular services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
              Signature grooming experiences crafted with precision, comfort, and
              the kind of detail you expect from a premium barbershop.
            </p>
          </div>
          <ButtonLink href="/services" variant="secondary" size="sm" className="shrink-0">
            View all services
          </ButtonLink>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
