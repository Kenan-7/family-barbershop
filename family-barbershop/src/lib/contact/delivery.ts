import { business } from "@/content/business";

export type ContactDeliveryPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
};

export function isContactDeliveryConfigured(): boolean {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = (process.env.CONTACT_TO_EMAIL || business.email).trim();

  return Boolean(webhookUrl || (resendKey && toEmail));
}

export async function deliverContactMessage(
  payload: ContactDeliveryPayload,
): Promise<{ delivered: boolean }> {
  if (!isContactDeliveryConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] no delivery provider configured", payload);
    }
    return { delivered: false };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "family-barbershop-contact",
        business: business.name,
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(12000),
    });
    return { delivered: response.ok };
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = (process.env.CONTACT_TO_EMAIL || business.email).trim();

  if (resendKey && toEmail) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
        to: [toEmail],
        subject: `New contact request — ${payload.name}`,
        text: [
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          `Email: ${payload.email}`,
          `Service: ${payload.service || "Not specified"}`,
          `Preferred day: ${payload.preferredDay || "Not specified"}`,
          `Preferred time: ${payload.preferredTime || "Not specified"}`,
          "",
          payload.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(12000),
    });
    return { delivered: response.ok };
  }

  return { delivered: false };
}
