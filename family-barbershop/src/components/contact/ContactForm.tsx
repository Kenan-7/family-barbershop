"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <div className="text-sm font-medium text-white/80">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Field label="Full name">
        <input name="name" required className={inputBase} placeholder="Your name" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone">
          <input name="phone" className={inputBase} placeholder="(000) 000-0000" />
        </Field>
        <Field label="Email">
          <input type="email" name="email" required className={inputBase} placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="Service (optional)">
        <input name="service" className={inputBase} placeholder="Haircut, skin fade, beard trim…" />
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          required
          rows={5}
          className={cn(inputBase, "resize-y")}
          placeholder="Tell us what you’re looking for, preferred day/time, and any notes."
        />
      </Field>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-black transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        Send message
      </button>

      <p className="text-xs text-white/50">
        This form is a placeholder. Connect it to your preferred form provider (or email service) when you’re ready.
      </p>

      {sent ? (
        <div className="rounded-2xl border border-brand/25 bg-brand/10 p-4 text-sm text-brand-2">
          Message captured. Hook this form up to email or booking to go live.
        </div>
      ) : null}
    </form>
  );
}

