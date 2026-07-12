"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { LUXURY_EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="services-faq-item border-b border-white/[0.06]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-white sm:text-lg">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#D4AF37]/70 transition duration-300",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/52 sm:text-base">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ServicesFaq() {
  const { faqTitle, faq } = business.servicesPage;
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="services-faq-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-24 sm:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <motion.h2
            id="services-faq-heading"
            className="text-center text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            {faqTitle}
          </motion.h2>

          <motion.div
            className="mt-12 rounded-[1.35rem] border border-white/[0.08] bg-[#0a0a0a] px-6 sm:px-8"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.08, 0.15)}
          >
            {faq.map((item, index) => (
              <motion.div key={item.question} variants={fadeUp} transition={{ duration: 0.5, ease: LUXURY_EASE }}>
                <FaqItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
