"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Car,
  Check,
  Copy,
  CreditCard,
  Footprints,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { business, type LocationFeature } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { DAY_LABELS, getShopStatus } from "@/lib/shopStatus";
import { cn } from "@/lib/cn";

const FEATURE_ICONS: Record<LocationFeature["icon"], LucideIcon> = {
  car: Car,
  footprints: Footprints,
  calendar: Calendar,
  "credit-card": CreditCard,
};

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

function ShopStatusCard() {
  const [status, setStatus] = useState(() => getShopStatus(new Date()));

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="shop-status-card rounded-[1.35rem] p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          Shop Status
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.02em]",
            status.isOpen
              ? "border-[rgba(110,190,150,0.22)] bg-[rgba(52,120,88,0.16)] text-[#9fd4b8]"
              : "border-[rgba(180,90,100,0.28)] bg-[rgba(100,38,48,0.22)] text-[#d9a8ae]",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              status.isOpen
                ? "bg-[#6db896] shadow-[0_0_8px_rgba(109,184,150,0.45)]"
                : "bg-[#a85c68] shadow-[0_0_8px_rgba(168,92,104,0.4)]",
            )}
            aria-hidden="true"
          />
          {status.isOpen ? "Open Now" : "Closed"}
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-brand-2">{status.statusDetail}</p>
      <p className="mt-1 text-sm text-white/45">
        Today ({status.todayLabel}): {status.hoursText}
      </p>
    </div>
  );
}

function BusinessHoursList() {
  const [todayLabel, setTodayLabel] = useState(() => DAY_LABELS[new Date().getDay()]);

  useEffect(() => {
    const update = () => setTodayLabel(DAY_LABELS[new Date().getDay()]);
    update();
  }, []);

  return (
    <div className="location-hours-card rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand/80">
        Business Hours
      </h3>
      <dl className="mt-4 space-y-2">
        {business.hours.map((entry) => {
          const isToday = entry.label === todayLabel;

          return (
            <div
              key={entry.label}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition-colors",
                isToday
                  ? "border border-brand/25 bg-brand/10 text-white"
                  : "text-white/65",
              )}
            >
              <dt className={cn("font-medium", isToday && "text-brand-2")}>{entry.label}</dt>
              <dd className="text-right">{entry.hours}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function LocationAddressCard() {
  const [copied, setCopied] = useState(false);
  const fullAddress = `${business.addressLine1}, ${business.addressLine2}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="location-address-card rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand/80">
            Location
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/72">
            {business.addressLine1}
            <br />
            {business.addressLine2}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ButtonLink href={business.mapsUrl} variant="secondary" size="sm" target="_blank">
          Open in Google Maps
        </ButtonLink>
        <button
          type="button"
          onClick={copyAddress}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-brand/25 hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-brand" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy Address
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  index,
  visible,
}: {
  feature: LocationFeature;
  index: number;
  visible: boolean;
}) {
  const Icon = FEATURE_ICONS[feature.icon];

  return (
    <article
      className={cn(
        "location-feature-card group relative overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-5 sm:p-6",
        "location-reveal",
        visible && "location-reveal-visible",
      )}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div
        className="location-feature-glow pointer-events-none absolute -inset-2 rounded-[1.4rem] opacity-0"
        aria-hidden="true"
      />
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-2">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-white">{feature.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{feature.description}</p>
    </article>
  );
}

export function LocationExperience() {
  const { locationContent } = business;
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-glow relative overflow-hidden border-y border-white/10">
      <SectionAtmosphere variant="location" particleCount={10} />

      <Container className="relative z-[1] py-20 sm:py-24">
        <div
          className={cn(
            "location-reveal mb-10 max-w-2xl",
            visible && "location-reveal-visible",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
            Hours & Location
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {locationContent.sectionTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
            {locationContent.sectionDescription}
          </p>
        </div>

        <div ref={ref} className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div
            className={cn(
              "location-map-wrap group relative overflow-hidden rounded-[1.5rem] border border-brand/30 min-h-[320px] sm:min-h-[380px] lg:min-h-[520px]",
              "location-reveal",
              visible && "location-reveal-visible",
            )}
          >
            <div
              className="location-map-glow pointer-events-none absolute -inset-2 rounded-[1.65rem]"
              aria-hidden="true"
            />
            <iframe
              title="Family Barber Shop location on Google Maps"
              src={business.mapsEmbedUrl}
              className="location-map-iframe absolute inset-0 h-full w-full border-0 grayscale-[0.15] contrast-[1.05] brightness-[0.82]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            <div
              className={cn("location-reveal", visible && "location-reveal-visible")}
              style={{ transitionDelay: visible ? "80ms" : "0ms" }}
            >
              <ShopStatusCard />
            </div>
            <div
              className={cn("location-reveal", visible && "location-reveal-visible")}
              style={{ transitionDelay: visible ? "140ms" : "0ms" }}
            >
              <BusinessHoursList />
            </div>
            <div
              className={cn("location-reveal", visible && "location-reveal-visible")}
              style={{ transitionDelay: visible ? "200ms" : "0ms" }}
            >
              <LocationAddressCard />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {locationContent.features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} visible={visible} />
          ))}
        </div>
      </Container>
    </section>
  );
}
