import { describe, expect, it } from "vitest";
import { business } from "@/content/business";
import { galleryFeaturedVideo } from "@/content/gallery";

describe("gallery featured video", () => {
  it("opens the configured Instagram reel externally", () => {
    expect(galleryFeaturedVideo.externalUrl).toBe(
      business.galleryContent.featuredVideo.externalUrl,
    );
    expect(galleryFeaturedVideo.externalUrl).toContain("instagram.com/reel/DJAGBVmSSHE");
  });
});

describe("footer booking QR", () => {
  it("links to the centralized Square booking destination", () => {
    expect(business.footer.bookingQr.src).toBe("/gallery/booking-qr.png");
    expect(business.footer.bookingQr.alt).toMatch(/book your Family Barber Shop appointment/i);
    expect(business.links.bookingUrl).toContain("book.squareup.com");
  });
});

describe("business geo", () => {
  it("uses verified Roswell coordinates from the Google listing", () => {
    expect(business.geo.latitude).toBeCloseTo(34.0662981, 5);
    expect(business.geo.longitude).toBeCloseTo(-84.4233375, 5);
  });
});
