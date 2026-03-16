import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { Badge } from "@/components/ui/Badge";

function GoogleMiniBadge() {
  return (
    <div
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm"
      aria-label="Google"
      title="Google"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
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
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 9H4v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6ZM5 6a1 1 0 0 0-1 1v2h16V7a1 1 0 0 0-1-1H5Z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M6.6 3.8A2 2 0 0 1 8.4 3h2a1 1 0 0 1 1 .8l.9 4a1 1 0 0 1-.3.9l-1.6 1.6a14.6 14.6 0 0 0 3.3 3.3l1.6-1.6a1 1 0 0 1 .9-.3l4 .9a1 1 0 0 1 .8 1v2a2 2 0 0 1-.8 1.8l-1.2.9a3.7 3.7 0 0 1-3.2.6 19 19 0 0 1-12.3-12.3 3.7 3.7 0 0 1 .6-3.2l.9-1.2Z"
      />
    </svg>
  );
}

export default function Home() {
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  return (
    <>
      {/* Hero */}
      <section className="section-glow relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="animate-neon-pulse absolute left-[-120px] top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(90,200,255,0.30)_0%,rgba(90,200,255,0.08)_38%,transparent_72%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-neon-drift absolute right-[8%] top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(197,157,95,0.30)_0%,rgba(197,157,95,0.10)_42%,transparent_76%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-neon-pulse absolute bottom-12 left-[38%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(230,200,143,0.22)_0%,rgba(230,200,143,0.07)_40%,transparent_75%)] blur-2xl"
        />
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="animate-rise-in lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Family-friendly</Badge>
                <Badge className="border-white/15 bg-white/5 text-white/80">Clean & professional</Badge>
                <Badge className="border-white/15 bg-white/5 text-white/80">
                  Walk-ins welcome
                </Badge>
              </div>
              <div className="hero-neon-line mt-6 h-px w-28 rounded-full" />
              <h1 className="hero-neon-title mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                A barbershop your whole family can trust.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                {business.name} delivers clean, modern cuts in a warm, welcoming space.
                Explore services, pricing, hours, and book in minutes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  href={bookingHref}
                  target={bookingTarget}
                  variant="primary"
                  size="lg"
                >
                  Book
                </ButtonLink>
                <ButtonLink href={business.phoneHref} variant="secondary" size="lg">
                  Call {business.phone}
                </ButtonLink>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Skilled barbers", v: "Precision fades & classic cuts" },
                  { k: "Clean shop", v: "Fresh, sanitized, tidy stations" },
                  { k: "Community feel", v: "Friendly service for all ages" },
                ].map((i) => (
                  <div
                    key={i.k}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:bg-white/[0.07]"
                  >
                    <div className="text-sm font-semibold text-white">{i.k}</div>
                    <div className="mt-1 text-sm text-white/70">{i.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-rise-in-delay-1 lg:col-span-7 lg:pl-4 xl:pl-8">
              <HeroShowcase
                images={business.gallery}
                hoursText={business.hours[0].hours}
                addressLine1={business.addressLine1}
                addressLine2={business.addressLine2}
                mapsUrl={business.mapsUrl}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="section-glow">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Why choose us"
            title="Premium cuts, welcoming vibe."
            description="We keep it simple: clean work, respectful service, and a shop you’re proud to bring your family to."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Consistent quality",
                desc: "Details matter—from the fade to the line-up.",
              },
              {
                title: "Family-first service",
                desc: "Comfortable for kids, teens, and adults.",
              },
              {
                title: "Clean & comfortable",
                desc: "Fresh stations, tidy tools, welcoming space.",
              },
              {
                title: "Local & trusted",
                desc: "Built on repeat customers and referrals.",
              },
            ].map((f) => (
              <Card key={f.title} className="p-6">
                <div className="text-base font-semibold text-white">{f.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{f.desc}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured services */}
      <section className="section-glow border-y border-white/10 bg-black/30">
        <Container className="py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Popular services"
              description="Clear pricing, easy to edit, and designed for quick decisions."
            />
            <ButtonLink href="/services" variant="secondary" size="sm">
              View all services
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {business.services.slice(0, 6).map((s) => (
              <Card key={s.name}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-base font-semibold text-white">{s.name}</div>
                        {s.popular ? <Badge>Popular</Badge> : null}
                      </div>
                      <div className="mt-1 text-sm text-white/70">{s.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-semibold text-white">{s.price}</div>
                      {s.duration ? (
                        <div className="mt-1 text-xs text-white/50">{s.duration}</div>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Products preview */}
      <section className="section-glow">
        <Container className="py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Products"
              title="Take the barbershop finish home"
              description="A few barber-approved grooming products for daily styling, beard care, and fresh upkeep."
            />
            <ButtonLink href="/products" variant="secondary" size="sm">
              View all products
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {business.products.slice(0, 6).map((product) => (
              <Card key={product.name} className="group overflow-hidden">
                {product.imageSrc ? (
                  <div className="relative aspect-[4/3] border-b border-white/10 bg-white/[0.03]">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt || product.name}
                      fill
                      className="object-contain p-6 transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-base font-semibold text-white">{product.name}</div>
                        {product.popular ? <Badge>Popular</Badge> : null}
                      </div>
                      {product.category ? (
                        <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-brand/85">
                          {product.category}
                        </div>
                      ) : null}
                      <div className="mt-3 text-sm leading-6 text-white/70">
                        {product.description}
                      </div>
                    </div>
                    <div className="text-base font-semibold text-white">{product.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews preview */}
      <section className="section-glow bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.20em] text-brand/90">
                Reviews
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                Customers love the results
              </h2>
              <p className="mt-4 text-base leading-7 text-black/65">
                Showcasing real feedback builds trust, especially for local businesses.
              </p>
            </div>
            <ButtonLink
              href="/reviews"
              variant="secondary"
              size="sm"
              className="!border-black !bg-black !text-white hover:!bg-black/90"
            >
              Read more reviews
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {business.testimonials.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="rounded-[24px] border border-black/10 bg-white p-6 text-black shadow-[0_14px_36px_rgba(23,23,23,0.08)] transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_44px_rgba(23,23,23,0.12)]"
              >
                <div className="flex items-start gap-3">
                  <GoogleMiniBadge />
                  <div>
                    <div className="text-base font-semibold text-black">{t.name}</div>
                    <div className="text-xs text-black/55">
                      {t.location || business.neighborhoodOrArea}
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-[4px_1fr] gap-4">
                  <div className="h-16 w-[4px] rounded-full bg-black/50" />
                  <div>
                    <p className="text-sm leading-6 text-black/72">{t.text}</p>
                    <div className="mt-4 flex justify-center">
                      <Stars rating={t.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery preview */}
      <section className="section-glow border-y border-white/10 bg-black/30">
        <Container className="py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="A clean, modern shop"
              description="Swap these placeholders with your photos anytime."
            />
            <ButtonLink href="/gallery" variant="secondary" size="sm">
              View gallery
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {business.gallery.slice(0, 4).map((img) => (
              <Link
                key={img.src}
                href="/gallery"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Hours & location preview */}
      <section className="section-glow">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Hours & location"
            title="Find us fast"
            description="Everything you need—hours, address, and directions—without hunting."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-7">
              <CardContent className="p-7">
                <div className="text-base font-semibold text-white">Location</div>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <ButtonLink href={business.mapsUrl} variant="secondary" size="sm" target="_blank">
                    Get directions
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="ghost" size="sm">
                    Contact / Booking →
                  </ButtonLink>
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <div className="text-sm font-semibold text-white">Google Maps embed</div>
                  <p className="mt-2 text-sm text-white/70">
                    Placeholder: add your Google Maps embed on the Contact page.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5">
              <CardContent className="p-7">
                <div className="text-base font-semibold text-white">Business hours</div>
                <dl className="mt-4 space-y-3 text-sm text-white/70">
                  {business.hours.map((h) => (
                    <div key={h.label} className="flex items-center justify-between gap-4">
                      <dt className="text-white/80">{h.label}</dt>
                      <dd className="text-right">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section-glow border-t border-white/10">
        <Container className="py-16">
          <Card className="overflow-hidden border-white/15 bg-black/45 shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,200,143,0.18),transparent_34%),radial-gradient(circle_at_85%_50%,rgba(197,157,95,0.16),transparent_26%),linear-gradient(90deg,rgba(197,157,95,0.18),rgba(255,255,255,0.04),transparent)]" />
              <div
                aria-hidden="true"
                className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-brand/18 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-10 h-32 w-32 rounded-full bg-brand-2/12 blur-3xl"
              />
              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.20em] text-brand/90">
                      Ready for your next cut?
                    </div>
                    <div className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      Call now or book an appointment in minutes.
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                      We’ll get you (and the family) looking sharp—fast, clean, and professional.
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                    <ButtonLink
                      href={bookingHref}
                      target={bookingTarget}
                      variant="primary"
                      size="lg"
                      className="h-16 w-full bg-gradient-to-r from-[#ae7c2d] via-[#d8b56b] to-[#f5e0ae] px-8 text-base text-black shadow-[0_20px_48px_rgba(197,157,95,0.34),0_0_26px_rgba(230,200,143,0.16)] hover:scale-[1.02] hover:shadow-[0_24px_58px_rgba(197,157,95,0.42),0_0_34px_rgba(230,200,143,0.22)] sm:min-w-[230px]"
                    >
                      <CalendarIcon />
                      Book Appointment
                    </ButtonLink>
                    <ButtonLink
                      href={business.phoneHref}
                      variant="secondary"
                      size="lg"
                      className="h-16 w-full border-white/14 bg-white/[0.06] px-8 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.10] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_40px_rgba(0,0,0,0.28)] sm:min-w-[190px]"
                    >
                      <PhoneIcon />
                      Call Now
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
