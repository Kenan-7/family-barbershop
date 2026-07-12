"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/content/business";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

function FeaturedServiceCard({ service, index }: { service: Service; index: number }) {
  const bookingHref = business.links.bookingUrl || "/contact";
  const imageSrc = service.imageSrc ?? "/gallery/_DSC6268.jpg";

  return (
    <motion.article
      className="services-featured-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0c0c0c]"
      variants={fadeUp}
      transition={{ duration: 0.65, ease: LUXURY_EASE, delay: index * 0.05 }}
    >
      <span className="services-featured-glow pointer-events-none absolute -inset-2 rounded-[1.65rem] opacity-0" aria-hidden="true" />

      <div className="relative h-52 overflow-hidden sm:h-56 lg:h-64">
        <Image
          src={imageSrc}
          alt={service.imageAlt ?? service.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="services-featured-image object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-[#D4AF37]/30 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37] backdrop-blur-md">
          Most Booked
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{service.name}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/52">{service.description}</p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/[0.06] pt-5">
          {service.duration ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-white/42">
              <Clock className="h-3.5 w-3.5 text-[#D4AF37]/70" aria-hidden="true" />
              {service.duration}
            </span>
          ) : (
            <span />
          )}
          <span className="text-2xl font-semibold text-[#D4AF37]">{service.price}</span>
        </div>

        <Link
          href={bookingHref}
          target="_blank"
          rel="noopener noreferrer"
          className="services-featured-cta mt-5 inline-flex h-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-sm font-semibold text-[#D4AF37] transition duration-300 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/18 hover:text-white"
        >
          Book Service
        </Link>
      </div>
    </motion.article>
  );
}

export function ServicesMostBooked() {
  const { mostBookedTitle, mostBookedSlugs } = business.servicesPage;
  const reduceMotion = useReducedMotion();

  const featured: Service[] = mostBookedSlugs.flatMap((name) => {
    const service = business.services.find((s) => s.name === name);
    return service ? [service] : [];
  });

  return (
    <section
      aria-labelledby="services-most-booked-heading"
      className="relative border-b border-white/[0.06] bg-[#080808] py-24 sm:py-28"
    >
      <Container>
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
        >
          <h2
            id="services-most-booked-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {mostBookedTitle}
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer(0.12, 0.1)}
        >
          {featured.map((service, index) => (
            <FeaturedServiceCard key={service.name} service={service} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
