import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverContactMessage, isContactDeliveryConfigured } from "@/lib/contact/delivery";

const payload = {
  name: "John Smith",
  phone: "(770) 555-1234",
  email: "john@example.com",
  service: "Haircut",
  preferredDay: "flexible",
  preferredTime: "morning",
  message: "I would like to book an appointment this week.",
};

describe("contact delivery configuration", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it("reports missing delivery configuration when no provider is set", () => {
    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;

    expect(isContactDeliveryConfigured()).toBe(false);
  });

  it("does not report success when delivery is not configured", async () => {
    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;

    await expect(deliverContactMessage(payload)).resolves.toEqual({ delivered: false });
  });

  it("uses webhook delivery when CONTACT_WEBHOOK_URL is configured", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://example.com/webhook";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(deliverContactMessage(payload)).resolves.toEqual({ delivered: true });
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
