import { describe, expect, it } from "vitest";
import { navItems } from "@/components/site/nav";

describe("navItems", () => {
  it("includes all primary routes with unique hrefs", () => {
    const hrefs = navItems.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/contact");
  });

  it("uses readable labels for every link", () => {
    for (const item of navItems) {
      expect(item.label.trim().length).toBeGreaterThan(0);
      expect(item.href.startsWith("/")).toBe(true);
    }
  });
});
