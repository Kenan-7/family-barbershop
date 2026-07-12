"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { business } from "@/content/business";
import { contactPage } from "@/content/contact";
import { getShopStatus } from "@/lib/shopStatus";
import { cn } from "@/lib/cn";

export function ContactHoursPanel() {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(() => getShopStatus(new Date()));

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="contact-glass-card contact-premium-card contact-hours-card">
      <div className="contact-card-highlight" aria-hidden="true" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Clock className="contact-hours-clock mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-white">{contactPage.hours.title}</p>
            <p className="mt-1.5 text-sm text-white/55">
              <span
                className={cn(
                  "font-medium",
                  status.isOpen ? "text-emerald-200/85" : "text-amber-100/80",
                )}
              >
                {status.isOpen ? "Open now" : "Closed now"}
              </span>
              {" · "}
              Today ({status.todayLabel}) {status.hoursText}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        id={`${panelId}-toggle`}
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        aria-controls={`${panelId}-schedule`}
        className="contact-hours-toggle mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-2/90 transition hover:text-brand-2"
      >
        {expanded ? contactPage.hours.hideFullLabel : contactPage.hours.viewFullLabel}
        <ChevronDown
          className={cn(
            "contact-hours-chevron h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={`${panelId}-schedule`}
        role="region"
        aria-labelledby={`${panelId}-toggle`}
        className={cn(
          "contact-hours-collapse grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <dl className="mt-4 space-y-1 border-t border-white/[0.08] pt-4 text-sm">
            {business.hours.map((entry) => {
              const isToday = entry.label === status.todayLabel;
              return (
                <div
                  key={entry.label}
                  className={cn(
                    "contact-hours-row flex items-center justify-between gap-4 rounded-lg px-2.5 py-2 transition-colors",
                    isToday && "contact-hours-row--today bg-brand/10",
                  )}
                >
                  <dt className={cn("text-white/65", isToday && "font-medium text-brand-2/90")}>
                    {entry.label}
                    {isToday ? " (Today)" : ""}
                  </dt>
                  <dd className={cn("text-white/82", isToday && "font-medium text-white/92")}>
                    {entry.hours}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
