"use client";

import { useMemo, useState } from "react";
import {
  galleryFeaturedVideo,
  galleryItems,
  type GalleryItem,
} from "@/content/gallery";
import { BeforeAfterCard } from "@/components/gallery/BeforeAfterCard";
import { FeaturedVideoCard } from "@/components/gallery/FeaturedVideoCard";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { GalleryVideoModal } from "@/components/gallery/GalleryVideoModal";
import { cn } from "@/lib/cn";

function isBeforeAfterItem(item: GalleryItem) {
  return item.category === "Before & After" && item.beforeImage && item.afterImage;
}

type GalleryExperienceProps = {
  limit?: number;
};

export function GalleryExperience({ limit }: GalleryExperienceProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const items = useMemo(
    () => (limit ? galleryItems.slice(0, limit) : galleryItems),
    [limit],
  );

  const lightboxItems = useMemo(
    () => items.filter((item) => !isBeforeAfterItem(item)),
    [items],
  );

  const openLightbox = (item: GalleryItem) => {
    if (isBeforeAfterItem(item)) return;
    const index = lightboxItems.findIndex((entry) => entry.id === item.id);
    if (index >= 0) setLightboxIndex(index);
  };

  return (
    <>
      <div className={cn("gallery-home-grid grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5")}>
        <FeaturedVideoCard
          video={galleryFeaturedVideo}
          onOpen={() => setVideoOpen(true)}
          priority
          className="sm:col-span-2"
        />
        {items.map((item, index) =>
            isBeforeAfterItem(item) ? (
              <BeforeAfterCard key={item.id} item={item} index={index} />
            ) : (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={() => openLightbox(item)}
                priority={index < 2}
                layout="uniform"
              />
          ),
        )}
      </div>

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
