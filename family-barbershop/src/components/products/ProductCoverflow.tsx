"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
} from "framer-motion";
import type { Product } from "@/content/business";
import { business } from "@/content/business";
import { productBadges } from "@/lib/products/badges";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const VISIBLE_RANGE = 2;
const SPRING: Transition = {
  type: "spring",
  stiffness: 95,
  damping: 22,
  mass: 0.85,
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function relativeOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function slideMotion(offset: number) {
  const abs = Math.abs(offset);
  if (abs === 0) {
    return {
      x: 0,
      z: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      filter: "blur(0px)",
    };
  }
  if (abs === 1) {
    return {
      x: offset * 168,
      z: -110,
      scale: 0.7,
      rotateY: offset * -35,
      opacity: 0.72,
      filter: "blur(3px)",
    };
  }
  return {
    x: offset * 210,
    z: -200,
    scale: 0.45,
    rotateY: offset * -42,
    opacity: 0.28,
    filter: "blur(11px)",
  };
}

function CoverflowSlide({
  product,
  offset,
  isCenter,
  onSelect,
  mouseRotateY,
  mouseRotateX,
}: {
  product: Product;
  offset: number;
  isCenter: boolean;
  onSelect: () => void;
  mouseRotateY: ReturnType<typeof useSpring>;
  mouseRotateX: ReturnType<typeof useSpring>;
}) {
  const reduceMotion = useReducedMotion();
  const absOffset = Math.abs(offset);
  const zIndex = 30 - absOffset;
  const target = slideMotion(offset);
  const usesTransparent = product.transparentImage !== false;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        "product-coverflow-slide absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2",
        isCenter ? "product-coverflow-slide--center" : "product-coverflow-slide--side",
      )}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        rotateY: isCenter ? mouseRotateY : undefined,
        rotateX: isCenter ? mouseRotateX : undefined,
      }}
      animate={{
        x: target.x,
        z: target.z,
        scale: target.scale,
        rotateY: isCenter ? undefined : target.rotateY,
        opacity: target.opacity,
        filter: target.filter,
        y: isCenter && !reduceMotion ? [0, -8, 0] : 0,
      }}
      transition={
        isCenter && !reduceMotion
          ? {
              x: SPRING,
              z: SPRING,
              scale: SPRING,
              opacity: SPRING,
              filter: SPRING,
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }
          : SPRING
      }
      aria-label={product.name}
      aria-current={isCenter ? "true" : undefined}
    >
      <div
        className={cn(
          "product-coverflow-stage relative flex items-end justify-center",
          isCenter
            ? "h-52 w-44 sm:h-60 sm:w-52 lg:h-[17rem] lg:w-60"
            : "h-40 w-32 sm:h-44 sm:w-36",
        )}
      >
        {isCenter ? (
          <>
            <span className="product-coverflow-ambient-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
            <span className="product-coverflow-floor-shadow pointer-events-none absolute bottom-0 left-1/2 h-4 w-[78%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-2xl" aria-hidden="true" />
            <span className="product-coverflow-reflection pointer-events-none absolute bottom-0 left-1/2 h-16 w-[65%] -translate-x-1/2" aria-hidden="true" />
          </>
        ) : null}

        <Image
          src={product.imageSrc}
          alt={isCenter ? (product.imageAlt ?? product.name) : ""}
          width={300}
          height={300}
          loading={isCenter ? "eager" : "lazy"}
          priority={isCenter}
          className={cn(
            "product-coverflow-image relative z-10 h-auto max-h-full w-auto max-w-full object-contain object-bottom",
            usesTransparent && isCenter && "product-coverflow-image--lit",
            !isCenter && "brightness-[0.72]",
          )}
          draggable={false}
        />
      </div>
    </motion.button>
  );
}

function AnimatedPrice({ price }: { price: string }) {
  return (
    <motion.span
      key={price}
      className="text-2xl font-semibold tracking-tight text-[#D4AF37] sm:text-[1.65rem]"
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: LUXURY_EASE }}
    >
      {price}
    </motion.span>
  );
}

export function ProductCoverflow() {
  const products = business.products;
  const total = products.length;
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springRotateY = useSpring(mouseX, { stiffness: 140, damping: 24 });
  const springRotateX = useSpring(mouseY, { stiffness: 140, damping: 24 });

  const activeProduct = products[activeIndex];

  const goTo = useCallback(
    (index: number) => setActiveIndex(mod(index, total)),
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px * 10);
    mouseY.set(-py * 6);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      if (event.deltaY > 0) goNext();
      else goPrev();
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  const badges = productBadges(activeProduct);

  return (
    <div className="product-coverflow relative">
      <div
        ref={containerRef}
        className="product-coverflow-scene relative mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="product-coverflow-scene-glow pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(230,160,80,0.14) 35%, rgba(180,120,50,0.08) 55%, transparent 72%)`,
          }}
          aria-hidden="true"
        />

        <div
          className="product-coverflow-track relative mx-auto h-[15.5rem] max-w-full sm:h-[17.5rem] lg:h-[19.5rem]"
          style={{ perspective: 1600, transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="relative h-full w-full"
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            style={{ x: dragX, transformStyle: "preserve-3d" }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -55 || info.velocity.x < -380) goNext();
              else if (info.offset.x > 55 || info.velocity.x > 380) goPrev();
            }}
          >
            {products.map((product, index) => {
              const offset = relativeOffset(index, activeIndex, total);
              if (Math.abs(offset) > VISIBLE_RANGE) return null;
              return (
                <CoverflowSlide
                  key={product.name}
                  product={product}
                  offset={offset}
                  isCenter={offset === 0}
                  onSelect={() => goTo(index)}
                  mouseRotateY={springRotateY}
                  mouseRotateX={springRotateX}
                />
              );
            })}
          </motion.div>

          <button
            type="button"
            onClick={goPrev}
            className="product-coverflow-nav product-coverflow-nav--prev"
            aria-label="Previous product"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="product-coverflow-nav product-coverflow-nav--next"
            aria-label="Next product"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="product-coverflow-thumbs mt-6 flex items-center justify-center gap-2.5">
          {products.map((product, index) => (
            <button
              key={product.name}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "product-coverflow-thumb overflow-hidden rounded-lg border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                index === activeIndex
                  ? "product-coverflow-thumb--active h-14 w-14 border-[#D4AF37]/45 opacity-100"
                  : "h-10 w-10 border-white/10 opacity-45 hover:opacity-70",
              )}
              aria-label={`View ${product.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <Image
                src={product.imageSrc}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-contain object-center p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.name}
          className="product-coverflow-info mt-8 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: LUXURY_EASE }}
        >
          <motion.p
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]/80"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE, delay: 0.05 }}
          >
            {activeProduct.category}
          </motion.p>

          <motion.h3
            className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE, delay: 0.08 }}
          >
            {activeProduct.name}
          </motion.h3>

          <motion.p
            className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-white/52 sm:text-[0.9375rem]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE, delay: 0.12 }}
          >
            {activeProduct.description}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            {badges.map((badge, index) => (
              <span
                key={`${activeProduct.name}-${badge}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <div className="mt-5 flex justify-center">
            <AnimatedPrice price={activeProduct.price} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
