import { describe, expect, it } from "vitest";
import { business } from "@/content/business";
import { dedupeBadges, productBadges } from "@/lib/products/badges";

describe("dedupeBadges", () => {
  it("removes case-insensitive duplicates while preserving order", () => {
    expect(dedupeBadges(["Matte Finish", " matte finish ", "Strong Hold"])).toEqual([
      "Matte Finish",
      "Strong Hold",
    ]);
  });

  it("trims whitespace before comparing values", () => {
    expect(dedupeBadges(["  Barber Recommended  ", "Barber Recommended"])).toEqual([
      "Barber Recommended",
    ]);
  });
});

describe("productBadges", () => {
  it("deduplicates merged badge and finish labels for matte Layrite products", () => {
    const cementClay = business.products.find((product) => product.name === "Layrite Cement Clay");
    const naturalMatte = business.products.find(
      (product) => product.name === "Layrite Natural Matte Pomade",
    );
    const superShine = business.products.find(
      (product) => product.name === "Layrite Super Shine Cream",
    );

    expect(cementClay).toBeDefined();
    expect(naturalMatte).toBeDefined();
    expect(superShine).toBeDefined();

    for (const product of [cementClay!, naturalMatte!]) {
      const badges = productBadges(product);
      const matteFinishCount = badges.filter(
        (badge) => badge.toLowerCase() === "matte finish",
      ).length;
      expect(matteFinishCount).toBe(1);
      expect(new Set(badges.map((badge) => badge.toLowerCase())).size).toBe(badges.length);
    }

    const shineBadges = productBadges(superShine!);
    const shineFinishCount = shineBadges.filter(
      (badge) => badge.toLowerCase() === "shine finish",
    ).length;
    expect(shineFinishCount).toBe(1);
  });

  it("produces stable unique keys for every rendered badge", () => {
    for (const product of business.products) {
      const badges = productBadges(product);
      const keys = badges.map((badge, index) => `${product.name}-${badge}-${index}`);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});
