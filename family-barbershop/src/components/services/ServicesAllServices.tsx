"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service, ServiceCategory } from "@/content/business";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

function ServiceListCard({ service }: { service: Service }) {
  const bookingHref = business.links.bookingUrl || "/contact";
  const imageSrc = service.imageSrc ?? "/gallery/_DSC6268.jpg";

  return (
    <motion.article
      className="services-list-card group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.07] bg-[#0a0a0a] sm:flex-row"
      variants={fadeUp}
      transition={{ duration: 0.6, ease: LUXURY_EASE }}
    >
      <span className="services-list-glow pointer-events-none absolute -inset-1 rounded-[1.35rem] opacity-0" aria-hidden="true" />

      <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-44 lg:w-52">
        <Image
          src={imageSrc}
          alt={service.imageAlt ?? service.name}
          fill
          sizes="208px"
          className="object-cover transition duration-600 group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-black/30 sm:bg-gradient-to-t sm:from-black/50" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center p-5 sm:p-6">
        <h4 className="text-lg font-semibold text-white">{service.name}</h4>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/50">{service.description}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {service.duration ? (
              <span className="inline-flex items-center gap-1 text-xs text-white/40">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {service.duration}
              </span>
            ) : null}
            <span className="text-lg font-semibold text-[#D4AF37]">{service.price}</span>
          </div>
          <Link
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white/70 transition hover:text-[#D4AF37]"
          >
            Book →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function CategoryBlock({ category, services }: { category: ServiceCategory; services: Service[] }) {
  const reduceMotion = useReducedMotion();

  if (services.length === 0) return null;

  return (
    <div className="mt-12 first:mt-0">
      <motion.h3
        className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: LUXURY_EASE }}
      >
        {category}
      </motion.h3>

      <motion.div
        className="mt-5 grid gap-4"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.08, 0.05)}
      >
        {services.map((service) => (
          <ServiceListCard key={service.name} service={service} />
        ))}
      </motion.div>
    </div>
  );
}

export function ServicesAllServices() {
  const { allServicesTitle, allServicesDescription, categories } = business.servicesPage;
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-all-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28"
    >
      <Container>
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.08)}
        >
          <motion.h2
            id="services-all-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {allServicesTitle}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/52"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {allServicesDescription}
          </motion.p>
        </motion.div>

        <div className="mt-10">
          {categories.map((category) => {
            const items = business.services.filter((s) => s.category === category);
            return <CategoryBlock key={category} category={category} services={items} />;
          })}
        </div>
      </Container>
    </section>
  );
}
