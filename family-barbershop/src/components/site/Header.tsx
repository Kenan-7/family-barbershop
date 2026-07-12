"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { Calendar, Menu, Phone, X } from "lucide-react";
import { business } from "@/content/business";
import { cn } from "@/lib/cn";
import { navItems } from "@/components/site/nav";
import { useFocusTrap } from "@/components/chatbot/useFocusTrap";

const BRAND_TAGLINE = "SINCE 2025";
const NAV_TRANSITION =
  "duration-[240ms] ease-out motion-reduce:transition-none motion-reduce:transform-none";

function NavLink({
  href,
  label,
  onNavigate,
  mobile = false,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "nav-link group relative inline-flex shrink-0 items-center whitespace-nowrap font-medium uppercase transition-[color,transform] focus-visible:outline-none focus-visible:ring-0",
        NAV_TRANSITION,
        mobile
          ? "min-h-11 w-full justify-start px-1 py-3 text-[10px] tracking-[0.14em]"
          : "text-[11px] tracking-[0.12em]",
        active ? "nav-link--active text-brand-2" : "text-white/55",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function BrandLogo() {
  return (
    <span className="brand-logo-wrap relative inline-flex shrink-0">
      <span aria-hidden="true" className="brand-logo-glow pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-brand/25 blur-2xl" />
      <span className="brand-logo-ring relative inline-flex shrink-0 rounded-full">
        <span className="brand-logo relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgba(6,6,6,0.95)]">
          <Image
            src="/logo.png"
            alt={`${business.name} logo`}
            width={88}
            height={88}
            priority
            sizes="(max-width: 1180px) 56px, (max-width: 1280px) 76px, 86px"
            className="h-full w-full shrink-0 object-contain"
          />
        </span>
      </span>
    </span>
  );
}

function BrandText() {
  return (
    <span className="brand-copy">
      <span className="brand-title">{business.name}</span>
      <span className="brand-subtitle">{BRAND_TAGLINE}</span>
    </span>
  );
}

function BrandBlock() {
  return (
    <Link
      href="/"
      aria-label={`${business.name} — ${BRAND_TAGLINE}`}
      className="brand-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,8,8,0.95)]"
    >
      <BrandLogo />
      <BrandText />
    </Link>
  );
}

function NavbarActions({ bookingHref }: { bookingHref: string }) {
  return (
    <div className="navbar-actions">
      <a
        href={business.phoneHref}
        className="call-now-button nav-cta-call inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3.5 text-[12px] font-semibold text-white/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,8,8,0.95)]"
      >
        <span aria-hidden="true" className="nav-cta-call-sweep" />
        <Phone
          className="nav-cta-phone-icon relative z-[1] h-4 w-4 shrink-0 text-brand-2/90"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="relative z-[1] whitespace-nowrap">{business.hero.secondaryCtaLabel}</span>
      </a>
      <a
        href={bookingHref}
        target={bookingHref.startsWith("http") ? "_blank" : undefined}
        rel={bookingHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className="book-appointment-button nav-cta-book inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a87428] via-[#d4b066] to-[#edd9a8] px-[22px] text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_8px_22px_rgba(197,157,95,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,8,8,0.95)]"
      >
        <span aria-hidden="true" className="nav-cta-book-sweep" />
        <Calendar
          className="nav-cta-calendar-icon relative z-[1] h-4 w-4 shrink-0 text-white"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="relative z-[1] whitespace-nowrap">{business.hero.primaryCtaLabel}</span>
      </a>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useFocusTrap(menuOpen);
  const bookingHref = business.links.bookingUrl || "/contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    startTransition(() => setMenuOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "site-header relative sticky top-0 z-50 flex h-[124px] w-full items-center overflow-x-hidden border-b border-brand/[0.12] bg-[rgba(8,8,8,0.72)] shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[20px] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-[240ms] ease-out",
        scrolled && "site-header--scrolled",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 z-[60] rounded-full bg-brand px-4 py-2 text-sm font-semibold text-black"
      >
        Skip to content
      </a>

      <div className="navbar-container">
        <div className="brand-section">
          <BrandBlock />
        </div>

        <nav className="desktop-navigation" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="navbar-end">
          <NavbarActions bookingHref={bookingHref} />

          <div className="mobile-menu-button">
          <a
            href={business.phoneHref}
            aria-label={business.hero.secondaryCtaLabel}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] text-brand-2/90 backdrop-blur-md transition-[border-color,transform] hover:-translate-y-px hover:border-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,8,8,0.95)]",
              NAV_TRANSITION,
            )}
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
          <a
            href={bookingHref}
            target={bookingHref.startsWith("http") ? "_blank" : undefined}
            rel={bookingHref.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={business.hero.primaryCtaLabel}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#a87428] via-[#d4b066] to-[#edd9a8] text-white shadow-[0_8px_22px_rgba(197,157,95,0.18)] transition-[transform,box-shadow] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,8,8,0.95)]",
              NAV_TRANSITION,
            )}
          >
            <Calendar className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] text-white/80 backdrop-blur-md transition-[border-color,transform] hover:-translate-y-px hover:border-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,8,8,0.95)]",
              NAV_TRANSITION,
            )}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="site-header-border pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent transition-opacity duration-[240ms] ease-out"
      />

      {menuOpen ? (
        <div
          ref={mobilePanelRef}
          id="mobile-nav-panel"
          className="mobile-nav-panel absolute inset-x-0 top-full z-[55] border-t border-brand/10 bg-[rgba(8,8,8,0.96)] backdrop-blur-[20px]"
        >
          <div className="mx-auto w-[calc(100%-32px)] max-w-[1440px] py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <nav aria-label="Mobile primary" className="flex w-full flex-col gap-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onNavigate={() => setMenuOpen(false)}
                  mobile
                />
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 sm:hidden">
              <a
                href={business.phoneHref}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] text-sm font-semibold text-white/90 backdrop-blur-md"
              >
                <Phone className="h-4 w-4 text-brand-2/90" strokeWidth={1.75} aria-hidden="true" />
                {business.hero.secondaryCtaLabel}
              </a>
              <a
                href={bookingHref}
                target={bookingHref.startsWith("http") ? "_blank" : undefined}
                rel={bookingHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a87428] via-[#d4b066] to-[#edd9a8] text-sm font-semibold text-white"
              >
                <Calendar className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                {business.hero.primaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
