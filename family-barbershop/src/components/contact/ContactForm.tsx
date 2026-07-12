"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import {
  contactPage,
  getServiceOptions,
  preferredDayOptions,
  preferredTimeOptions,
} from "@/content/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { ContactApiResponse } from "@/lib/contact/types";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferredDay: "",
  preferredTime: "",
  message: "",
  website: "",
};

function Field({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("contact-field-group block", className)}>
      <label className="contact-field-label text-sm font-medium text-white/78 transition-colors duration-[220ms]">
        {label}
        {required ? <span className="text-brand"> *</span> : <span className="text-white/35"> (optional)</span>}
      </label>
      <div className="mt-2.5">{children}</div>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            className="mt-2 flex items-center gap-1.5 text-xs text-rose-300/95"
            role="alert"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: LUXURY_EASE }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  "contact-field h-[52px] w-full rounded-[13px] border border-white/[0.12] bg-[rgba(5,5,5,0.65)] px-4 text-sm text-white placeholder:text-white/35 transition-[border-color,box-shadow,background-color] duration-[220ms] focus-visible:outline-none sm:h-14";

const selectBase = cn(inputBase, "contact-select appearance-none pr-10");

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const serviceOptions = useMemo(() => getServiceOptions(), []);
  const bookingHref = business.links.bookingUrl || "/contact#form";

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validateClient() {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = "Please include a brief message (at least 10 characters).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    if (!validateClient()) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setStatusMessage(payload.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setStatusMessage(payload.message);
      setForm(initialState);
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again or call the shop directly.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="contact-success-panel rounded-[1.25rem] border border-emerald-500/25 bg-emerald-500/[0.08] p-6 sm:p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300/90" aria-hidden="true" />
          <div>
            <p className="text-lg font-semibold text-white">{contactPage.form.successTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/68">
              {contactPage.form.successDescription(business.phone)}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.phoneHref} variant="secondary" size="md" className="flex-1">
            {contactPage.form.callAction}
          </ButtonLink>
          <ButtonLink
            href={bookingHref}
            target={business.links.bookingUrl ? "_blank" : undefined}
            variant="primary"
            size="md"
            className="flex-1 text-white hover:text-white"
          >
            {contactPage.form.bookAction}
          </ButtonLink>
        </div>
      </motion.div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <Field label="Full Name" required error={errors.name}>
        <input
          name="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={cn(inputBase, errors.name && "border-rose-400/40")}
          autoComplete="name"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" required error={errors.phone}>
          <input
            name="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={cn(inputBase, errors.phone && "border-rose-400/40")}
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={cn(inputBase, errors.email && "border-rose-400/40")}
            autoComplete="email"
          />
        </Field>
      </div>

      <Field label="Service">
        <div className="contact-select-wrap">
          <select
            name="service"
            value={form.service}
            onChange={(event) => updateField("service", event.target.value)}
            className={selectBase}
          >
            {serviceOptions.map((option) => (
              <option key={option.value || "default"} value={option.value} className="bg-[#111]">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred Day">
          <div className="contact-select-wrap">
            <select
              name="preferredDay"
              value={form.preferredDay}
              onChange={(event) => updateField("preferredDay", event.target.value)}
              className={selectBase}
            >
              {preferredDayOptions.map((option) => (
                <option key={option.value || "default"} value={option.value} className="bg-[#111]">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="Preferred Time">
          <div className="contact-select-wrap">
            <select
              name="preferredTime"
              value={form.preferredTime}
              onChange={(event) => updateField("preferredTime", event.target.value)}
              className={selectBase}
            >
              {preferredTimeOptions.map((option) => (
                <option key={option.value || "default"} value={option.value} className="bg-[#111]">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Field>
      </div>

      <Field label="Message" required error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className={cn(
            inputBase,
            "contact-textarea min-h-[140px] resize-y py-3.5 leading-relaxed sm:h-auto",
            errors.message && "border-rose-400/40",
          )}
        />
      </Field>

      <AnimatePresence mode="wait">
        {status === "error" && statusMessage ? (
          <motion.div
            key="form-error"
            className="flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100/90"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: LUXURY_EASE }}
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {statusMessage}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="contact-submit-button inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a87428] via-[#d4b066] to-[#edd9a8] px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_8px_24px_rgba(197,157,95,0.22)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            {contactPage.form.submitLabel}
            <Send className="contact-submit-icon h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
