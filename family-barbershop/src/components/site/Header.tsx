"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business } from "@/content/business";
import { cn } from "@/lib/cn";
import { Container } from "@/components/site/Container";
import { navItems } from "@/components/site/nav";

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "rounded-full border px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition duration-300 xl:px-3 xl:text-[12px]",
        active
          ? "border-brand/30 bg-brand/12 text-brand-2 shadow-[0_0_24px_rgba(197,157,95,0.12)]"
          : "border-transparent text-white/74 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function ActionPill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "calendar" | "phone";
}) {
  const Icon = icon === "calendar" ? CalendarIcon : PhoneIcon;
  const isBooking = icon === "calendar";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex h-10 items-center rounded-full border pl-2 pr-3.5 text-[12px] font-semibold transition duration-300 hover:-translate-y-0.5 xl:h-11 xl:pl-2.5 xl:pr-4 xl:text-[13px]",
        isBooking
          ? "border-brand/45 bg-gradient-to-r from-[#ae7c2d] via-[#d8b56b] to-[#f3ddb0] text-black shadow-[0_16px_40px_rgba(197,157,95,0.22)] hover:shadow-[0_20px_46px_rgba(197,157,95,0.30)]"
          : "border-white/12 bg-white/[0.05] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_34px_rgba(0,0,0,0.20)] backdrop-blur-md hover:border-brand/20 hover:bg-white/[0.08]",
      )}
    >
      <span
        className={cn(
          "mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full xl:mr-2.5 xl:h-8 xl:w-8",
          isBooking
            ? "bg-black/10 text-black shadow-[0_10px_24px_rgba(0,0,0,0.10)]"
            : "bg-brand/15 text-brand-2 shadow-[0_10px_24px_rgba(197,157,95,0.12)]",
        )}
      >
        <Icon className="h-4 w-4 xl:h-4.5 xl:w-4.5" />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 5.5c0-.8.7-1.5 1.5-1.5h2.1c.7 0 1.3.5 1.5 1.2l.7 2.4c.2.7-.1 1.5-.7 1.9l-1.1.8c.9 1.7 2.4 3.2 4.1 4.1l.8-1.1c.4-.6 1.2-.9 1.9-.7l2.4.7c.7.2 1.2.8 1.2 1.5V18c0 .8-.7 1.5-1.5 1.5h-.7C11.8 19.5 4.5 12.2 4.5 5.5Z"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 2v3M16 2v3M4.5 9h15M6.5 5h11A2 2 0 0 1 19.5 7v13A2 2 0 0 1 17.5 22h-11A2 2 0 0 1 4.5 20V7A2 2 0 0 1 6.5 5Z"
      />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const bookingHref = business.links.bookingUrl || "/contact";

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(4,4,5,0.72)] backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-black"
      >
        Skip to content
      </a>
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
        <div className="absolute left-[12%] top-0 h-20 w-32 bg-brand/12 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[10%] top-0 h-20 w-32 bg-white/6 blur-3xl" aria-hidden="true" />
        <Container className="grid h-[108px] grid-cols-[minmax(0,300px)_1fr_auto] items-center gap-2 px-4 sm:px-5 lg:max-w-[1280px] lg:px-4 xl:grid-cols-[minmax(0,330px)_1fr_auto]">
          <div className="flex items-center gap-3 justify-self-start">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative inline-flex rounded-full bg-gradient-to-br from-brand/90 via-brand-2 to-white/35 p-[2px] shadow-[0_22px_44px_rgba(197,157,95,0.20)]">
                <span className="relative inline-flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),rgba(0,0,0,0.95))]">
                  <Image
                    src="/logo.png"
                    alt={`${business.name} logo`}
                    width={114}
                    height={114}
                    quality={100}
                    sizes="114px"
                    className="h-[128px] w-[128px] object-contain transition duration-500 group-hover:scale-[1.04]"
                    priority
                  />
                </span>
              </span>
              <div className="min-w-max leading-[0.95]">
                <div className="bg-gradient-to-r from-brand via-brand-2 to-white bg-clip-text text-[16px] font-semibold tracking-[0.02em] text-transparent sm:text-[23px] xl:text-[26px]">
                  Family
                </div>
                <div className="mt-0.5 whitespace-nowrap bg-gradient-to-r from-brand via-brand-2 to-white bg-clip-text text-[16px] font-semibold tracking-[0.02em] text-transparent sm:text-[23px] xl:text-[26px]">
                  Barber Shop
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden min-w-0 justify-center lg:flex lg:justify-self-center">
            <nav
              className="inline-flex max-w-full scale-[0.92] items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] px-1 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl xl:scale-100"
              aria-label="Primary"
            >
              {navItems.map((i) => (
                <NavLink key={i.href} href={i.href} label={i.label} />
              ))}
            </nav>
          </div>

          <div className="hidden justify-self-end lg:block">
            <div className="flex translate-x-5 items-center gap-3 xl:translate-x-20">
              <ActionPill href={bookingHref} label="Book Appointment" icon="calendar" />
              <ActionPill href={business.phoneHref} label="Call Now" icon="phone" />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/12 bg-white/[0.05] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md hover:border-brand/20 hover:bg-white/[0.09] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </Container>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[rgba(5,5,6,0.94)] backdrop-blur-xl lg:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-2 rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
              {navItems.map((i) => (
                <NavLink
                  key={i.href}
                  href={i.href}
                  label={i.label}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <ActionPill href={bookingHref} label="Book Appointment" icon="calendar" />
              <ActionPill href={business.phoneHref} label="Call Now" icon="phone" />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

