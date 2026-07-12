import { describe, expect, it } from "vitest";
import { getShopStatus, parseTimeToMinutes } from "@/lib/shopStatus";

describe("parseTimeToMinutes", () => {
  it("parses AM and PM times", () => {
    expect(parseTimeToMinutes("9:00 AM")).toBe(9 * 60);
    expect(parseTimeToMinutes("12:00 PM")).toBe(12 * 60);
    expect(parseTimeToMinutes("6:00 PM")).toBe(18 * 60);
  });
});

describe("getShopStatus", () => {
  it("reports open during weekday business hours", () => {
    const wednesdayOpen = new Date("2026-07-08T14:00:00");
    const status = getShopStatus(wednesdayOpen);
    expect(status.isOpen).toBe(true);
    expect(status.todayLabel).toBe("Wed");
  });

  it("reports closed before opening", () => {
    const early = new Date("2026-07-08T07:30:00");
    const status = getShopStatus(early);
    expect(status.isOpen).toBe(false);
    expect(status.statusDetail.toLowerCase()).toContain("opens");
  });

  it("reports closed after hours", () => {
    const late = new Date("2026-07-08T20:30:00");
    const status = getShopStatus(late);
    expect(status.isOpen).toBe(false);
  });
});
