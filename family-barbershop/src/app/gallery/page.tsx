import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHero } from "@/components/gallery/GalleryHero";

export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
    </>
  );
}
