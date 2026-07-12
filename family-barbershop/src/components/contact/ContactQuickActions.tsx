"use client";

import {
  Calendar,
  Check,
  Copy,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import { business } from "@/content/business";
import { contactPage, getFullAddress } from "@/content/contact";
import { cn } from "@/lib/cn";

const actions = [
  { id: "call", label: "Call", icon: Phone, href: business.phoneHref, external: false, iconClass: "contact-quick-phone" },
  {
    id: "book",
    label: "Book",
    icon: Calendar,
    href: business.links.bookingUrl || "/contact#form",
    external: Boolean(business.links.bookingUrl),
    iconClass: "contact-quick-calendar",
  },
  {
    id: "directions",
    label: "Directions",
    icon: MapPin,
    href: business.mapsUrl,
    external: true,
    iconClass: "contact-quick-directions",
  },
  { id: "reviews", label: "Google Reviews", icon: Star, href: business.links.googleReviews, external: true, iconClass: "" },
] as const;

export function ContactQuickActions() {
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

  const visibleActions = actions.filter((action) => Boolean(action.href));

  return (
    <div className="contact-glass-card contact-premium-card">
      <div className="contact-card-highlight" aria-hidden="true" />
      <p className="text-sm font-semibold text-white">{contactPage.quickActions.title}</p>
      <div className="contact-quick-grid mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {visibleActions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.id}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="contact-quick-action inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-white/75 transition hover:border-brand/30 hover:bg-white/[0.06] hover:text-[rgba(255,248,235,0.95)]"
            >
              <Icon className={cn("h-4 w-4 shrink-0 text-brand/85", action.iconClass)} aria-hidden="true" />
              <span className="truncate">{action.label}</span>
            </a>
          );
        })}
        <button
          type="button"
          onClick={copyAddress}
          className={cn(
            "contact-quick-action inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-white/75 transition hover:border-brand/30 hover:bg-white/[0.06] hover:text-[rgba(255,248,235,0.95)] sm:col-span-1",
            copied && "border-brand/30 text-brand-2",
          )}
        >
          {copied ? (
            <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          ) : (
            <Copy className="contact-copy-icon h-4 w-4 shrink-0 text-brand/85" aria-hidden="true" />
          )}
          <span className="truncate">{copied ? "Copied" : "Copy Address"}</span>
        </button>
      </div>
    </div>
  );
}
