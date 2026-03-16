import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & pricing"
        title="Simple, clear pricing"
        description="Browse popular services, see prices at a glance, and book quickly. Prices are easy to edit in one file."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Book / Contact
          </ButtonLink>
          <ButtonLink href={business.phoneHref} variant="secondary" size="lg">
            Call {business.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <section>
        <Container className="py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {business.services.map((s) => (
              <Card key={s.name} className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-base font-semibold text-white">{s.name}</div>
                      {s.popular ? <Badge>Popular</Badge> : null}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/70">{s.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold text-white">{s.price}</div>
                    {s.duration ? <div className="mt-1 text-xs text-white/50">{s.duration}</div> : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand/20 bg-brand/[0.08] p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-brand/90">
                  Retail products available
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                  We also carry Layrite styling products and beard care in-shop, so you can keep the same barbershop finish at home.
                </p>
              </div>
              <ButtonLink href="/products" variant="secondary" size="sm">
                View products
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

