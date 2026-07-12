"use client";

import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

type GalleryShowcaseProps = {
  limit?: number;
  showHeader?: boolean;
};

export function GalleryShowcase({ limit, showHeader = true }: GalleryShowcaseProps) {
  const { galleryContent } = business;

  return (
    <section className="section-glow relative overflow-hidden border-y border-white/10">
      <SectionAtmosphere variant="gallery" particleCount={16} />

      <Container className="relative z-[1] py-20 sm:py-24">
        {showHeader ? (
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
                Gallery
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {galleryContent.sectionTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
                {galleryContent.sectionDescription}
              </p>
            </div>
            <ButtonLink href="/gallery" variant="secondary" size="sm" className="shrink-0">
              View full gallery
            </ButtonLink>
          </div>
        ) : null}

        <GalleryExperience limit={limit} />
      </Container>
    </section>
  );
}
