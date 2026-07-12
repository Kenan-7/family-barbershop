"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useCoarsePointer, useDisableDecorativeMotion } from "@/lib/mobilePerformance";

export type SectionAtmosphereVariant =
  | "trust"
  | "why-choose"
  | "services"
  | "products"
  | "reviews"
  | "gallery"
  | "location"
  | "footer";

type SectionAtmosphereProps = {
  variant: SectionAtmosphereVariant;
  className?: string;
  particleCount?: number;
};

export function useAtmosphereMouse(enabled = false) {
  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--atmosphere-mouse-x", `${x}%`);
    event.currentTarget.style.setProperty("--atmosphere-mouse-y", `${y}%`);
  };

  return { onMouseMove: enabled ? onMouseMove : undefined };
}

export function SectionAtmosphere({
  variant,
  className,
  particleCount = 10,
}: SectionAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const disableDecorativeMotion = useDisableDecorativeMotion();
  const [inView, setInView] = useState(false);

  const motionOff = reduceMotion || disableDecorativeMotion;
  const effectiveParticleCount = coarsePointer
    ? Math.min(2, Math.ceil(particleCount / 5))
    : particleCount;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const particles = Array.from({ length: effectiveParticleCount }, (_, index) => ({
    id: index,
    left: `${6 + ((index * 19) % 88)}%`,
    top: `${10 + ((index * 27) % 80)}%`,
    delay: `${index * 0.55}s`,
    size: index % 3 === 0 ? "sm" : "md",
  }));

  if (coarsePointer && !inView) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "atmosphere pointer-events-none absolute inset-0",
        `atmosphere--${variant}`,
        coarsePointer && "atmosphere--lite",
        className,
      )}
      aria-hidden="true"
      initial={motionOff ? false : { opacity: 0 }}
      whileInView={motionOff ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="atmosphere-base absolute inset-0" />
      {!coarsePointer ? <div className="atmosphere-warm absolute inset-0" /> : null}
      {!motionOff && inView ? (
        <motion.div
          className="atmosphere-radial absolute inset-0"
          animate={{ opacity: [0.72, 1, 0.78], scale: [1, 1.03, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div className="atmosphere-radial absolute inset-0" />
      )}
      {!coarsePointer ? <div className="atmosphere-accent absolute inset-0" /> : null}
      {!coarsePointer ? <div className="atmosphere-noise absolute inset-0" /> : null}
      <div className="atmosphere-vignette absolute inset-0" />
      {!motionOff && inView && !coarsePointer ? (
        <motion.div
          className="atmosphere-spotlight absolute inset-0"
          animate={{ opacity: [0.55, 0.9, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      {!coarsePointer ? <div className="atmosphere-shimmer absolute inset-0" /> : null}

      {inView && effectiveParticleCount > 0 ? (
        <div className="atmosphere-particles absolute inset-0">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className={cn(
                "atmosphere-particle",
                particle.size === "sm" && "atmosphere-particle--sm",
              )}
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
