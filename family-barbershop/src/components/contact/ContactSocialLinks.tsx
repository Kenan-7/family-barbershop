"use client";

import { getSocialLinks } from "@/content/contact";
import { contactPage } from "@/content/contact";
import { cn } from "@/lib/cn";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.2-.2-1.8H12v3.4h5.5c-.1.9-.8 2.3-2.2 3.2l2.9 2.2c1.7-1.6 2.8-4 2.8-7Z" />
      <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-2.9-2.2c-.8.6-1.8 1.1-4 1.1-3 0-5.6-2-6.5-4.8l-3 .2v2.3A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M5.5 13.8A6.1 6.1 0 0 1 5.2 12c0-.6.1-1.2.3-1.8l-3-.2V7.7A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.5l2.4-2.7Z" />
      <path fill="#EA4335" d="M12 5.9c1.8 0 3.1.8 3.8 1.4l2.8-2.7C17.1 3.2 14.8 2 12 2A10 10 0 0 0 2.5 7.7l3 2.3C6.4 7.9 9 5.9 12 5.9Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: ReturnType<typeof getSocialLinks>[number]["key"] }) {
  const cls = "h-[18px] w-[18px]";

  switch (name) {
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls}>
          <defs>
            <linearGradient id="contact-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="35%" stopColor="#DD2A7B" />
              <stop offset="68%" stopColor="#8134AF" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#contact-ig-gradient)"
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
    case "tiktok":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls} fill="#fff">
          <path d="M16.5 3c.4 2.2 1.7 3.9 3.8 4.2v3.1c-1.4 0-2.7-.4-3.8-1.1v6.6c0 3.4-2.8 5.5-5.8 5.5-3 0-5.2-2.1-5.2-5.1 0-3.1 2.4-5.2 5.4-5.2.4 0 .8 0 1.2.1v3.2c-.3-.1-.7-.1-1-.1-1.4 0-2.4.9-2.4 2.2s1 2.2 2.4 2.2c1.5 0 2.4-1 2.4-2.7V3h2.4Z" />
        </svg>
      );
  }
}

export function ContactSocialLinks() {
  const socials = getSocialLinks();
  if (!socials.length) return null;

  return (
    <div className="contact-glass-card contact-premium-card">
      <div className="contact-card-highlight" aria-hidden="true" />
      <p className="text-sm font-semibold text-white">{contactPage.social.title}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {socials.map((social) => (
          <a
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={cn(
              "contact-social-link inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0c0c0c] transition",
              social.key === "instagram" && "contact-social-link--instagram",
              social.key === "facebook" && "contact-social-link--facebook",
              social.key === "googleReviews" && "contact-social-link--google",
              social.key === "yelp" && "contact-social-link--yelp",
            )}
          >
            <SocialIcon name={social.key} />
          </a>
        ))}
      </div>
    </div>
  );
}
