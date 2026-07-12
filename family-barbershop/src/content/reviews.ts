import { business } from "@/content/business";

export const REVIEW_FILTER_CATEGORIES = [
  "All Reviews",
  "Haircuts",
  "Kids",
  "Beard",
  "Skin Fade",
  "Hot Towel",
] as const;

export type ReviewFilterCategory = (typeof REVIEW_FILTER_CATEGORIES)[number];

export type ReviewCategory = Exclude<ReviewFilterCategory, "All Reviews">;

export type ReviewLayout = "quote" | "compact" | "highlight" | "google" | "photo";

export type ReviewItem = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  shortQuote: string;
  date: string;
  category: ReviewCategory;
  verified: boolean;
  featured?: boolean;
  layout?: ReviewLayout;
  photoSrc?: string;
};

export const reviewsPageHero = {
  eyebrow: "REVIEWS",
  ratingLabel: "5.0 Google Rating",
  reviewCountLabel: "278+ Reviews",
  trustLine: "Trusted by Roswell families",
  rotatingWords: ["TRUSTED", "COMMUNITY", "5 STAR", "FAMILY"] as const,
} as const;

export type ReviewStatItem = {
  id: string;
  label: string;
  numericValue?: number;
  suffix?: string;
  decimals?: number;
  display?: string;
  showStars?: boolean;
};

export const reviewsPageStats: ReviewStatItem[] = [
  {
    id: "rating",
    label: "Rating",
    numericValue: business.googleReviews.aggregateRating,
    decimals: 1,
    showStars: true,
  },
  {
    id: "reviews",
    label: "Verified Google Reviews",
    numericValue: business.googleReviews.reviewCount,
    suffix: "+",
  },
  {
    id: "returning",
    label: "Returning Customers",
    numericValue: 98,
    suffix: "%",
  },
  {
    id: "haircuts",
    label: "Haircuts Completed",
    numericValue: 5000,
    suffix: "+",
  },
  {
    id: "experience",
    label: "Years Combined Experience",
    numericValue: 20,
    suffix: "+",
  },
];

export const reviewsPageTrust = {
  title: "Verified on Google",
  subtitle: "Verified Google Business",
  verifiedLabel: "100% Verified Reviews",
  ctaLabel: "View All Reviews on Google",
} as const;

export const reviewsPageCta = {
  title: "Love your experience?",
  description: "Help another family discover us.",
  buttonLabel: "Leave a Google Review",
  thankYouLabel: "Thank You",
} as const;

export const reviewItems: ReviewItem[] = [
  {
    id: "mack-wolfe",
    name: "Mack Wolfe",
    location: "Roswell, GA",
    rating: 5,
    text: "I've been searching for years to find a great barber for both me and my son, and I'm so glad I came across this shop! I took my 5-year-old in for a haircut and was blown away by how great they were with him.",
    shortQuote: "Blown away by how great they were with my son.",
    date: "March 2026",
    category: "Kids",
    verified: true,
    featured: true,
    layout: "highlight",
  },
  {
    id: "alyssa-manley",
    name: "Alyssa Manley",
    location: "Alpharetta, GA",
    rating: 5,
    text: "They were so patient with my kid and the haircut looks amazing. Super friendly staff. Will definitely be back! My son loved it!",
    shortQuote: "Patient with my kid — the haircut looks amazing.",
    date: "February 2026",
    category: "Kids",
    verified: true,
    featured: true,
    layout: "quote",
  },
  {
    id: "andrew-hadge",
    name: "Andrew Hadge",
    location: "Sandy Springs, GA",
    rating: 5,
    text: "Consistent quality every time. Easy to book, on time, and always professional. Will definitely be back!",
    shortQuote: "Consistent quality every time.",
    date: "January 2026",
    category: "Haircuts",
    verified: true,
    featured: true,
    layout: "google",
  },
  {
    id: "matthew-green",
    name: "Matthew Green",
    location: "Marietta, GA",
    rating: 5,
    text: "Best fade I've had in Roswell. Clean lines, sharp blend, and a welcoming shop from the moment you walk in.",
    shortQuote: "Best fade I've had in Roswell.",
    date: "January 2026",
    category: "Skin Fade",
    verified: true,
    layout: "quote",
  },
  {
    id: "jonathan-nguyen",
    name: "Jonathan Nguyen",
    location: "Atlanta, GA",
    rating: 5,
    text: "Beard trim was detailed and precise. They took their time and the finish looked sharp all week.",
    shortQuote: "Beard trim was detailed and precise.",
    date: "December 2025",
    category: "Beard",
    verified: true,
    layout: "compact",
  },
  {
    id: "judah-delaney",
    name: "Judah Delaney",
    location: "Roswell, GA",
    rating: 5,
    text: "Hot towel shave was relaxing and the finish was incredibly smooth. Felt like a premium experience start to finish.",
    shortQuote: "Hot towel shave felt like a premium experience.",
    date: "December 2025",
    category: "Hot Towel",
    verified: true,
    layout: "google",
  },
  {
    id: "adam-leed",
    name: "Adam Leed",
    location: "Cumming, GA",
    rating: 5,
    text: "Family-friendly shop with real skill behind the chair. My son and I both left looking sharp.",
    shortQuote: "Family-friendly shop with real skill.",
    date: "November 2025",
    category: "Kids",
    verified: true,
    layout: "photo",
  },
  {
    id: "anes-ribic",
    name: "Anes Ribic",
    location: "Alpharetta, GA",
    rating: 5,
    text: "Professional atmosphere, great conversation, and a haircut that held up perfectly between visits.",
    shortQuote: "A haircut that held up perfectly.",
    date: "November 2025",
    category: "Haircuts",
    verified: true,
    layout: "compact",
  },
  {
    id: "daniel-suppes",
    name: "Daniel Suppes",
    location: "Sandy Springs, GA",
    rating: 5,
    text: "Skin fade was crisp and balanced on both sides. Exactly the look I wanted without having to over-explain.",
    shortQuote: "Skin fade was crisp and balanced.",
    date: "October 2025",
    category: "Skin Fade",
    verified: true,
    layout: "highlight",
  },
  {
    id: "will-liberman",
    name: "Will Liberman",
    location: "Roswell, GA",
    rating: 5,
    text: "Easy booking, friendly barbers, and a shop you actually want to come back to. Highly recommend.",
    shortQuote: "A shop you actually want to come back to.",
    date: "October 2025",
    category: "Haircuts",
    verified: true,
    layout: "google",
  },
  {
    id: "mt-review",
    name: "MT",
    location: "Roswell, GA",
    rating: 5,
    text: "Clean shop, great energy, and attention to detail on every service. This is our go-to barbershop now.",
    shortQuote: "Attention to detail on every service.",
    date: "September 2025",
    category: "Haircuts",
    verified: true,
    layout: "compact",
  },
  {
    id: "beard-review-2",
    name: "Chris R.",
    location: "Marietta, GA",
    rating: 5,
    text: "Line-up and beard sculpt were on point. You can tell these barbers care about the finish.",
    shortQuote: "Line-up and beard sculpt were on point.",
    date: "September 2025",
    category: "Beard",
    verified: true,
    layout: "photo",
  },
];

export function getReviewLayout(review: ReviewItem, index: number): ReviewLayout {
  if (review.layout) return review.layout;
  const layouts: ReviewLayout[] = ["compact", "google", "quote", "highlight", "photo"];
  return layouts[index % layouts.length];
}

export function filterReviews(category: ReviewFilterCategory) {
  if (category === "All Reviews") return reviewItems;
  return reviewItems.filter((item) => item.category === category);
}
