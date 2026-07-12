# Family Barber Shop — Deployment Checklist

## Prerequisites

- Node.js 20+
- npm

## Repository layout

- **Git root:** `BarberShop/` (contains `instruction.md` and the app folder)
- **Application root:** `BarberShop/family-barbershop/` (Next.js app — set this as **Vercel Root Directory**)
- This is **not** a monorepo. Do not deploy from the repository root.
- The accidental root `package-lock.json` was removed. Only `family-barbershop/package-lock.json` is used.
- `outputFileTracingRoot` is **not** required — the app does not import files from outside `family-barbershop/`.

## Environment variables

Copy `.env.example` to `.env.local` for local development. In Vercel, add the same variables in Project Settings → Environment Variables.

| Variable | Required | Purpose |
|----------|----------|---------|
| `CONTACT_WEBHOOK_URL` | One of* | POST contact submissions to CRM/webhook |
| `RESEND_API_KEY` | One of* | Send contact form via Resend |
| `CONTACT_TO_EMAIL` | With Resend | Inbox for contact form (defaults to `business.email`) |
| `CONTACT_FROM_EMAIL` | With Resend | Verified sender domain in Resend |
| `OPENAI_API_KEY` | Optional | Enables AI responses in the Family Barber Assistant |
| `OPENAI_MODEL` | Optional | OpenAI model slug (default `gpt-4o-mini`) |
| `CHATBOT_RATE_LIMIT_PER_MINUTE` | Optional | Per-IP chat rate limit (default `20`) |

\*Configure **at least one** contact delivery method for production. Without it, the contact API returns **503** and the UI shows an error — never a false success.

### Chatbot without OpenAI

If `OPENAI_API_KEY` is unset, `/api/chat` uses the documented rule-based fallback (`source: "fallback"`). The assistant still works for hours, services, booking, and contact prompts.

## Commands

```bash
cd family-barbershop
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

If `npm run typecheck` fails with duplicate `.next/dev/types/* 2.ts` files:

```bash
# Stop any running dev server first
rm -rf .next
npm run typecheck
```

Do not commit `.next/`. If duplicate `* 2.ts` files return, check iCloud/OneDrive/Finder duplication on the `.next` folder.

## Platform notes

- **Vercel (recommended):** Import repo, set **Root Directory** to `family-barbershop`, add env vars, deploy.
- Set production domain to match `business.siteUrl` in `src/content/business.ts`.

## Domain setup

- [ ] DNS points to hosting provider
- [ ] HTTPS enabled
- [ ] `business.siteUrl` matches live domain
- [ ] Google Maps embed loads on Contact and Home
- [ ] Booking URL opens correct Square scheduler
- [ ] Footer QR scans to the same booking flow

## Gallery booking QR

The booking QR lives in the **footer** (inside the Google rating card) on every page. The Gallery page already has a hero **Book Appointment** CTA, so a second large gallery QR block was intentionally **not** added to avoid repetitive booking sections.

## Post-deployment smoke tests

- [ ] Home loads — no horizontal scroll at 320px–1920px
- [ ] Navbar: desktop grid layout, mobile menu opens/closes (Escape, focus trap)
- [ ] All nav routes load (Home, About, Services, Products, Gallery, Reviews, Contact)
- [ ] Phone `tel:` links work
- [ ] Book Appointment CTA works
- [ ] Products carousel — no duplicate-key console warnings
- [ ] Gallery “Watch Our Shop” opens Instagram reel
- [ ] Footer QR links to Square booking
- [ ] Google Maps loads on Contact page
- [ ] Contact form: success with delivery configured; clear error without
- [ ] AI assistant: fallback without OpenAI key; AI mode with key
- [ ] Gallery lightbox / carousels function
- [ ] Open/closed status shows correctly for current day
- [ ] `robots.txt` and `sitemap.xml` accessible

## Content verification

- [ ] Phone, address, hours consistent across header, footer, contact
- [ ] `business.geo` matches Google Maps listing (34.0662981, -84.4233375)
- [ ] Social links only show when URLs are set in `business.ts` (TikTok/Yelp hidden when empty)
- [ ] Team photos and names on About page are current
