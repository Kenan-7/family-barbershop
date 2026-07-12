import type { Product } from "@/content/business";

export function dedupeBadges(badges: string[]): string[] {
  return badges.reduce<string[]>((result, badge) => {
    const normalizedBadge = badge.trim();

    if (!normalizedBadge) {
      return result;
    }

    const exists = result.some(
      (existingBadge) =>
        existingBadge.toLowerCase() === normalizedBadge.toLowerCase(),
    );

    if (!exists) {
      result.push(normalizedBadge);
    }

    return result;
  }, []);
}

export function productBadges(product: Product): string[] {
  const raw: string[] = [];

  if (product.trustLabel) raw.push(product.trustLabel);
  if (product.badge) raw.push(product.badge);
  if (product.finish) raw.push(`${product.finish} Finish`);
  if (product.hold && product.hold !== "—") raw.push(`${product.hold} Hold`);

  return dedupeBadges(raw).slice(0, 4);
}
