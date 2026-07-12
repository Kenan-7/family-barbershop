"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { business } from "@/content/business";
import { getFullAddress } from "@/content/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getShopStatus } from "@/lib/shopStatus";
import { cn } from "@/lib/cn";

export function ContactSummaryCard() {
  const [status, setStatus] = useState(() => getShopStatus(new Date()));
  const bookingHref = business.links.bookingUrl || "/contact#form";
  const fullAddress = getFullAddress();

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="contact-summary-card contact-premium-card">
      <div className="contact-card-highlight" aria-hidden="true" />

      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand/20 bg-black/50">
          <Image src="/logo.png" alt="" width={56} height={56} className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white/95">{business.name}</p>
          <p className="mt-0.5 text-xs text-white/48">{business.neighborhoodOrArea}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
            status.isOpen
              ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200/90"
              : "border-amber-400/20 bg-amber-500/10 text-amber-100/85",
          )}
        >
          <span
            className={cn(
              "contact-status-dot h-1.5 w-1.5 rounded-full",
              status.isOpen ? "bg-emerald-300/90 contact-status-dot--open" : "bg-amber-300/80",
            )}
            aria-hidden="true"
          />
          {status.isOpen ? "Open Now" : "Closed"}
        </span>
        <span className="text-xs text-white/45">{status.statusDetail}</span>
      </div>

      <div className="mt-5 space-y-0 border-t border-white/[0.08] pt-5 text-sm">
        <div className="contact-info-row flex items-start gap-3 py-3 text-white/72">
          <Clock className="contact-info-icon mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">Today</p>
            <p className="mt-1 text-white/85">
              {status.todayLabel}: {status.hoursText}
            </p>
          </div>
        </div>

        <div className="contact-info-row flex items-start gap-3 border-t border-white/[0.06] py-3 text-white/72">
          <Phone className="contact-info-icon mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">Phone</p>
            <a
              href={business.phoneHref}
              className="contact-info-link mt-1 inline-flex text-brand-2 transition-colors hover:text-brand"
            >
              {business.phone}
            </a>
          </div>
        </div>

        <div className="contact-info-row flex items-start gap-3 border-t border-white/[0.06] py-3 text-white/72">
          <MapPin className="contact-info-icon mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">Address</p>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-link mt-1 inline-block leading-relaxed transition-colors hover:text-white"
            >
              <span className="text-white/88">{business.addressLine1}</span>
              <br />
              <span className="text-white/52">{business.addressLine2}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink
          href={bookingHref}
          variant="primary"
          size="md"
          className="contact-summary-cta flex-1 text-white hover:text-white"
        >
          Book Appointment
        </ButtonLink>
        <ButtonLink
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="md"
          className="contact-summary-cta contact-directions-btn flex-1"
        >
          <Navigation className="contact-directions-icon h-4 w-4" aria-hidden="true" />
          Get Directions
        </ButtonLink>
      </div>

      <span className="sr-only">{fullAddress}</span>
    </div>
  );
}
