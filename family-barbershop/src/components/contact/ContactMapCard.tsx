"use client";

import { useState } from "react";
import { Check, Copy, MapPin, Navigation } from "lucide-react";
import { business } from "@/content/business";
import { contactPage, getFullAddress } from "@/content/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

export function ContactMapCard() {
  const [copied, setCopied] = useState(false);
  const fullAddress = getFullAddress();

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="contact-glass-card contact-premium-card flex h-full flex-col">
      <div className="contact-card-highlight" aria-hidden="true" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand/85">
            {contactPage.map.title}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">Location</h2>
        </div>
        <div className="contact-map-pin-indicator flex shrink-0 items-center gap-1.5 rounded-full border border-brand/20 bg-brand/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-2/90">
          <MapPin className="contact-map-pin-icon h-3.5 w-3.5 text-brand" aria-hidden="true" />
          Roswell
        </div>
      </div>

      <div className="contact-map-container mt-5">
        <div className="contact-map-frame overflow-hidden rounded-[1.125rem] border border-white/10 bg-black/40">
          <div className="contact-map-inner">
            <iframe
              title={`${business.name} location map`}
              src={business.mapsEmbedUrl}
              className="contact-map-iframe h-full min-h-[280px] w-full lg:min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="contact-map-vignette pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-medium leading-relaxed text-white/88">{business.addressLine1}</p>
          <p className="mt-0.5 text-sm text-white/50">{business.addressLine2}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <ButtonLink
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="md"
          className="contact-map-btn contact-directions-btn flex-1"
        >
          <Navigation className="contact-directions-icon h-4 w-4" aria-hidden="true" />
          {contactPage.map.directionsLabel}
        </ButtonLink>
        <button
          type="button"
          onClick={copyAddress}
          className={cn(
            "contact-secondary-button contact-map-btn inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/85 transition hover:border-brand/30 hover:bg-white/[0.06] hover:text-white",
            copied && "border-brand/30 text-brand-2",
          )}
        >
          {copied ? (
            <Check className="contact-copy-icon h-4 w-4 text-brand" aria-hidden="true" />
          ) : (
            <Copy className="contact-copy-icon h-4 w-4" aria-hidden="true" />
          )}
          {copied ? contactPage.map.copiedLabel : contactPage.map.copyLabel}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {contactPage.map.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-brand-2/90"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
