"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { GalleryFeaturedVideo } from "@/content/gallery";
import { GalleryProgressiveImage } from "@/components/gallery/GalleryProgressiveImage";
import { cn } from "@/lib/cn";

const cardMotion = {
  initial: (reduceMotion: boolean) => (reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }),
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function FeaturedVideoCardContent({
  video,
  priority,
}: {
  video: GalleryFeaturedVideo;
  priority?: boolean;
}) {
  return (
    <>
      <div className="gallery-card-glow pointer-events-none absolute -inset-3 rounded-[1.4rem] opacity-30" aria-hidden="true" />

      <div className="gallery-card-media relative h-full min-h-[220px] w-full overflow-hidden">
        <GalleryProgressiveImage
          src={video.poster}
          alt=""
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="gallery-card-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="gallery-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/20" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="gallery-video-play-wrap relative inline-flex items-center justify-center">
          <span className="gallery-video-ring gallery-video-ring--1" aria-hidden="true" />
          <span className="gallery-video-ring gallery-video-ring--2" aria-hidden="true" />
          <span className="gallery-video-play relative z-[1] inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-brand/40 bg-black/55 text-brand backdrop-blur-md">
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
          </span>
        </span>
      </div>

      <div className="absolute left-4 top-4 z-10">
        <span className="inline-flex rounded-full border border-brand/25 bg-black/55 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-md">
          Shop Tour
        </span>
      </div>

      <div className="gallery-card-caption absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <h3 className="gallery-card-title text-lg font-semibold tracking-tight text-white sm:text-xl">
          {video.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/62">{video.description}</p>
        <span className="gallery-card-cta mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-2">
          Watch Now
          <ArrowUpRight className="gallery-card-cta-icon h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </>
  );
}

export function FeaturedVideoCard({
  video,
  onOpen,
  priority,
  className,
  style,
}: {
  video: GalleryFeaturedVideo;
  onOpen: () => void;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  const cardClassName = cn(
    "gallery-card gallery-video-card gallery-card--featured group relative w-full overflow-hidden rounded-[1.25rem] border border-brand/25 bg-[#0d0d0d] text-left",
    className,
  );

  if (video.externalUrl) {
    return (
      <motion.a
        href={video.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${video.title} — watch on Instagram`}
        className={cardClassName}
        style={style}
        initial={cardMotion.initial(Boolean(reduceMotion))}
        whileInView={cardMotion.whileInView}
        viewport={cardMotion.viewport}
        transition={cardMotion.transition}
      >
        <FeaturedVideoCardContent video={video} priority={priority} />
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={cardClassName}
      style={style}
      initial={cardMotion.initial(Boolean(reduceMotion))}
      whileInView={cardMotion.whileInView}
      viewport={cardMotion.viewport}
      transition={cardMotion.transition}
    >
      <FeaturedVideoCardContent video={video} priority={priority} />
    </motion.button>
  );
}
