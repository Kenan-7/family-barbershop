import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact / Booking",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / Booking"
        title="Book an appointment or reach out"
        description="Call, send a message, or use online booking. We respond as quickly as possible during business hours."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.phoneHref} variant="secondary" size="lg">
            Call {business.phone}
          </ButtonLink>
          {business.links.bookingUrl ? (
            <ButtonLink href={business.links.bookingUrl} target="_blank" variant="primary" size="lg">
              Book online
            </ButtonLink>
          ) : (
            <ButtonLink href="#form" variant="primary" size="lg">
              Send a message
            </ButtonLink>
          )}
        </div>
      </PageHero>

      <section>
        <Container className="py-16">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Card className="p-7">
                <div className="text-base font-semibold text-white">Contact details</div>
                <div className="mt-4 space-y-4 text-sm text-white/70">
                  <div>
                    <div className="text-white/90 font-medium">Phone</div>
                    <a className="mt-1 inline-flex text-brand hover:text-brand/90" href={business.phoneHref}>
                      {business.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium">Address</div>
                    <div className="mt-1">
                      {business.addressLine1}
                      <br />
                      {business.addressLine2}
                    </div>
                    <a
                      className="mt-2 inline-flex text-brand hover:text-brand/90"
                      href={business.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium">Hours</div>
                    <dl className="mt-2 space-y-2">
                      {business.hours.map((h) => (
                        <div key={h.label} className="flex items-center justify-between gap-4">
                          <dt className="text-white/80">{h.label}</dt>
                          <dd className="text-right">{h.hours}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <div className="text-sm font-semibold text-white">Social</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ButtonLink
                      href={business.links.instagram || "#"}
                      variant="secondary"
                      size="sm"
                      target={business.links.instagram ? "_blank" : undefined}
                    >
                      Instagram
                    </ButtonLink>
                    <ButtonLink
                      href={business.links.facebook || "#"}
                      variant="secondary"
                      size="sm"
                      target={business.links.facebook ? "_blank" : undefined}
                    >
                      Facebook
                    </ButtonLink>
                    <ButtonLink
                      href={business.links.tiktok || "#"}
                      variant="secondary"
                      size="sm"
                      target={business.links.tiktok ? "_blank" : undefined}
                    >
                      TikTok
                    </ButtonLink>
                  </div>
                  <p className="mt-3 text-xs text-white/50">
                    Add your social links in <span className="text-white/70">`src/content/business.ts`</span>.
                  </p>
                </div>
              </Card>

              <Card className="mt-6 p-7">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand/85">
                    Visit us
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight text-white">
                    Location
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <iframe
                    title={`${business.name} location map`}
                    src={business.mapsEmbedUrl}
                    className="h-[320px] w-full sm:h-[380px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="p-7" id="form">
                <div className="text-base font-semibold text-white">Send a message</div>
                <p className="mt-2 text-sm text-white/70">
                  Share your preferred day/time and we’ll follow up. For fastest service, call us.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

