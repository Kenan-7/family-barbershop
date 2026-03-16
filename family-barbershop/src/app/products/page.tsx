import Image from "next/image";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Shop barber-approved essentials"
        description="Browse a few recommended grooming products. Update names, categories, and prices anytime in src/content/business.ts."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.links.bookingUrl || "/contact"} target={business.links.bookingUrl ? "_blank" : undefined} variant="primary" size="lg">
            Book
          </ButtonLink>
          <ButtonLink href={business.phoneHref} variant="secondary" size="lg">
            Call {business.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <section>
        <Container className="py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {business.products.map((product) => (
              <Card key={product.name} className="group overflow-hidden">
                {product.imageSrc ? (
                  <div className="relative aspect-[4/3] border-b border-white/10 bg-white/[0.03]">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt || product.name}
                      fill
                      className="object-contain p-7 transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <CardContent className="p-7">
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
    </>
  );
}

