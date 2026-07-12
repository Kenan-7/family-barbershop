"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import type { TeamMember } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";

const SPECIALTY_ICONS: Record<string, string> = {
  "Skin Fades": "✂",
  "Beard Sculpting": "🧔",
  "Classic Cuts": "✂",
  Tapers: "✂",
  "Kids Cuts": "✂",
  "Hot Towel Shaves": "🪒",
  "Line-Ups": "✂",
  "Beard Trims": "🧔",
  "Modern Styles": "🔥",
};

function memberFirstName(name: string) {
  return name.replace(/\s+[A-Z]\.$/, "").trim();
}

function TeamCard({
  member,
  index,
  bookingHref,
  reduceMotion,
}: {
  member: TeamMember;
  index: number;
  bookingHref: string;
  reduceMotion: boolean | null;
}) {
  const firstName = memberFirstName(member.name);

  return (
    <motion.article
      className="about-team-card group h-full"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: LUXURY_EASE,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
    >
      <span className="about-team-card-glow" aria-hidden="true" />

      <div className="about-team-card-surface">
        <div className="about-team-portrait">
          <Image
            src={member.imageSrc}
            alt={member.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="about-team-image"
          />
          <span className="about-team-vignette" aria-hidden="true" />
          <span className="about-team-photo-fade" aria-hidden="true" />
        </div>

        <div className="about-team-body">
          <h3 className="about-team-name">{member.name}</h3>
          <p className="about-team-role">{member.position}</p>

          {member.yearsExperience ? (
            <p className="about-team-experience">
              <Star className="about-team-experience-icon h-3.5 w-3.5 shrink-0 fill-brand/80 text-brand" aria-hidden="true" />
              <span>{member.yearsExperience} Experience</span>
            </p>
          ) : null}

          <ul className="about-team-tags" aria-label={`${member.name} specialties`}>
            {member.specialties.map((specialty) => (
              <li key={specialty}>
                <span className="about-team-tag">
                  {SPECIALTY_ICONS[specialty] ? (
                    <span className="about-team-tag-icon" aria-hidden="true">
                      {SPECIALTY_ICONS[specialty]}
                    </span>
                  ) : null}
                  {specialty}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={bookingHref}
            className="about-team-book group/book focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            aria-label={`Book an appointment with ${member.name}`}
          >
            Book with {firstName}
            <ArrowRight className="about-team-book-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function AboutTeam() {
  const { aboutTeam, googleReviews } = business;
  const reduceMotion = useReducedMotion();
  const bookingHref = business.links.bookingUrl || "/contact#form";

  return (
    <section
      id="meet-the-team"
      aria-labelledby="about-team-heading"
      className="about-section about-team-section relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.08)}
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/75"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
          >
            Meet Our Team
          </motion.p>
          <motion.h2
            id="about-team-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            The Professionals Behind
            <span className="mt-1 block text-white/78">Every Great Cut.</span>
          </motion.h2>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/54 sm:text-[1.05rem]"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            Experienced barbers dedicated to precision, consistency, and exceptional customer
            care.
          </motion.p>
        </motion.div>

        <div className="about-team-grid mt-14 lg:mt-16">
          {aboutTeam.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              bookingHref={bookingHref}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.p
          className="about-team-social-proof mt-12 text-center text-sm text-white/42"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: LUXURY_EASE, delay: 0.24 }}
        >
          <span className="about-team-stars text-brand/75" aria-hidden="true">
            ★★★★★
          </span>
          <span className="mx-2 text-white/25" aria-hidden="true">
            ·
          </span>
          {googleReviews.aggregateRating.toFixed(1)} Google Rated · Trusted by hundreds of local
          customers
        </motion.p>
      </Container>
    </section>
  );
}
