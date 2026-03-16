import Image from "next/image";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Take a look inside"
        description="Add your real shop photos here anytime. Replace files in /public/gallery or update the list in src/content/business.ts."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Book / Contact
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">
            View services
          </ButtonLink>
        </div>
      </PageHero>

      <section>
        <Container className="py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {business.gallery.map((img) => (
              <figure
                key={img.src}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-5 text-sm text-white/80 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

