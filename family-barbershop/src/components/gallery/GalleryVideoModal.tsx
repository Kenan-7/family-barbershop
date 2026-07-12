"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

type GalleryVideoModalProps = {
  videoSrc: string;
  posterSrc: string;
  title: string;
  onClose: () => void;
};

export function GalleryVideoModal({
  videoSrc,
  posterSrc,
  title,
  onClose,
}: GalleryVideoModalProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      void video.play().catch(() => undefined);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      video?.pause();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="gallery-lightbox fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        <button
          type="button"
          aria-label="Close video"
          className="gallery-lightbox-backdrop absolute inset-0 bg-black/88 backdrop-blur-xl"
          onClick={onClose}
        />

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="gallery-lightbox-close absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 transition hover:border-brand/35 hover:text-white sm:right-8 sm:top-8"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <motion.div
          className="gallery-lightbox-panel relative z-10 w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_48px_rgba(197,157,95,0.12)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        >
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black"
            controls
            autoPlay
            muted
            playsInline
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            <track kind="captions" />
          </video>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
