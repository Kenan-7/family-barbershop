# Family Barber Shop — Project Instructions

## Project Goal

Build a **cinematic, premium, conversion-focused** website for **Family Barber Shop** in **Roswell, GA**.

The site should feel like a high-end barbershop experience online: dark, polished, and confident — while remaining **practical, fast, and easy to maintain**.

Primary outcomes:
- Drive **appointments** (Square booking)
- Drive **phone calls**
- Build **trust** before the first visit
- Help customers find the shop quickly

Every design and content decision should support conversion without sacrificing performance.

---

## Design Direction

### Visual Identity
- **Dark cinematic luxury** — deep backgrounds, layered depth, subtle motion
- **Warm gold accents** — brand highlights, CTAs, dividers, and trust elements
- Premium barbershop feel: refined, not flashy

### Layout & UX
- **Mobile-first** — design for phones first, then scale up
- Strong visual hierarchy and generous spacing
- Smooth, purposeful animations (respect `prefers-reduced-motion`)
- Fast perceived load — optimize media, avoid layout shift

### Hero
- **Full-screen haircut video hero** on the homepage
- Video should autoplay muted, loop, and cover the viewport
- Overlay headline + primary CTAs remain readable on all screen sizes
- Provide a static image fallback for reduced-motion or slow connections

---

## Conversion Priorities

### Primary CTAs (visible early and often)
1. **Book Appointment** — Square booking link
2. **Call Now** — `tel:` link
3. **Directions** — Google Maps link

Place CTAs in:
- Header (desktop + mobile)
- Hero
- Sticky mobile bar (optional, if it improves conversion)
- Section endings and footer

### Trust Indicators
Use real, verifiable signals only:
- Google review styling / link to leave a review
- Customer testimonials (real names and quotes from `business.ts`)
- Professional shop photography
- Clear address, hours, and phone
- Family-friendly and walk-in messaging where accurate

**No fabricated reviews, fake names, or placeholder trust copy on live pages.**

---

## Required Sections & Pages

### Homepage (section order may be redesigned for better UX)
Recommended flow:
1. **Full-screen video hero** + headline + CTAs
2. **Trust indicators** (ratings, badges, social proof)
3. **Our Barbers** — photos, names, short bios or specialties
4. **Featured services** preview
5. **Gallery** preview
6. **Reviews** preview
7. **Location & hours**
8. **Final CTA** block

Sections may be reordered, merged, or redesigned if it improves clarity and conversion.

### Dedicated Pages
| Page | Purpose |
|------|---------|
| Home | Cinematic entry point + key previews |
| About | Story, values, what to expect |
| Services | Full menu with pricing |
| Products | In-shop retail (if offered) |
| Gallery | Full photo grid |
| Reviews | Testimonials + link to Google reviews |
| Contact / Booking | Contact details, map embed, form, booking |

Page list may evolve, but **Services, Gallery, Reviews, and Location & Hours** must remain easy to find.

### Our Barbers Section
- Dedicated section on homepage (and optionally expanded on About)
- Real barber names and photos only
- Short specialty or style focus per barber
- Data should be editable from `src/content/business.ts` (add a `barbers` array if needed)

---

## Content Rules

### Real Business Information Only
All live copy, contact details, hours, prices, reviews, images, and links must reflect the actual business.

**Source of truth:** `src/content/business.ts`

| Field | Current value (edit in `business.ts`) |
|-------|--------------------------------------|
| Name | Family Barber Shop |
| Phone | 678-395-3129 |
| Address | 4750 Alabama Rd #116, Roswell, GA 30075 |
| Hours | Mon–Fri 9:00 AM–7:00 PM · Sat 8:00 AM–6:00 PM · Sun 10:00 AM–6:00 PM |
| Instagram | https://www.instagram.com/familybarbershopusa/ |
| Facebook | https://www.facebook.com/thefamily.barbershopusa |
| Booking | Square Appointments (see `business.links.bookingUrl`) |
| Google Reviews | See `business.links.googleReviews` |

### No Placeholder Text on Live Pages
Remove or replace before launch:
- "Lorem ipsum" or template filler paragraphs
- "Add your…" / "Placeholder" / "TODO" visible to visitors
- Duplicated or fabricated review cards
- Map or embed placeholders when a real embed is available

Developer TODOs belong in code comments or this file — not on the public site.

### Preserve SEO & Business Data
When redesigning, keep or improve:
- Page titles and meta descriptions
- Open Graph tags
- JSON-LD local business schema (`BarberShop`)
- `sitemap.xml` and `robots.txt`
- Consistent NAP (name, address, phone) across site and schema
- `business.siteUrl`, `geo` coordinates, and Google Maps URLs

---

## Technology Stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**

### Engineering Requirements
- Fully responsive, **mobile-first**
- Reusable components in `src/components/`
- Semantic HTML and accessible controls
- **Performance-friendly:**
  - Compress and resize images (target WebP, reasonable file sizes)
  - Use `next/image` with appropriate `sizes`
  - Lazy-load below-the-fold media
  - Keep hero video short and compressed (e.g. MP4/WebM, under ~5 MB if possible)
- SEO-friendly static generation where possible
- Clean, maintainable code — avoid unnecessary dependencies

---

## Code & File Organization

```
src/
├── app/              # Routes and page layouts
├── components/
│   ├── site/         # Header, Footer, Container, etc.
│   ├── home/         # Homepage-specific sections
│   ├── contact/
│   └── ui/           # Buttons, cards, badges
├── content/
│   └── business.ts   # All editable business content
└── lib/              # Shared utilities
public/
├── gallery/          # Shop and product photos
└── video/            # Hero video assets (recommended)
```

### Code Rules
- Edit business content in **`src/content/business.ts` only** — not scattered across pages
- Use reusable components; avoid duplicating section markup
- **Complete redesign of sections is allowed** when it improves UX or conversion
- Do not break existing booking, phone, or maps links during refactors
- Add comments only for non-obvious logic — not for content that belongs in `business.ts`

---

## Performance Checklist

Before considering a page done:
- [ ] Hero video has poster image and does not block first paint
- [ ] Gallery images are optimized (no multi-MB originals in production)
- [ ] Lighthouse mobile performance is acceptable
- [ ] CTAs work on real devices (tap-to-call, maps, booking)
- [ ] No placeholder or lorem text visible
- [ ] Reduced-motion path works (no required video for usability)

---

## Development Process

Recommended order for major updates:

1. Update `business.ts` (barbers, services, testimonials, media paths)
2. Add/optimize hero video and image assets in `public/`
3. Redesign homepage sections (video hero → trust → barbers → previews → CTA)
4. Align inner pages with new visual system
5. Remove all live placeholder copy
6. Verify CTAs, map embed, and booking flow on mobile
7. SEO pass (metadata, schema, sitemap, geo coordinates)
8. Performance pass (images, video, bundle size)

---

## Summary of Intent

| Priority | Approach |
|----------|----------|
| Look & feel | Dark cinematic luxury + warm gold |
| Hero | Full-screen haircut video |
| Layout | Mobile-first |
| Conversion | Book · Call · Directions everywhere it matters |
| Trust | Real reviews, photos, hours, location |
| Content | `business.ts` only — no fake data on site |
| Flexibility | Redesign sections freely if UX improves |
| Constraint | Stay fast, accessible, and SEO-ready |
