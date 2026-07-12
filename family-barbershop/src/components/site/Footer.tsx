import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Smartphone,
} from "lucide-react";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { cn } from "@/lib/cn";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

type SocialKey = "instagram" | "facebook" | "googleReviews" | "yelp";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M21.8 12.2c0-.7-.1-1.2-.2-1.8H12v3.4h5.5c-.1.9-.8 2.3-2.2 3.2l2.9 2.2c1.7-1.6 2.8-4 2.8-7Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.8 0 5.2-.9 6.9-2.5l-2.9-2.2c-.8.6-1.8 1.1-4 1.1-3 0-5.6-2-6.5-4.8l-3 .2v2.3A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M5.5 13.8A6.1 6.1 0 0 1 5.2 12c0-.6.1-1.2.3-1.8l-3-.2V7.7A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.5l2.4-2.7Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.9c1.8 0 3.1.8 3.8 1.4l2.8-2.7C17.1 3.2 14.8 2 12 2A10 10 0 0 0 2.5 7.7l3 2.3C6.4 7.9 9 5.9 12 5.9Z"
      />
    </svg>
  );
}

function SocialBrandIcon({ name }: { name: SocialKey }) {
  const cls = "h-[18px] w-[18px]";

  switch (name) {
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls}>
          <defs>
            <linearGradient id="footer-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="35%" stopColor="#DD2A7B" />
              <stop offset="68%" stopColor="#8134AF" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#footer-ig-gradient)"
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="#1877F2">
          <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.6 1.6-1.6h1.6V4.8c-.8-.1-1.8-.2-2.9-.2-2.9 0-4.9 1.8-4.9 5.1V11H6.3v3h2.6v8h4.6Z" />
        </svg>
      );
    case "googleReviews":
      return <GoogleLogo className={cls} />;
    case "yelp":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="#FF1A1A">
          <path d="M12.27 2.18c-.2-.01-.4-.01-.6 0-1.1.08-2.03.62-2.7 1.42-.5.6-.8 1.35-.92 2.15l-.55 3.9-2.2-1.9c-.75-.64-1.7-.9-2.65-.74-1.05.18-1.95.82-2.48 1.75-.53.93-.62 2.05-.25 3.05l1.35 3.75-3.55-.95c-1-.27-2.05-.05-2.88.6-.83.65-1.33 1.65-1.38 2.75-.05 1.1.35 2.15 1.1 2.95.75.8 1.8 1.25 2.9 1.25h.15l3.75-.2-1.75 3.35c-.5.95-.45 2.1.15 3 .6.9 1.65 1.45 2.75 1.45.35 0 .7-.05 1.05-.15l3.55-1.15-.55 3.7c-.15 1.05.2 2.1.95 2.85.75.75 1.8 1.15 2.85 1.05 1.05-.1 2-.65 2.6-1.5.6-.85.75-1.95.4-2.95l-1.35-3.75 3.2 2.35c.9.65 2.05.8 3.1.4 1.05-.4 1.85-1.3 2.15-2.35.3-1.05.1-2.2-.55-3.05l-2.2-2.85 3.9.55c1.05.15 2.1-.25 2.8-1.05.7-.8 1-1.9.75-2.95-.25-1.05-1-1.9-2-2.35-1-.45-2.15-.35-3.05.25l-3.35 2.2.2-3.9c.05-1.1-.35-2.15-1.1-2.95-.75-.8-1.85-1.2-2.95-1.05Z" />
        </svg>
      );
  }
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="footer-quick-link group inline-flex items-center gap-2.5 text-[0.9375rem] leading-none text-white/58 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-brand-2"
    >
      <span>{label}</span>
      <ArrowRight
        className="footer-quick-link-arrow h-3.5 w-3.5 text-brand/80"
        aria-hidden="true"
      />
    </Link>
  );
}

function FooterContactLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "footer-contact-link group inline-flex items-center gap-3 text-[0.9375rem] text-white/58 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-brand-2";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ExternalLink
          className="ml-auto h-3.5 w-3.5 opacity-0 transition group-hover:opacity-60"
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  const { footer, googleReviews } = business;
  const bookingHref = business.links.bookingUrl || "/contact";

  const socials: Array<{ name: SocialKey; href: string; label: string }> = [
    ...(business.links.instagram
      ? [{ name: "instagram" as const, href: business.links.instagram, label: "Instagram" }]
      : []),
    ...(business.links.facebook
      ? [{ name: "facebook" as const, href: business.links.facebook, label: "Facebook" }]
      : []),
    ...(business.links.googleReviews
      ? [
          {
            name: "googleReviews" as const,
            href: business.links.googleReviews,
            label: "Google Reviews",
          },
        ]
      : []),
    ...(business.links.yelp
      ? [{ name: "yelp" as const, href: business.links.yelp, label: "Yelp" }]
      : []),
  ];

  return (
    <footer className="footer-premium relative overflow-hidden border-t border-white/10">
      <SectionAtmosphere variant="footer" particleCount={8} />

      <Container className="relative z-[1] pt-16 sm:pt-20">
        <div className="grid gap-12 pb-16 sm:gap-16 lg:grid-cols-12 lg:gap-10 lg:pb-20">
          <div className="relative lg:col-span-4">
            <div
              className="footer-logo-area-glow pointer-events-none absolute -left-6 top-0 h-56 w-56 rounded-full"
              aria-hidden="true"
            />

            <Link href="/" className="footer-brand group relative inline-flex flex-col gap-6">
              <div className="footer-logo-ring relative h-24 w-24 shrink-0 rounded-full p-[2.5px] sm:h-[6.25rem] sm:w-[6.25rem]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0a0a0a]">
                  <Image
                    src="/logo.png"
                    alt={`${business.name} logo`}
                    fill
                    className="object-cover object-center"
                    sizes="100px"
                  />
                </div>
              </div>

              <div>
                <div className="text-xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
                  {business.name}
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/52 sm:text-[0.9375rem]">
                  {footer.brandTagline}
                </p>
              </div>
            </Link>

            <div className="footer-google-card relative mt-10 overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_36px_rgba(0,0,0,0.28)]">
              <div
                className="footer-qr-glow pointer-events-none absolute inset-0"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-[1]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand/85">
                  Google Rating
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <GoogleLogo className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 text-xl tracking-[0.08em] text-brand sm:text-[1.35rem]">
                ★★★★★
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {googleReviews.aggregateRating.toFixed(1)} Google Rating
              </div>
              <p className="mt-1.5 text-sm text-white/48">
                {googleReviews.reviewCount}+ Verified Reviews
              </p>

              <div className="footer-google-qr-divider my-6" aria-hidden="true" />

              <div className="flex items-center gap-5">
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-qr-link group shrink-0 rounded-xl bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.32)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010]"
                  aria-label={footer.bookingQr.alt}
                >
                  <Image
                    src={footer.bookingQr.src}
                    alt={footer.bookingQr.alt}
                    width={120}
                    height={120}
                    sizes="120px"
                    loading="lazy"
                    className="h-[120px] w-[120px] min-w-[120px] object-contain"
                  />
                </a>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 shrink-0 text-brand/80" aria-hidden="true" />
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand/85">
                      Book Online
                    </p>
                  </div>
                  <p className="mt-2 text-base font-semibold text-white">{footer.bookingQr.scanLabel}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/48">{footer.bookingQr.scanSubtext}</p>
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-qr-book-link mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-2"
                  >
                    Book Appointment
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:pt-1">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <QuickLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:pt-1">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
              Contact
            </h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3.5">
                <MapPin
                  className="footer-contact-icon mt-0.5 h-5 w-5 shrink-0 text-brand/75"
                  aria-hidden="true"
                />
                <span className="leading-7 text-white/58">
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                </span>
              </li>
              <li>
                <FooterContactLink href={business.phoneHref}>
                  <Phone className="footer-contact-icon h-5 w-5 shrink-0 text-brand/75" aria-hidden="true" />
                  {business.phone}
                </FooterContactLink>
              </li>
              <li>
                <FooterContactLink href={business.mapsUrl} external>
                  <MapPin className="footer-contact-icon h-5 w-5 shrink-0 text-brand/75" aria-hidden="true" />
                  Open in Google Maps
                </FooterContactLink>
              </li>
              <li>
                <FooterContactLink href={business.emailHref}>
                  <Mail className="footer-contact-icon h-5 w-5 shrink-0 text-brand/75" aria-hidden="true" />
                  {business.email}
                </FooterContactLink>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 lg:pt-1">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
              Follow Us
            </h3>
            {socials.length ? (
              <ul className="mt-6 space-y-4">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link group inline-flex items-center gap-3.5 text-[0.9375rem] text-white/58 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white"
                    >
                      <span
                        className={cn(
                          "footer-social-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0c0c0c]",
                          social.name === "instagram" && "footer-social-icon--instagram",
                          social.name === "facebook" && "footer-social-icon--facebook",
                          social.name === "googleReviews" && "footer-social-icon--google",
                          social.name === "yelp" && "footer-social-icon--yelp",
                        )}
                      >
                        <SocialBrandIcon name={social.name} />
                      </span>
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-white/45">Add social links in business.ts</p>
            )}
          </div>
        </div>

        <div className="footer-divider mb-8" aria-hidden="true" />

        <div className="grid gap-4 pb-10 text-center text-xs text-white/42 sm:grid-cols-3 sm:pb-12 sm:text-left">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <p className="sm:text-center">{footer.craftedIn}</p>
          <p className="sm:text-right">
            <span className="text-white/35">Powered by </span>
            <span className="font-semibold tracking-[0.14em] text-brand/85">
              {footer.poweredBy}
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
