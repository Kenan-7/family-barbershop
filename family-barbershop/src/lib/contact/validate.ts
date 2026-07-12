import { sanitizeUserMessage } from "@/lib/chatbot/sanitize";
import type { ContactFormPayload } from "@/lib/contact/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s().+-]{7,20}$/;

function cleanField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return sanitizeUserMessage(value, maxLength) ?? "";
}

export type ContactValidationResult =
  | { ok: true; data: ContactFormPayload }
  | { ok: false; errors: Record<string, string> };

export function validateContactPayload(body: unknown): ContactValidationResult {
  const raw = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const errors: Record<string, string> = {};

  const website = cleanField(raw.website, 120);
  if (website) {
    return {
      ok: false,
      errors: { form: "Unable to submit right now. Please call the shop directly." },
    };
  }

  const name = cleanField(raw.name, 80);
  const phone = cleanField(raw.phone, 24);
  const email = cleanField(raw.email, 120);
  const service = cleanField(raw.service, 80);
  const preferredDay = cleanField(raw.preferredDay, 40);
  const preferredTime = cleanField(raw.preferredTime, 40);
  const message = cleanField(raw.message, 2000);

  if (!name || name.length < 2) errors.name = "Please enter your full name.";
  if (!phone || !PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!message || message.length < 10) errors.message = "Please include a brief message (at least 10 characters).";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      service,
      preferredDay,
      preferredTime,
      message,
    },
  };
}
