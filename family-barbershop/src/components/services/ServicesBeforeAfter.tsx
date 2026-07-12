"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ServicesBeforeAfter } from "@/content/business";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

function ComparisonSlider({ item }: { item: ServicesBeforeAfter }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    setIsDragging(true);
    containerRef.current?.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="services-compare">
      <p className="mb-4 text-center text-sm font-medium text-white/55">{item.label}</p>

      <div
        ref={containerRef}
        className="services-compare-frame relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded-[1.35rem] border border-white/[0.08] select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label={`Before and after comparison: ${item.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
      >
        <Image
          src={item.afterSrc}
          alt={item.afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={item.beforeSrc}
            alt={item.beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        <div
          className="services-compare-handle absolute inset-y-0 z-10 w-0.5 bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="services-compare-knob absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/70 backdrop-blur-sm">
            <ChevronLeft className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
            <ChevronRight className="-ml-1 h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
          </span>
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37] backdrop-blur-sm">
          After
        </span>
      </div>
    </div>
  );
}

export function ServicesBeforeAfter() {
  const { beforeAfterTitle, beforeAfterDescription, beforeAfter } = business.servicesPage;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-before-after-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28"
    >
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.08)}
        >
          <motion.h2
            id="services-before-after-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {beforeAfterTitle}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/52"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {beforeAfterDescription}
          </motion.p>
        </motion.div>

        <motion.div
          className={cn(
            "mt-12 grid gap-10",
            beforeAfter.length > 1 ? "lg:grid-cols-2" : "max-w-2xl mx-auto",
          )}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.15, 0.1)}
        >
          {beforeAfter.map((item) => (
            <motion.div key={item.label} variants={fadeUp} transition={{ duration: 0.65, ease: LUXURY_EASE }}>
              <ComparisonSlider item={item} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
