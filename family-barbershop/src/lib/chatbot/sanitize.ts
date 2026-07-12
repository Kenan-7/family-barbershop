const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizeUserMessage(input: unknown, maxLength: number): string | null {
  if (typeof input !== "string") return null;

  const cleaned = input
    .replace(CONTROL_CHARS, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned || cleaned.length > maxLength) return null;
  return cleaned;
}

export function sanitizeHistory(
  messages: unknown,
  maxItems: number,
): Array<{ role: "user" | "assistant"; content: string }> | null {
  if (!Array.isArray(messages)) return null;

  const sanitized = messages
    .slice(-maxItems)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = (item as { role?: unknown }).role;
      const content = sanitizeUserMessage((item as { content?: unknown }).content, 2000);
      if ((role !== "user" && role !== "assistant") || !content) return null;
      return { role, content };
    })
    .filter((item): item is { role: "user" | "assistant"; content: string } => item !== null);

  return sanitized.length ? sanitized : null;
}
