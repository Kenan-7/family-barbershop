"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contactPage } from "@/content/contact";
import { Container } from "@/components/site/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactHoursPanel } from "@/components/contact/ContactHoursPanel";
import { ContactMapCard } from "@/components/contact/ContactMapCard";
import { ContactQuickActions } from "@/components/contact/ContactQuickActions";
import { ContactSocialLinks } from "@/components/contact/ContactSocialLinks";
import { LUXURY_EASE, staggerContainer, viewportReveal } from "@/lib/motion";

export function ContactPageView() {
  const reduceMotion = useReducedMotion();

  const revealProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <div className="contact-page overflow-x-hidden bg-[#050505] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <ContactHero />

      <section className="contact-main relative py-12 sm:py-16">
        <Container>
          <div className="contact-main-grid grid gap-7 lg:grid-cols-2 lg:items-start lg:gap-8 xl:gap-9">
            <motion.div
              className="order-1 flex flex-col gap-6 lg:order-1"
              {...revealProps}
              variants={staggerContainer(0.08, 0.04)}
            >
              <motion.div variants={viewportReveal} transition={{ duration: 0.6, ease: LUXURY_EASE }}>
                <ContactMapCard />
              </motion.div>
              <motion.div variants={viewportReveal} transition={{ duration: 0.6, ease: LUXURY_EASE }}>
                <ContactHoursPanel />
              </motion.div>
              <motion.div variants={viewportReveal} transition={{ duration: 0.6, ease: LUXURY_EASE }}>
                <ContactQuickActions />
              </motion.div>
              <motion.div variants={viewportReveal} transition={{ duration: 0.6, ease: LUXURY_EASE }}>
                <ContactSocialLinks />
              </motion.div>
            </motion.div>

            <motion.div
              id="form"
              className="order-2 lg:order-2"
              {...revealProps}
              variants={viewportReveal}
              transition={{ duration: 0.6, ease: LUXURY_EASE, delay: 0.06 }}
            >
              <div className="contact-glass-card contact-premium-card contact-form-card h-full rounded-[1.625rem] p-6 sm:p-8 lg:min-h-[42rem]">
                <div className="contact-card-highlight" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand/85">
                  Message us
                </p>
                <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                  {contactPage.form.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-white/58 sm:text-[0.9375rem]">
                  {contactPage.form.description}
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
