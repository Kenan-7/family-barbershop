import { business } from "@/content/business";

export const GALLERY_CATEGORIES = [
  "All",
  "Haircuts",
  "Beard",
  "Before & After",
  "Shop",
  "Family",
] as const;

export type GalleryFilterCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryCategory = Exclude<GalleryFilterCategory, "All">;

export type GalleryCtaLabel =
  | "View Photo"
  | "Explore"
  | "Watch Now"
  | "View Transformation";

export type GalleryGridPlacement = {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan?: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  image: string;
  altText: string;
  aspectRatio?: string;
  gridPlacement?: GalleryGridPlacement;
  objectPosition?: string;
  featured?: boolean;
  ctaLabel?: GalleryCtaLabel;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export type GalleryFeaturedVideo = {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
  externalUrl?: string;
  category: "Shop";
  gridPlacement: GalleryGridPlacement;
};

export const galleryPageHero = {
  eyebrow: "GALLERY",
  headline: "Craft, atmosphere, and experience.",
  description:
    "A closer look at the precision, people, and welcoming atmosphere behind Family Barber Shop.",
  backgroundWord: "THE EXPERIENCE",
  primaryCtaLabel: "Book Appointment",
  secondaryCtaLabel: "View Services",
} as const;

export const GALLERY_CINEMATIC_ID = "shop-atmosphere";

export const galleryFeaturedVideo: GalleryFeaturedVideo = {
  id: "featured-video",
  title: business.galleryContent.featuredVideo.title,
  description: business.galleryContent.featuredVideo.description,
  videoSrc: business.galleryContent.featuredVideo.videoSrc,
  poster: business.galleryContent.featuredVideo.posterSrc,
  externalUrl: business.galleryContent.featuredVideo.externalUrl,
  category: "Shop",
  gridPlacement: { colStart: 1, colSpan: 6, rowStart: 1, rowSpan: 1 },
};

export const galleryItems: GalleryItem[] = [
  {
    id: "precision-haircut",
    title: "Precision Haircut",
    description: "Clean finishes and sharp detail in every pass.",
    category: "Haircuts",
    image: "/gallery/_DSC6236.jpg",
    altText: "Barber delivering a precision haircut at Family Barber Shop",
    objectPosition: "center 30%",
    aspectRatio: "16/10",
    gridPlacement: { colStart: 7, colSpan: 6, rowStart: 1, rowSpan: 1 },
    featured: true,
    ctaLabel: "View Photo",
  },
  {
    id: "skin-fade-transform",
    title: "Skin Fade Transformation",
    description: "Tight blends and sharp edges for a polished look.",
    category: "Before & After",
    image: "/gallery/IMG_0063.JPG",
    altText: "High skin fade with crisp blend and sharp line-up",
    beforeImage: "/gallery/skinfade.png",
    afterImage: "/gallery/IMG_0063.JPG",
    beforeAlt: "Client before skin fade transformation in barber chair",
    afterAlt: "After skin fade with crisp blend and sharp line-up",
    objectPosition: "center 25%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 6, colSpan: 7, rowStart: 2, rowSpan: 1 },
    ctaLabel: "View Transformation",
  },
  {
    id: "beard-trim",
    title: "Beard Trim",
    description: "Shape, line-up, and detail work with care.",
    category: "Beard",
    image: "/gallery/images.jpg",
    altText: "Professional beard trim with clipper and comb",
    objectPosition: "center 35%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 6, colSpan: 7, rowStart: 3, rowSpan: 1 },
    ctaLabel: "View Photo",
  },
  {
    id: "family-haircut",
    title: "Family Haircut",
    description: "Patient, friendly service for kids and parents alike.",
    category: "Family",
    image: "/gallery/IMG_0447.png",
    altText: "Kids haircut in a family-friendly barbershop",
    objectPosition: "center 20%",
    aspectRatio: "3/4",
    gridPlacement: { colStart: 1, colSpan: 5, rowStart: 2, rowSpan: 2 },
    featured: true,
    ctaLabel: "View Photo",
  },
  {
    id: "in-the-chair",
    title: "In the Chair",
    description: "Focused craftsmanship and calm, professional service.",
    category: "Haircuts",
    image: "/gallery/_DSC6648.jpg",
    altText: "In-shop grooming service moment at Family Barber Shop",
    objectPosition: "center 30%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 1, colSpan: 6, rowStart: 4, rowSpan: 1 },
    ctaLabel: "Explore",
  },
  {
    id: "welcome-in",
    title: "Welcome In",
    description: "The kind of service that keeps families coming back.",
    category: "Family",
    image: "/gallery/IMG_0122.JPG",
    altText: "Welcoming barbershop experience with a customer",
    objectPosition: "center 25%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 7, colSpan: 6, rowStart: 4, rowSpan: 1 },
    ctaLabel: "Explore",
  },
  {
    id: "shop-atmosphere",
    title: "Shop Atmosphere",
    description: "Modern stations, warm lighting, and a welcoming vibe.",
    category: "Shop",
    image: "/gallery/_DSC6268.jpg",
    altText: "Inside Family Barber Shop — chairs and stations",
    objectPosition: "center 40%",
    aspectRatio: "21/9",
    featured: true,
    ctaLabel: "Explore",
  },
  {
    id: "hot-towel-shave",
    title: "Hot Towel Shave",
    description: "A relaxing ritual with a smooth, classic finish.",
    category: "Beard",
    image: "/gallery/images-1.jpg",
    altText: "Hot towel treatment during a straight-razor shave",
    objectPosition: "center 30%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 1, colSpan: 4, rowStart: 1, rowSpan: 1 },
    ctaLabel: "Explore",
  },
  {
    id: "modern-interior",
    title: "Modern Interior",
    description: "Clean lines, premium comfort, and room for the whole family.",
    category: "Shop",
    image: "/gallery/_DSC6364.jpg",
    altText: "Wide view of the barbershop interior",
    objectPosition: "center 45%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 5, colSpan: 4, rowStart: 1, rowSpan: 1 },
    ctaLabel: "View Photo",
  },
  {
    id: "straight-razor-detail",
    title: "Straight-Razor Detail",
    description: "Classic technique with modern precision.",
    category: "Beard",
    image: "/gallery/_DSC6288.jpg",
    altText: "Hot towel shave detail at Family Barber Shop",
    objectPosition: "center 35%",
    aspectRatio: "4/3",
    gridPlacement: { colStart: 9, colSpan: 4, rowStart: 1, rowSpan: 1 },
    ctaLabel: "View Photo",
  },
];

export const EDITORIAL_UPPER_IDS = [
  "precision-haircut",
  "skin-fade-transform",
  "beard-trim",
  "family-haircut",
  "in-the-chair",
  "welcome-in",
] as const;

export const EDITORIAL_TAIL_IDS = [
  "hot-towel-shave",
  "modern-interior",
  "straight-razor-detail",
] as const;

export function getCinematicFeature(): GalleryItem {
  const item = galleryItems.find((entry) => entry.id === GALLERY_CINEMATIC_ID);
  if (!item) throw new Error("Cinematic gallery feature not found");
  return item;
}

export function getEditorialUpperItems(): GalleryItem[] {
  return EDITORIAL_UPPER_IDS.map((id) => galleryItems.find((item) => item.id === id)).filter(
    (item): item is GalleryItem => Boolean(item),
  );
}

export function getEditorialTailItems(): GalleryItem[] {
  return EDITORIAL_TAIL_IDS.map((id) => galleryItems.find((item) => item.id === id)).filter(
    (item): item is GalleryItem => Boolean(item),
  );
}

export function getGridItemsExcludingCinematic(items: GalleryItem[] = galleryItems): GalleryItem[] {
  return items.filter((item) => item.id !== GALLERY_CINEMATIC_ID);
}

/** Map legacy homepage gallery shape for backward compatibility */
export function toLegacyGalleryItem(item: GalleryItem) {
  return {
    src: item.image,
    alt: item.altText,
    title: item.title,
    description: item.description,
    category: item.category,
    size: item.featured ? ("large" as const) : ("medium" as const),
    ctaLabel: item.ctaLabel === "View Transformation" ? ("Explore" as const) : item.ctaLabel,
  };
}
