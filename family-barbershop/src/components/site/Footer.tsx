import Link from "next/link";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { navItems } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/ButtonLink";

type SocialKey = "instagram" | "facebook" | "tiktok" | "googleReviews";

function SocialIcon({ name }: { name: SocialKey }) {
  const cls = "h-5 w-5";
  switch (name) {
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.6 1.6-1.6h1.6V4.8c-.8-.1-1.8-.2-2.9-.2-2.9 0-4.9 1.8-4.9 5.1V11H6.3v3h2.6v8h4.6Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M16.7 6.2c1 .9 2.2 1.4 3.5 1.5V11c-1.7-.1-3.3-.7-4.6-1.8V15c0 3.6-2.9 6.5-6.5 6.5S2.6 18.6 2.6 15s2.9-6.5 6.5-6.5c.4 0 .9 0 1.3.1v3.6c-.4-.2-.8-.3-1.3-.3-1.7 0-3.1 1.4-3.1 3.1 0 1.7 1.4 3.1 3.1 3.1 1.9 0 3.2-1.5 3.2-3.4V2.5h3c.2 1.4.8 2.7 1.7 3.7Z" />
        </svg>
      );
    case "googleReviews":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10c0-.6-.1-1.2-.2-1.8H12v3.4h5.6A6.2 6.2 0 1 1 12 5.8c1.7 0 3.2.6 4.3 1.7l2.4-2.4A9.8 9.8 0 0 0 12 2Z" />
        </svg>
      );
  }
}

function SocialLink({ name, href }: { name: SocialKey; href: string }) {
  const label =
    name === "googleReviews"
      ? "Google Reviews"
      : name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <a
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <span className="text-white/75 transition group-hover:text-white">
        <SocialIcon name={name} />
      </span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

export function Footer() {
  const socials: Array<{ name: SocialKey; href: string }> = [
    ...(business.links.instagram ? [{ name: "instagram" as const, href: business.links.instagram }] : []),
    ...(business.links.facebook ? [{ name: "facebook" as const, href: business.links.facebook }] : []),
    ...(business.links.tiktok ? [{ name: "tiktok" as const, href: business.links.tiktok }] : []),
    ...(business.links.googleReviews
      ? [{ name: "googleReviews" as const, href: business.links.googleReviews }]
      : []),
  ];

  return (
    <footer className="border-t border-white/10 bg-black">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-lg font-semibold tracking-tight text-white">{business.name}</div>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
              {business.tagline} Walk-ins welcome when available. Appointments recommended.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <ButtonLink href={business.phoneHref} variant="secondary" size="sm">
                Call {business.phone}
              </ButtonLink>
              {business.links.bookingUrl ? (
                <ButtonLink
                  href={business.links.bookingUrl}
                  variant="primary"
                  size="sm"
                  target="_blank"
                >
                  Book online
                </ButtonLink>
              ) : null}
            </div>
            <div className="mt-6 text-sm text-white/70">
              <div className="font-medium text-white/90">Address</div>
              <div className="mt-1">{business.addressLine1}</div>
              <div>{business.addressLine2}</div>
              <a
                className="mt-2 inline-flex text-brand hover:text-brand/90"
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm font-semibold text-white">Hours</div>
            <dl className="mt-3 space-y-2 text-sm text-white/70">
              {business.hours.map((h) => (
                <div key={h.label} className="flex items-center justify-between gap-4">
                  <dt className="text-white/80">{h.label}</dt>
                  <dd className="text-right">{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-semibold text-white">Pages</div>
            <ul className="mt-3 space-y-2 text-sm">
              {navItems.map((i) => (
                <li key={i.href}>
                  <Link className="text-white/70 hover:text-white" href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-semibold text-white">Social</div>
            {socials.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <SocialLink key={s.name} name={s.name} href={s.href} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-white/60">
                Add social links in <span className="text-white/70">`src/content/business.ts`</span>.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {business.name}. All rights reserved.</div>
          <div className="group inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/65 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-brand/25 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(0,0,0,0.24)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand/50 blur-[1px]" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
            </span>
            <span className="uppercase tracking-[0.22em] text-white/45">Powered by</span>
            <span className="bg-gradient-to-r from-brand via-brand-2 to-white bg-clip-text text-sm font-semibold tracking-[0.28em] text-transparent">
              KA TECH
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

