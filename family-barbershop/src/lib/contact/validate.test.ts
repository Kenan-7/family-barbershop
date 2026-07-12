import { describe, expect, it } from "vitest";
import { validateContactPayload } from "@/lib/contact/validate";

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

describe("validateContactPayload", () => {
  it("accepts valid payloads", () => {
    const result = validateContactPayload(validPayload);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("John Smith");
      expect(result.data.email).toBe("john@example.com");
    }
  });

  it("rejects honeypot submissions", () => {
    const result = validateContactPayload({ ...validPayload, website: "spam-bot" });
    expect(result.ok).toBe(false);
  });

  it("requires name, phone, email, and message", () => {
    const result = validateContactPayload({
      name: "J",
      phone: "123",
      email: "bad-email",
      message: "short",
      website: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.phone).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
    }
  });
});
