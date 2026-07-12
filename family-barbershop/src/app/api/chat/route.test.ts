import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/chat/route";

describe("POST /api/chat", () => {
  it("falls back when OPENAI_API_KEY is missing", async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "What are your hours?" }],
        }),
      }),
    );

    if (originalKey) process.env.OPENAI_API_KEY = originalKey;

    expect(response.status).toBe(200);
    const body = (await response.json()) as { message: string; source?: string };
    expect(body.message.length).toBeGreaterThan(0);
    expect(body.source).toBe("fallback");
  });
});
