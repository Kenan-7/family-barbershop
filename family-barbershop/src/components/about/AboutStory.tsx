"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { useDisableDecorativeMotion } from "@/lib/mobilePerformance";

export function AboutStory() {
  const { aboutStory } = business;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const disableParallax = useDisableDecorativeMotion() || reduceMotion;

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [1, 1] : [1.04, 1],
  );

  return (
    <section
      id="our-story"
      ref={sectionRef}
      aria-labelledby="about-story-heading"
      className="about-section relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.05)}
          >
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/75"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              {aboutStory.eyebrow}
            </motion.p>

            <motion.h2
              id="about-story-heading"
              className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.25rem]"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
            >
              {aboutStory.headline}
              <span className="mt-1 block text-white/88">{aboutStory.headlineAccent}</span>
            </motion.h2>

            <div className="mt-8 space-y-5">
              {aboutStory.paragraphs.map((paragraph) => (
                <motion.p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-[1.8] text-white/58 sm:text-[1.05rem]"
                  variants={fadeUp}
                  transition={{ duration: 0.65, ease: LUXURY_EASE }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/[0.08] sm:aspect-[5/6]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: LUXURY_EASE }}
            >
              <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
                <Image
                  src={aboutStory.imageSrc}
                  alt={aboutStory.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-center"
                />
              </motion.div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              className="about-story-panel rounded-[1.35rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer(0.06, 0.1)}
            >
              <ul className="grid gap-3 sm:grid-cols-2">
                {aboutStory.highlights.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-white/75"
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: LUXURY_EASE }}
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10">
                      <Check className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
