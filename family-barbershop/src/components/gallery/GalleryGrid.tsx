"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  GALLERY_CINEMATIC_ID,
  galleryFeaturedVideo,
  galleryItems,
  getCinematicFeature,
  getEditorialTailItems,
  getEditorialUpperItems,
  getGridItemsExcludingCinematic,
  type GalleryFilterCategory,
  type GalleryItem,
} from "@/content/gallery";
import { BeforeAfterCard } from "@/components/gallery/BeforeAfterCard";
import { FeaturedVideoCard } from "@/components/gallery/FeaturedVideoCard";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { GalleryCinematicBreak } from "@/components/gallery/GalleryCinematicBreak";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { GalleryVideoModal } from "@/components/gallery/GalleryVideoModal";
import { Container } from "@/components/site/Container";

function gridStyle(placement?: GalleryItem["gridPlacement"]) {
  if (!placement) return undefined;
  return {
    gridColumn: `${placement.colStart} / span ${placement.colSpan}`,
    gridRow: `${placement.rowStart} / span ${placement.rowSpan ?? 1}`,
  } as React.CSSProperties;
}

function isBeforeAfterItem(item: GalleryItem) {
  return item.category === "Before & After" && item.beforeImage && item.afterImage;
}

function renderCard(
  item: GalleryItem,
  index: number,
  openLightbox: (item: GalleryItem) => void,
  options?: { priority?: boolean; featured?: boolean },
) {
  const style = gridStyle(item.gridPlacement);
  if (isBeforeAfterItem(item)) {
    return <BeforeAfterCard key={item.id} item={item} index={index} style={style} />;
  }
  return (
    <GalleryCard
      key={item.id}
      item={item}
      index={index}
      onOpen={() => openLightbox(item)}
      priority={options?.priority}
      featured={options?.featured}
      layout="editorial"
      style={style}
    />
  );
}

export function GalleryGrid() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<GalleryFilterCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const cinematicFeature = getCinematicFeature();
  const upperItems = getEditorialUpperItems();
  const tailItems = getEditorialTailItems();

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return getGridItemsExcludingCinematic(galleryItems);
    }
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const lightboxItems = useMemo(
    () => filteredItems.filter((item) => !isBeforeAfterItem(item)),
    [filteredItems],
  );

  const openLightbox = (item: GalleryItem) => {
    if (isBeforeAfterItem(item)) return;
    const index = lightboxItems.findIndex((entry) => entry.id === item.id);
    if (index >= 0) setLightboxIndex(index);
  };

  const isEditorial = activeCategory === "All";

  const gridMotion = {
    initial: reduceMotion ? false : { opacity: 0, scale: 0.98, y: 14 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: reduceMotion ? undefined : { opacity: 0, scale: 0.99, y: -10 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      <GalleryFilters active={activeCategory} onChange={setActiveCategory} />

      <section className="gallery-page-section relative overflow-hidden">
        <div className="gallery-page-ambient-base pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="gallery-page-ambient-warm pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="gallery-page-ambient-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="gallery-page-ambient-noise pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="gallery-page-ambient-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="gallery-page-particles pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="gallery-page-particle"
              style={{
                left: `${6 + ((i * 17) % 88)}%`,
                top: `${10 + ((i * 21) % 82)}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        <Container className="relative z-[1] py-10 sm:py-12 lg:py-14">
          <AnimatePresence mode="wait">
            {isEditorial ? (
              <motion.div key="editorial-all" {...gridMotion} className="hidden md:block">
                <div className="gallery-editorial-grid gallery-editorial-grid--upper">
                  <FeaturedVideoCard
                    video={galleryFeaturedVideo}
                    onOpen={() => setVideoOpen(true)}
                    priority
                    style={gridStyle(galleryFeaturedVideo.gridPlacement)}
                  />
                  {upperItems.map((item, index) =>
                    renderCard(item, index, openLightbox, {
                      priority: item.id === "precision-haircut",
                      featured: item.id === "precision-haircut",
                    }),
                  )}
                </div>

                <GalleryCinematicBreak
                  item={cinematicFeature}
                  onOpen={() => openLightbox(cinematicFeature)}
                />

                <div className="gallery-editorial-grid gallery-editorial-grid--lower">
                  {tailItems.map((item, index) =>
                    renderCard(item, index + upperItems.length, openLightbox),
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`filter-${activeCategory}`}
                {...gridMotion}
                className="gallery-uniform-grid hidden md:grid"
              >
                {activeCategory === "Shop" ? (
                  <div className="col-span-full">
                    <GalleryCinematicBreak
                      item={cinematicFeature}
                      onOpen={() => openLightbox(cinematicFeature)}
                    />
                  </div>
                ) : null}
                {filteredItems
                  .filter((item) => activeCategory !== "Shop" || item.id !== GALLERY_CINEMATIC_ID)
                  .map((item, index) =>
                  isBeforeAfterItem(item) ? (
                    <BeforeAfterCard key={item.id} item={item} index={index} />
                  ) : (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      index={index}
                      onOpen={() => openLightbox(item)}
                      layout="uniform"
                    />
                  ),
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${activeCategory}`}
              {...gridMotion}
              className="gallery-mobile-stack flex flex-col gap-4 md:hidden"
            >
              {activeCategory === "All" ? (
                <>
                  <FeaturedVideoCard
                    video={galleryFeaturedVideo}
                    onOpen={() => setVideoOpen(true)}
                    priority
                  />
                  {upperItems.map((item, index) =>
                    isBeforeAfterItem(item) ? (
                      <BeforeAfterCard key={item.id} item={item} index={index} />
                    ) : (
                      <GalleryCard
                        key={item.id}
                        item={item}
                        index={index}
                        onOpen={() => openLightbox(item)}
                        priority={index < 2}
                        featured={item.id === "precision-haircut"}
                        layout="uniform"
                      />
                    ),
                  )}
                  <GalleryCinematicBreak
                    item={cinematicFeature}
                    onOpen={() => openLightbox(cinematicFeature)}
                  />
                  {tailItems.map((item, index) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      index={index + upperItems.length}
                      onOpen={() => openLightbox(item)}
                      layout="uniform"
                    />
                  ))}
                </>
              ) : (
                filteredItems.map((item, index) =>
                  isBeforeAfterItem(item) ? (
                    <BeforeAfterCard key={item.id} item={item} index={index} />
                  ) : (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      index={index}
                      onOpen={() => openLightbox(item)}
                      layout="uniform"
                    />
                  ),
                )
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          items={lightboxItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}

      {videoOpen && !galleryFeaturedVideo.externalUrl ? (
        <GalleryVideoModal
          videoSrc={galleryFeaturedVideo.videoSrc}
          posterSrc={galleryFeaturedVideo.poster}
          title={galleryFeaturedVideo.title}
          onClose={() => setVideoOpen(false)}
        />
      ) : null}
    </>
  );
}
