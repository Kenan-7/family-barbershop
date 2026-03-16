import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Stars } from "@/components/ui/Stars";

export const metadata = {
  title: "Reviews",
};

function GoogleBadge() {
  return (
    <div
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm"
      aria-label="Google"
      title="Google"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
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

export default function ReviewsPage() {
  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;
  const reviewLocations = [
    "Marietta, GA",
    "Atlanta, GA",
    "Alpharetta, GA",
    "Sandy Springs, GA",
    "Cumming, GA",
    "Roswell, GA",
  ];
  const reviewCards = Array.from({ length: 9 }).map((_, i) => {
    const source = business.testimonials[i % business.testimonials.length];
    return {
      ...source,
      key: `${source.name}-${i}`,
      name:
        i === 0
          ? "MT"
          : i === 1
            ? "Judah Delaney"
            : i === 2
              ? "Matthew Green"
              : i === 3
                ? "Jonathan Nguyen"
                : i === 4
                  ? "Andrew Hadge"
                  : i === 5
                    ? "Adam Leed"
                    : i === 6
                      ? "Anes Ribic"
                      : i === 7
                        ? "Daniel Suppes"
                        : "Will Liberman",
      location: reviewLocations[i % reviewLocations.length],
      featured: i === 0 || i === 4 || i === 8,
    };
  });

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Trusted by local customers"
        description="Reviews build confidence—especially for a local barbershop. Add real testimonials here and link to your Google Reviews page."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.phoneHref} variant="secondary" size="lg">
            Call {business.phone}
          </ButtonLink>
          <ButtonLink href={bookingHref} target={bookingTarget} variant="primary" size="lg">
            Book
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {reviewCards.map((t) => (
              <Card
                key={t.key}
                className="overflow-hidden rounded-[26px] border border-black/12 bg-white p-0 shadow-[0_14px_36px_rgba(23,23,23,0.08)]"
              >
                <div className="grid min-h-[210px] grid-cols-[1fr_5px]">
                  <div className="p-6 text-black">
                    <div className="flex items-start justify-between gap-4">
                      <div className="shrink-0">
                        <Stars rating={t.rating} className="text-black" />
                      </div>
                      <div className="flex items-start gap-3">
                        <GoogleBadge />
                        <div className="text-right">
                          <div
                            className={`text-[22px] font-semibold leading-none tracking-tight ${t.featured ? "text-brand" : "text-black"}`}
                          >
                            {t.name}
                          </div>
                          <div className="mt-1 text-sm text-black/55">
                            {t.location || business.neighborhoodOrArea}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-center text-[17px] leading-8 text-black/78">
                      {t.text}
                    </p>

                    <div className="mt-5 flex justify-center">
                      <Stars rating={t.rating} />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="h-20 w-[4px] rounded-full bg-black/55" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-black/12 bg-white p-8 shadow-[0_14px_36px_rgba(23,23,23,0.08)]">
            <div className="text-lg font-semibold text-black">Leave a review</div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/65">
              If you enjoyed your visit, we’d love to hear your feedback. Reviews help other local
              customers find a shop they can trust.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {business.links.googleReviews ? (
                <ButtonLink
                  href={business.links.googleReviews}
                  target="_blank"
                  variant="primary"
                  size="md"
                >
                  Leave a Google review
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" variant="primary" size="md">
                  Ask us for the review link
                </ButtonLink>
              )}
              <ButtonLink href="/gallery" variant="secondary" size="md">
                See our work
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-black/45">
              Tip: add your Google Reviews URL in <span className="text-black/70">`src/content/business.ts`</span>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

