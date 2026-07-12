import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

const validPayload = {
  name: "John Smith",
  phone: "(770) 555-1234",
  email: "john@example.com",
  service: "Haircut",
  preferredDay: "flexible",
  preferredTime: "morning",
  message: "I would like to book an appointment this week.",
  website: "",
};

describe("POST /api/contact", () => {
  it("rejects invalid payloads with 400", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validPayload, email: "invalid-email" }),
      }),
    );

    expect(response.status).toBe(400);
    const body = (await response.json()) as { ok: boolean; message: string };
    expect(body.ok).toBe(false);
    expect(body.message.length).toBeGreaterThan(0);
  });

  it("returns 503 when delivery is not configured", async () => {
    const originalWebhook = process.env.CONTACT_WEBHOOK_URL;
    const originalResend = process.env.RESEND_API_KEY;
    const originalTo = process.env.CONTACT_TO_EMAIL;

    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      }),
    );

    if (originalWebhook) process.env.CONTACT_WEBHOOK_URL = originalWebhook;
    if (originalResend) process.env.RESEND_API_KEY = originalResend;
    if (originalTo) process.env.CONTACT_TO_EMAIL = originalTo;

    expect(response.status).toBe(503);
    const body = (await response.json()) as { ok: boolean; message: string };
    expect(body.ok).toBe(false);
    expect(body.message).toMatch(/couldn't send/i);
  });
});
