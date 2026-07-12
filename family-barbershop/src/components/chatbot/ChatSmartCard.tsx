"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { business } from "@/content/business";
import { chatbotConfig } from "@/lib/chatbot/config";
import { getShopStatus } from "@/lib/chatbot/hours";
import type { ChatCard } from "@/lib/chatbot/types";
import { cn } from "@/lib/cn";

const fullAddress = `${business.addressLine1}, ${business.addressLine2}`;

const CARD_SPRING: Transition = { type: "spring", stiffness: 380, damping: 30 };

function useCardMotion() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return { initial: false as const, animate: undefined, transition: undefined };
  }
  return {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: CARD_SPRING,
  };
}

export function ChatSmartCard({ card }: { card: ChatCard }) {
  if (card.type === "hours") return <HoursCard />;
  if (card.type === "directions") return <DirectionsCard />;
  if (card.type === "products") return <ProductsCard />;
  return <ServicesCard />;
}

function HoursCard() {
  const status = getShopStatus();
  const motionProps = useCardMotion();

  return (
    <motion.div className="chatbot-smart-card mt-3 overflow-hidden" {...motionProps}>
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-2/80">
          Business Hours
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-medium",
            status.isOpen ? "text-emerald-300/90" : "text-white/50",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              status.isOpen ? "bg-emerald-400 chatbot-pulse-dot" : "bg-white/35",
            )}
          />
          {status.label}
        </span>
      </div>
      <ul className="divide-y divide-white/[0.05] px-4 py-1">
        {business.hours.map((entry) => (
          <li
            key={entry.label}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <span className="font-medium text-white/55">{entry.label}</span>
            <span className="text-white/82">{entry.hours}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DirectionsCard() {
  const [copied, setCopied] = useState(false);
  const motionProps = useCardMotion();

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <motion.div className="chatbot-smart-card mt-3 p-4" {...motionProps}>
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/[0.08]">
          <MapPin className="h-4 w-4 text-brand-2" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-2/80">
            Visit Us
          </p>
          <p className="mt-1.5 text-sm font-medium text-white/88">{business.addressLine1}</p>
          <p className="text-sm text-white/58">{business.addressLine2}</p>
          <p className="mt-1 text-xs text-white/42">Free parking at the shop</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyAddress}
          className="chatbot-action-btn inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/75"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy Address"}
        </button>
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chatbot-action-btn inline-flex min-h-9 items-center rounded-full border border-brand/25 bg-brand/[0.08] px-3.5 py-2 text-xs font-semibold text-brand-2"
        >
          Open Google Maps
        </a>
        <a
          href={chatbotConfig.phoneHref}
          className="chatbot-action-btn inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/75"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          Call Shop
        </a>
      </div>
    </motion.div>
  );
}

function ProductsCard() {
  const motionProps = useCardMotion();
  const featured = business.products.filter((p) => p.popular).slice(0, 2);
  const others = business.products.filter((p) => !p.popular).slice(0, 2);
  const items = [...featured, ...others].slice(0, 3);

  return (
    <motion.div className="chatbot-smart-card mt-3 overflow-hidden" {...motionProps}>
      <div className="border-b border-white/[0.06] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-2/80">
          In-Shop Products
        </p>
        <p className="mt-1 text-xs text-white/45">
          Barber favorite: {business.productsPage.barbersPick.productName}
        </p>
      </div>
      <ul className="divide-y divide-white/[0.05]">
        {items.map((product) => (
          <li key={product.name} className="flex items-center gap-3 px-4 py-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt ?? product.name}
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/88">{product.name}</p>
              <p className="text-xs text-white/45">{product.category}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-brand-2">{product.price}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/[0.06] px-4 py-3">
        <a
          href="/products"
          className="chatbot-action-btn inline-flex min-h-9 w-full items-center justify-center rounded-full border border-brand/25 bg-brand/[0.08] text-xs font-semibold text-brand-2"
        >
          View All Products
        </a>
      </div>
    </motion.div>
  );
}

function ServicesCard() {
  const motionProps = useCardMotion();
  const items = business.services.slice(0, 5);

  return (
    <motion.div className="chatbot-smart-card mt-3 overflow-hidden" {...motionProps}>
      <div className="border-b border-white/[0.06] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-2/80">
          Services & Pricing
        </p>
      </div>
      <ul className="divide-y divide-white/[0.05]">
        {items.map((service) => (
          <li key={service.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/88">{service.name}</p>
              {service.duration ? (
                <p className="text-xs text-white/42">{service.duration}</p>
              ) : null}
            </div>
            <span className="shrink-0 text-sm font-semibold text-brand-2">{service.price}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/[0.06] px-4 py-3">
        <a
          href="/services"
          className="chatbot-action-btn inline-flex min-h-9 w-full items-center justify-center rounded-full border border-brand/25 bg-brand/[0.08] text-xs font-semibold text-brand-2"
        >
          View All Services
        </a>
      </div>
    </motion.div>
  );
}
