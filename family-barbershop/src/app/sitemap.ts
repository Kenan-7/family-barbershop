import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { navItems } from "@/components/site/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return navItems.map((i) => ({
    url: new URL(i.href, business.siteUrl).toString(),
    lastModified: now,
  }));
}

