/**
 * Update your business information here (one place).
 * - Name, phone, address, hours, social links
 * - Services + prices
 * - Reviews/testimonials
 * - Gallery images
 */

export type BusinessHours = {
  label: string;
  hours: string;
};

export type Service = {
  name: string;
  description: string;
  price: string; // Keep as string so it's easy to edit (e.g. "$25", "From $30")
  duration?: string;
  popular?: boolean;
  premium?: boolean;
  category?: ServiceCategory;
  imageSrc?: string;
  imageAlt?: string;
};

export type ServiceCategory = "Haircuts" | "Beard Services" | "Additional Services";

export type ProductBadge =
  | "Best Seller"
  | "Matte Finish"
  | "Strong Hold"
  | "Shine Finish"
  | "Beard Care";

export type ProductTrustLabel =
  | "Used Daily In Our Shop"
  | "Barber Recommended"
  | "Professional Grade";

export type Product = {
  name: string;
  description: string;
  price: string;
  category: string;
  badge?: ProductBadge;
  trustLabel?: ProductTrustLabel;
  finish?: string;
  hold?: string;
  shine?: string;
  hairType?: string;
  professionalRating?: number;
  /** Ambient glow color for hero carousel (CSS color) */
  glowColor?: string;
  imageSrc: string;
  imageAlt?: string;
  /** Set false for product photos with white backgrounds (e.g. Layrite). */
  transparentImage?: boolean;
  ctaLabel?: "Ask in Shop" | "Available In Shop";
  popular?: boolean;
};

export type Testimonial = {
  name: string;
  rating: number; // 1..5
  text: string;
  location?: string;
  featured?: boolean;
};

export type GoogleReviewsContent = {
  aggregateRating: number;
  ratingLabel: string;
  reviewCount: number;
  reviewCountLabel: string;
  verifiedPercent: number;
  verifiedPercentLabel: string;
  floatingBadgeRating: string;
  floatingBadgeReviews: string;
  imageSrc: string;
  imageAlt: string;
};

export type FooterContent = {
  closingHeadline: string;
  closingSubheadline: string;
  brandTagline: string;
  craftedIn: string;
  poweredBy: string;
  trustBadges: readonly string[];
  bookingQr: {
    src: string;
    alt: string;
    scanLabel: string;
    scanSubtext: string;
  };
};

export type LocationFeatureIcon = "car" | "footprints" | "calendar" | "credit-card";

export type LocationFeature = {
  title: string;
  description: string;
  icon: LocationFeatureIcon;
};

export type LocationContent = {
  sectionTitle: string;
  sectionDescription: string;
  features: readonly LocationFeature[];
  ctaHeadline: string;
  ctaSubheadline: string;
};

export type GalleryCategory =
  | "Haircuts"
  | "Beard"
  | "Before & After"
  | "Shop"
  | "Family";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: GalleryCategory;
  size: "large" | "medium";
  ctaLabel?: "View Photo" | "Explore";
};

export type GalleryContent = {
  sectionTitle: string;
  sectionDescription: string;
  featuredVideo: {
    title: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
    externalUrl?: string;
  };
};

export type TrustIconKey =
  | "star"
  | "users-round"
  | "scissors"
  | "calendar-days"
  | "heart-handshake";

export type HeroTrustItem = {
  icon: TrustIconKey;
  label: string;
};

export type TrustBarItem = {
  icon: TrustIconKey;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  trustRow: readonly HeroTrustItem[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  directionsCtaLabel: string;
  videoSrc: string;
  posterSrc: string;
};

export type TopBarContent = {
  leftText: string;
  rightText: string;
  mobileText: string;
};

export type WhyChooseUsIconKey = "award" | "heart-handshake" | "sparkles" | "map-pin";

export type WhyChooseUsFeature = {
  icon: WhyChooseUsIconKey;
  title: string;
  description: string;
};

export type WhyChooseUsContent = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  highlights: readonly string[];
  features: readonly WhyChooseUsFeature[];
};

export type AboutHeroContent = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  imageSrc: string;
  imageAlt: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  trustBadges: readonly string[];
};

export type AboutValueIcon = "scissors" | "heart" | "handshake" | "sparkles";

export type AboutValue = {
  icon: AboutValueIcon;
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  position: string;
  yearsExperience: string;
  specialties: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export type JourneyMilestone = {
  label: string;
  emphasis?: boolean;
};

export type AboutStatItem = {
  display: string;
  numericValue?: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

export type AboutStoryContent = {
  eyebrow: string;
  title: string;
  headline: string;
  headlineAccent: string;
  paragraphs: readonly string[];
  highlights: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export type AboutClosingContent = {
  headline: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  ratingLine: string;
  reviewsLine: string;
};

export type ServicesHeroContent = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustBadges: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export type ServicesHowItWorksStep = {
  title: string;
  description: string;
};

export type ServicesBeforeAfter = {
  label: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export type ServicesWhyChooseIcon = "scissors" | "sparkles" | "heart" | "droplets";

export type ServicesWhyChoose = {
  icon: ServicesWhyChooseIcon;
  title: string;
  description: string;
};

export type ServicesFaqItem = {
  question: string;
  answer: string;
};

export type ServicesClosingContent = {
  headline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type ServicesPageContent = {
  hero: ServicesHeroContent;
  mostBookedTitle: string;
  mostBookedSlugs: readonly string[];
  allServicesTitle: string;
  allServicesDescription: string;
  categories: readonly ServiceCategory[];
  howItWorksTitle: string;
  howItWorksSteps: readonly ServicesHowItWorksStep[];
  beforeAfterTitle: string;
  beforeAfterDescription: string;
  beforeAfter: readonly ServicesBeforeAfter[];
  whyChooseTitle: string;
  whyChoose: readonly ServicesWhyChoose[];
  faqTitle: string;
  faq: readonly ServicesFaqItem[];
  closing: ServicesClosingContent;
};

export type ProductsWhyBarberIcon = "award" | "clock" | "leaf" | "refresh";

export type ProductsWhyBarber = {
  icon: ProductsWhyBarberIcon;
  title: string;
  description: string;
};

export type ProductsPageContent = {
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    badges: readonly string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  featuredTitle: string;
  featuredDescription: string;
  whyBarbersTitle: string;
  whyBarbers: readonly ProductsWhyBarber[];
  comparisonTitle: string;
  comparisonDescription: string;
  barbersPick: {
    label: string;
    productName: string;
    explanation: string;
    ctaLabel: string;
  };
  collectionTitle: string;
  collectionDescription: string;
  closing: {
    headline: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
};

export const business = {
  name: "Family Barber Shop",
  tagline: "Clean cuts. Warm service. Family-friendly.",
  siteUrl: "https://familybarbershopusa.com",
  phone: "678-395-3129",
  phoneHref: "tel:+16783953129",
  email: "familybarbershop30@gmail.com",
  emailHref: "mailto:familybarbershop30@gmail.com",
  addressLine1: "4750 Alabama Rd #116",
  addressLine2: "Roswell, GA 30075",
  neighborhoodOrArea: "Roswell, GA",
  establishedLabel: "EST. 2017",
  hero: {
    eyebrow: "Family Barber Shop · Roswell, GA",
    headline: "Sharp Cuts. Clean Fades. Family Trusted.",
    subheadline:
      "Premium haircuts, skin fades, beard trims, hot towel shaves, and friendly service for the whole family in Roswell, GA.",
    trustRow: [
      { icon: "star", label: "5.0 Google Rating" },
      { icon: "users-round", label: "500+ Happy Customers" },
      { icon: "scissors", label: "Walk-ins Welcome" },
      { icon: "calendar-days", label: "Open Sundays" },
      { icon: "heart-handshake", label: "Family Friendly" },
    ],
    primaryCtaLabel: "Book Appointment",
    secondaryCtaLabel: "Call Now",
    directionsCtaLabel: "Directions",
    videoSrc: "/video/barber-hero.mp4",
    posterSrc: "/gallery/_DSC6236.jpg",
  } satisfies HeroContent,
  trustBar: [
    { icon: "star", label: "5.0 Google Rating" },
    { icon: "users-round", label: "500+ Happy Customers" },
    { icon: "scissors", label: "Walk-ins Welcome" },
    { icon: "calendar-days", label: "Open Sundays" },
    { icon: "heart-handshake", label: "Family Friendly" },
  ] satisfies TrustBarItem[],
  topBar: {
    leftText: "★ Family-Friendly Barbershop in Roswell, GA",
    rightText: "Walk-Ins Welcome • Open Sundays • Since 2017",
    mobileText: "Walk-Ins Welcome • Open Sundays",
  } satisfies TopBarContent,
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    headline: "Premium cuts, welcoming vibe.",
    headlineAccent: "Family trusted.",
    description:
      "We keep it simple: clean work, respectful service, and a shop you're proud to bring your family to.",
    ctaLabel: "Meet the team",
    ctaHref: "/about",
    imageSrc: "/gallery/_DSC6364.jpg",
    imageAlt: "Wide-angle view inside Family Barber Shop — modern stations, warm lighting, and a welcoming atmosphere",
    highlights: [
      "Walk-ins welcome",
      "Open Sundays",
      "5.0 Google rating",
      "Family-friendly service",
    ],
    features: [
      {
        icon: "award",
        title: "Consistent quality",
        description: "Details matter—from the fade to the line-up.",
      },
      {
        icon: "heart-handshake",
        title: "Family-first service",
        description: "Comfortable for kids, teens, and adults.",
      },
      {
        icon: "sparkles",
        title: "Clean & comfortable",
        description: "Fresh stations, tidy tools, welcoming space.",
      },
      {
        icon: "map-pin",
        title: "Local & trusted",
        description: "Built on repeat customers and referrals.",
      },
    ],
  } satisfies WhyChooseUsContent,
  aboutHero: {
    eyebrow: "About Family Barber Shop",
    headline: "More Than A Haircut.",
    headlineAccent: "A Place You'll Want To Come Back To.",
    subheadline:
      "Serving Roswell with premium barbering, family-friendly service, and attention to every detail.",
    imageSrc: "/gallery/Cover Family Barber shop-2.jpg",
    imageAlt:
      "Family Barber Shop storefront in Roswell, Georgia — welcoming exterior with warm lighting",
    primaryCtaLabel: "Book Appointment",
    secondaryCtaLabel: "Meet Our Team",
    secondaryCtaHref: "#meet-the-team",
    trustBadges: [
      "278+ Google Reviews",
      "5.0 Rating",
      "Family Friendly",
      "Open 7 Days",
    ],
  } satisfies AboutHeroContent,
  aboutStory: {
    eyebrow: "Our Story",
    title: "Our Story",
    headline: "Built on trust.",
    headlineAccent: "Designed for families.",
    paragraphs: [
      "Family Barber Shop started with a simple belief: everyone deserves a great haircut in a place that feels welcoming from the moment you walk in. What began as a vision to serve Roswell with premium barbering has grown into a shop families return to again and again.",
      "We built this space for real life—for dads bringing their sons, professionals between meetings, and anyone who wants to look sharp without the pretense. Every detail, from the stations to the service, reflects the care we put into our craft.",
      "Today, we're proud to be part of this community. Our barbers take time to listen, our atmosphere stays calm and respectful, and our standards never slip. That's the promise behind every chair in our shop.",
    ],
    highlights: [
      "Family-owned",
      "Friendly atmosphere",
      "Skilled barbers",
      "Precision haircuts",
      "Kids welcome",
      "Community focused",
    ],
    imageSrc: "/gallery/_DSC6648.jpg",
    imageAlt: "Barber delivering a precision haircut inside Family Barber Shop",
  } satisfies AboutStoryContent,
  aboutValues: [
    {
      icon: "scissors",
      title: "Precision",
      description:
        "Sharp lines, clean fades, and finishes that hold up between visits.",
    },
    {
      icon: "heart",
      title: "Family First",
      description:
        "A welcoming shop where kids, parents, and regulars all feel at home.",
    },
    {
      icon: "handshake",
      title: "Respect",
      description:
        "We listen, we take our time, and we treat every guest with care.",
    },
    {
      icon: "sparkles",
      title: "Clean Environment",
      description:
        "Fresh stations, tidy tools, and a comfortable space you can trust.",
    },
  ] satisfies AboutValue[],
  aboutTeam: [
    {
      name: "Hasim A.",
      position: "Lead & Master Barber",
      yearsExperience: "15+ years",
      specialties: ["Skin Fades", "Beard Sculpting", "Classic Cuts", "Modern Styles"],
      imageSrc: "/gallery/barber1.png",
      imageAlt: "Hasim A., lead and master barber at Family Barber Shop",
    },
    {
      name: "Shahnaz M.",
      position: "Master Barber",
      yearsExperience: "12+ years",
      specialties: ["Tapers", "Kids Cuts", "Hot Towel Shaves"],
      imageSrc: "/gallery/barber2.png",
      imageAlt: "Shahnaz M., master barber at Family Barber Shop",
    },
    {
      name: "Kenan A.",
      position: "Barber & Manager",
      yearsExperience: "",
      specialties: ["Line-Ups", "Beard Trims", "Modern Styles"],
      imageSrc: "/gallery/barberk.png",
      imageAlt: "Kenan A., barber and manager at Family Barber Shop",
    },
  ] satisfies TeamMember[],
  aboutJourney: [
    { label: "2025", emphasis: true },
    { label: "Grand Opening" },
    { label: "100 Reviews" },
    { label: "200 Reviews" },
    { label: "278+ Reviews" },
    { label: "Growing Every Day", emphasis: true },
  ] satisfies JourneyMilestone[],
  aboutStats: [
    { display: "278+", numericValue: 278, suffix: "+", label: "Google Reviews" },
    {
      display: "5.0★",
      numericValue: 5,
      decimals: 1,
      label: "Rating",
    },
    { display: "Thousands", label: "Haircuts" },
    { display: "Open", label: "7 Days" },
  ] satisfies AboutStatItem[],
  aboutClosing: {
    headline: "Experience The Difference Yourself.",
    description:
      "We'd love to welcome you into our shop and show you why so many families trust Family Barber Shop.",
    primaryCtaLabel: "Book Appointment",
    secondaryCtaLabel: "Get Directions",
    ratingLine: "★★★★★ 5.0 Google Rating",
    reviewsLine: "278+ Verified Reviews",
  } satisfies AboutClosingContent,
  aboutGalleryLimit: 6,
  servicesPage: {
    hero: {
      eyebrow: "Services",
      headline: "Professional Haircuts.",
      headlineAccent: "Premium Experience.",
      description:
        "Professional barbering for men, kids, and families with attention to every detail.",
      primaryCtaLabel: "Book Appointment",
      secondaryCtaLabel: "Call Now",
      trustBadges: [
        "⭐ 5.0 Rating",
        "278+ Google Reviews",
        "Walk-ins Welcome",
        "Family Friendly",
        "Same Day Appointments",
      ],
      imageSrc: "/gallery/_DSC6648.jpg",
      imageAlt: "Barber delivering a precision haircut at Family Barber Shop",
    },
    mostBookedTitle: "Most Booked Services",
    mostBookedSlugs: ["Haircut", "Skin Fade", "Beard Trim"],
    allServicesTitle: "All Services",
    allServicesDescription:
      "Every service is delivered with the same care, precision, and premium finish you expect from a luxury barbershop.",
    categories: ["Haircuts", "Beard Services", "Additional Services"],
    howItWorksTitle: "How It Works",
    howItWorksSteps: [
      {
        title: "Book Appointment",
        description: "Reserve online or walk in when it suits your schedule.",
      },
      {
        title: "Consultation",
        description: "We listen to your style goals and recommend the right cut.",
      },
      {
        title: "Haircut",
        description: "Precision work with clean lines and expert technique.",
      },
      {
        title: "Styling",
        description: "Finished with product, detail, and a polished look.",
      },
      {
        title: "Ready To Go",
        description: "Walk out confident, refreshed, and looking your best.",
      },
    ],
    beforeAfterTitle: "Before & After",
    beforeAfterDescription:
      "Real transformations from our chair—precision fades, sharp line-ups, and polished finishes.",
    beforeAfter: [
      {
        label: "Skin Fade Transformation",
        beforeSrc: "/gallery/skinfade.png",
        afterSrc: "/gallery/IMG_0063.JPG",
        beforeAlt: "Client before skin fade transformation in barber chair",
        afterAlt: "After skin fade with crisp blend and sharp line-up",
      },
      {
        label: "Beard Sculpt & Line-Up",
        beforeSrc: "/gallery/images-1.jpg",
        afterSrc: "/gallery/images.jpg",
        beforeAlt: "Before beard trim",
        afterAlt: "After precision beard sculpt and line-up",
      },
    ],
    whyChooseTitle: "Why Choose Us",
    whyChoose: [
      {
        icon: "scissors",
        title: "Professional Barbers",
        description: "Skilled craftsmen trained in modern and classic techniques.",
      },
      {
        icon: "sparkles",
        title: "Sanitized Equipment",
        description: "Clean stations, fresh tools, and a spotless environment every visit.",
      },
      {
        icon: "heart",
        title: "Family Friendly",
        description: "Welcoming atmosphere for kids, teens, and adults alike.",
      },
      {
        icon: "droplets",
        title: "Premium Products",
        description: "Professional-grade styling and grooming products in-shop.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Do you accept walk-ins?",
        answer:
          "Yes. Walk-ins are welcome based on availability. For your preferred barber or time, we recommend booking ahead.",
      },
      {
        question: "How do appointments work?",
        answer:
          "Book online through our scheduling link or call the shop. We'll confirm your time and have your station ready when you arrive.",
      },
      {
        question: "Are kids welcome?",
        answer:
          "Absolutely. We're a family barbershop and take pride in patient, friendly service for children of all ages.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, and cash. Contactless payment is available at checkout.",
      },
    ],
    closing: {
      headline: "Ready For Your Best Haircut?",
      primaryCtaLabel: "Book Appointment",
      secondaryCtaLabel: "Call Now",
    },
  } satisfies ServicesPageContent,
  productsPage: {
    hero: {
      eyebrow: "PRODUCTS",
      headline: "Professional Products.",
      headlineAccent: "Trusted Every Day.",
      subheadline:
        "Every product displayed here is used, tested and recommended by our professional barbers to deliver consistent results.",
      badges: [
        "Used Daily By Our Barbers",
        "Professional Grade",
        "Barber Recommended",
        "Available In Store",
      ],
      primaryCtaLabel: "Ask In Shop",
      secondaryCtaLabel: "Book Appointment",
    },
    featuredTitle: "Featured Products",
    featuredDescription:
      "The essentials our barbers reach for daily—curated for hold, finish, and real-world performance.",
    whyBarbersTitle: "Why Our Barbers Use These",
    whyBarbers: [
      {
        icon: "award",
        title: "Professional Quality",
        description: "Salon-grade formulas chosen for consistent, barbershop-level results.",
      },
      {
        icon: "clock",
        title: "Long Lasting Hold",
        description: "Styles that stay sharp from morning through your day without constant touch-ups.",
      },
      {
        icon: "leaf",
        title: "Healthy Ingredients",
        description: "Thoughtful formulations that care for hair and skin with every application.",
      },
      {
        icon: "refresh",
        title: "Easy To Restyle",
        description: "Reworkable textures that let you adjust your look without starting over.",
      },
    ],
    comparisonTitle: "Product Comparison",
    comparisonDescription:
      "Compare hold, finish, and performance at a glance—so you leave with the right product for your hair.",
    barbersPick: {
      label: "This Month's Barber Favorite",
      productName: "Layrite Super Hold Pomade",
      explanation:
        "Our barbers reach for Layrite Super Hold when clients want structured, all-day control with a classic barbershop shine. It keeps styles sharp without feeling heavy—exactly what we use on the chair every day.",
      ctaLabel: "Ask In Shop",
    },
    collectionTitle: "Complete Collection",
    collectionDescription:
      "Every product on our shelf, hand-selected by the team that uses them behind the chair.",
    closing: {
      headline: "Upgrade Your Style With Professional Products.",
      primaryCtaLabel: "Visit Our Shop",
      secondaryCtaLabel: "Book Appointment",
    },
  } satisfies ProductsPageContent,
  mapsUrl:
    "https://www.google.com/maps/place/Family+Barber+Shop/@34.0984296,-84.5780005,36645m/data=!3m1!1e3!4m10!1m2!2m1!1sbarber+shop!3m6!1s0x88f573b15e4b209d:0xb8d813430a3e0996!8m2!3d34.0662981!4d-84.4233375!15sCgtiYXJiZXIgc2hvcFoNIgtiYXJiZXIgc2hvcJIBC2JhcmJlcl9zaG9wmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5UVVJKY1hOcGQyMW5SUkFC4AEA-gEECE4QPQ!16s%2Fg%2F11wx4m9nq1?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=34.0662981,-84.4233375&z=15&output=embed",
  geo: {
    latitude: 34.0662981,
    longitude: -84.4233375,
  },
  hours: [
    { label: "Mon", hours: "9:00 AM – 7:00 PM" },
    { label: "Tue", hours: "9:00 AM – 7:00 PM" },
    { label: "Wed", hours: "9:00 AM – 7:00 PM" },
    { label: "Thu", hours: "9:00 AM – 7:00 PM" },
    { label: "Fri", hours: "9:00 AM – 7:00 PM" },
    { label: "Sat", hours: "8:00 AM – 6:00 PM" },
    { label: "Sun", hours: "10:00 AM – 6:00 PM" },
  ] satisfies BusinessHours[],
  locationContent: {
    sectionTitle: "Visit the shop",
    sectionDescription:
      "Find us in Roswell with easy parking, walk-ins welcome, and a modern shop built for families.",
    features: [
      {
        icon: "car",
        title: "Free Parking",
        description: "Convenient parking right at the shop.",
      },
      {
        icon: "footprints",
        title: "Walk-ins Welcome",
        description: "Stop by whenever it works for you.",
      },
      {
        icon: "calendar",
        title: "Appointments Available",
        description: "Book ahead for your preferred time.",
      },
      {
        icon: "credit-card",
        title: "Credit Cards Accepted",
        description: "All major cards welcome at checkout.",
      },
    ],
    ctaHeadline: "Ready For Your Next Cut?",
    ctaSubheadline: "Join 278+ Five-Star Google Reviews.",
  } satisfies LocationContent,
  footer: {
    closingHeadline: "Your Next Great Haircut Starts Here.",
    closingSubheadline:
      "Join 278+ Five-Star Google Reviews and experience why families trust us.",
    brandTagline: "Sharp Cuts. Clean Fades. Family Trusted.",
    craftedIn: "Crafted in Roswell, Georgia",
    poweredBy: "KA TECH",
    trustBadges: [
      "Walk-ins Welcome",
      "Open Sundays",
      "Family Friendly",
      "Free Parking",
    ],
    bookingQr: {
      src: "/gallery/booking-qr.png",
      alt: "Scan this QR code to book your Family Barber Shop appointment.",
      scanLabel: "Scan to Book",
      scanSubtext: "Fast • Secure • Mobile Friendly",
    },
  } satisfies FooterContent,
  links: {
    bookingUrl:
      "https://book.squareup.com/appointments/dlm0qs4bdxsqfp/location/LFJGMMHS7QE1R/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so",
    instagram: "https://www.instagram.com/familybarbershopusa/",
    facebook: "https://www.facebook.com/thefamily.barbershopusa",
    tiktok: "",
    yelp: "",
    googleReviews:
      "https://www.google.com/maps/place/Family+Barber+Shop/@34.0662981,-84.4259124,1166m/data=!3m1!1e3!4m8!3m7!1s0x88f573b15e4b209d:0xb8d813430a3e0996!8m2!3d34.0662981!4d-84.4233375!9m1!1b1!16s%2Fg%2F11wx4m9nq1?authuser=2&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
  },
  services: [
    {
      name: "Haircut",
      description: "Classic cut with a clean finish.",
      price: "$35",
      duration: "30 min",
      popular: true,
      category: "Haircuts",
      imageSrc: "/gallery/_DSC6236.jpg",
      imageAlt: "Barber giving a precision haircut at Family Barber Shop",
    },
    {
      name: "Skin Fade",
      description: "Tight fade blended to skin for a crisp look.",
      price: "From $40",
      duration: "38 min",
      popular: true,
      category: "Haircuts",
      imageSrc: "/gallery/IMG_0063.JPG",
      imageAlt: "High skin fade haircut with clean blend and sharp line-up",
    },
    {
      name: "Beard Trim",
      description: "Shape, line-up, and detail work.",
      price: "$20",
      duration: "20 min",
      premium: true,
      category: "Beard Services",
      imageSrc: "/gallery/images.jpg",
      imageAlt: "Precision beard trim with clipper and comb at the barbershop",
    },
    {
      name: "Kids Haircut",
      description: "Patient, friendly service for kids.",
      price: "$30",
      duration: "25 min",
      category: "Haircuts",
      imageSrc: "/gallery/IMG_0447.png",
      imageAlt: "Kids haircut in a family-friendly barbershop",
    },
    {
      name: "Neck Shave",
      description: "Clean neckline with a smooth, sharp finish.",
      price: "$15",
      duration: "15 min",
      category: "Beard Services",
      imageSrc: "/gallery/_DSC6288.jpg",
      imageAlt: "Neck shave with clean, sharp finish",
    },
    {
      name: "Hot Towel Shave",
      description: "Hot towel, straight-razor finish, and aftercare.",
      price: "$35",
      duration: "30 min",
      premium: true,
      category: "Beard Services",
      imageSrc: "/gallery/images-1.jpg",
      imageAlt: "Hot towel treatment draped over the face during a shave",
    },
    {
      name: "Hair Wash & Styling",
      description: "Shampoo, condition, and style for a fresh look.",
      price: "From $15",
      duration: "15 min",
      category: "Additional Services",
      imageSrc: "/gallery/_DSC6268.jpg",
      imageAlt: "Hair wash and styling at the station",
    },
  ] satisfies Service[],
  products: [
    {
      name: "Layrite Cement Clay",
      description: "Maximum-hold clay with a true matte finish—builds texture and definition with zero shine.",
      price: "$27",
      category: "Styling",
      badge: "Matte Finish",
      trustLabel: "Barber Recommended",
      finish: "Matte",
      hold: "Strong",
      shine: "Low",
      hairType: "Short–Medium",
      professionalRating: 5,
      glowColor: "rgba(197, 157, 95, 0.18)",
      imageSrc: "/gallery/Layrite_Deluxe-Cement_Clay-4_25oz-Front-0191_1024x1024@2x.webp",
      imageAlt: "Layrite Cement Clay",
      transparentImage: false,
      ctaLabel: "Available In Shop",
      popular: true,
    },
    {
      name: "Layrite Natural Matte Pomade",
      description: "Water-based pomade with a natural matte finish and medium hold—easy to restyle all day.",
      price: "$27",
      category: "Styling",
      badge: "Matte Finish",
      trustLabel: "Professional Grade",
      finish: "Matte",
      hold: "Medium",
      shine: "Low",
      hairType: "All Types",
      professionalRating: 5,
      glowColor: "rgba(180, 160, 120, 0.16)",
      imageSrc: "/gallery/Layrite_Deluxe-Natural_Matte_Pomade-10oz-Front-0024_2048x.webp",
      imageAlt: "Layrite Natural Matte Pomade",
      transparentImage: false,
      ctaLabel: "Ask in Shop",
      popular: true,
    },
    {
      name: "Layrite Super Hold Pomade",
      description: "Extra hold for structured styles that stay sharp all day with a classic barbershop finish.",
      price: "$27",
      category: "Styling",
      badge: "Strong Hold",
      trustLabel: "Used Daily In Our Shop",
      finish: "Shine",
      hold: "Extra",
      shine: "High",
      hairType: "Short–Medium",
      professionalRating: 5,
      glowColor: "rgba(220, 190, 130, 0.18)",
      imageSrc: "/gallery/Layrite_Deluxe-Super_Hold_Pomade-4_25oz-Front-0037_1024x1024@2x.webp",
      imageAlt: "Layrite Super Hold Pomade",
      transparentImage: false,
      ctaLabel: "Available In Shop",
      popular: true,
    },
    {
      name: "Layrite Super Shine Cream",
      description: "Classic cream pomade with high shine and supple control for polished, slick-back styles.",
      price: "$27",
      category: "Styling",
      badge: "Shine Finish",
      trustLabel: "Used Daily In Our Shop",
      finish: "Shine",
      hold: "Medium",
      shine: "High",
      hairType: "Short–Medium",
      professionalRating: 5,
      glowColor: "rgba(212, 175, 55, 0.2)",
      imageSrc: "/gallery/Layrite_Deluxe-Super_Shine_Cream-4_25oz-Front-0046.webp",
      imageAlt: "Layrite Super Shine Cream",
      transparentImage: false,
      ctaLabel: "Available In Shop",
    },
  ] satisfies Product[],
  googleReviews: {
    aggregateRating: 5.0,
    ratingLabel: "5.0 Rating",
    reviewCount: 278,
    reviewCountLabel: "Google Reviews",
    verifiedPercent: 100,
    verifiedPercentLabel: "Verified Reviews",
    floatingBadgeRating: "5.0 Google Rating",
    floatingBadgeReviews: "278+ Verified Reviews",
    imageSrc: "/gallery/_DSC6268.jpg",
    imageAlt: "Inside Family Barber Shop — premium barbershop interior",
  } satisfies GoogleReviewsContent,
  testimonials: [
    {
      name: "Mack Wolfe",
      rating: 5,
      text: "I’ve been searching for years to find a great barber for both me and my son, and I’m so glad I came across this shop! I took my 5-year-old in for a haircut and was blown away by how great they were with him. The barber was patient, friendly, and made my son feel comfortable the whole time.",
      location: "Roswell, GA",
    },
    {
      name: "Alyssa Manley",
      rating: 5,
      text: "They were so patient with my kid and the haircut looks amazing. Super friendly staff. Will definitely be back! My son loved it!",
      location: "Alpharetta, GA",
      featured: true,
    },
    {
      name: "Andrew Hadge",
      rating: 5,
      text: "Consistent quality every time. Easy to book, on time, and always professional. Will definitely be back!",
      location: "Sandy Springs, GA",
    },
  ] satisfies Testimonial[],
  galleryContent: {
    sectionTitle: "Craft, atmosphere, and experience",
    sectionDescription:
      "A look inside the shop—precision work, welcoming spaces, and the moments that make Family Barber Shop feel like home.",
    featuredVideo: {
      title: "Watch Our Shop",
      description: "Step inside and experience the atmosphere, craftsmanship, and energy of our shop.",
      videoSrc: "/video/barber-hero.mp4",
      posterSrc: "/gallery/_DSC6268.jpg",
      externalUrl: "https://www.instagram.com/reel/DJAGBVmSSHE/",
    },
  } satisfies GalleryContent,
  gallery: [
    {
      src: "/gallery/_DSC6236.jpg",
      alt: "Barber delivering a precision haircut at Family Barber Shop",
      title: "Precision Haircut",
      description: "Clean finishes and sharp detail in every pass.",
      category: "Haircuts",
      size: "large",
      ctaLabel: "View Photo",
    },
    {
      src: "/gallery/IMG_0063.JPG",
      alt: "High skin fade with crisp blend and sharp line-up",
      title: "Skin Fade",
      description: "Tight blends and sharp edges for a polished look.",
      category: "Before & After",
      size: "medium",
      ctaLabel: "Explore",
    },
    {
      src: "/gallery/images.jpg",
      alt: "Professional beard trim with clipper and comb",
      title: "Beard Trim",
      description: "Shape, line-up, and detail work with care.",
      category: "Beard",
      size: "medium",
      ctaLabel: "View Photo",
    },
    {
      src: "/gallery/_DSC6268.jpg",
      alt: "Inside Family Barber Shop — chairs and stations",
      title: "Shop Atmosphere",
      description: "Modern stations, warm lighting, and a welcoming vibe.",
      category: "Shop",
      size: "large",
      ctaLabel: "Explore",
    },
    {
      src: "/gallery/IMG_0447.png",
      alt: "Kids haircut in a family-friendly barbershop",
      title: "Family Haircut",
      description: "Patient, friendly service for kids and parents alike.",
      category: "Family",
      size: "large",
      ctaLabel: "View Photo",
    },
    {
      src: "/gallery/images-1.jpg",
      alt: "Hot towel treatment during a straight-razor shave",
      title: "Hot Towel Shave",
      description: "A relaxing ritual with a smooth, classic finish.",
      category: "Beard",
      size: "medium",
      ctaLabel: "Explore",
    },
    {
      src: "/gallery/_DSC6364.jpg",
      alt: "Wide view of the barbershop interior",
      title: "Modern Interior",
      description: "Clean lines, premium comfort, and room for the whole family.",
      category: "Shop",
      size: "medium",
      ctaLabel: "View Photo",
    },
    {
      src: "/gallery/_DSC6648.jpg",
      alt: "In-shop grooming service moment",
      title: "In the Chair",
      description: "Focused craftsmanship and calm, professional service.",
      category: "Haircuts",
      size: "medium",
      ctaLabel: "Explore",
    },
    {
      src: "/gallery/_DSC6288.jpg",
      alt: "Hot towel shave detail at Family Barber Shop",
      title: "Straight-Razor Detail",
      description: "Classic technique with modern precision.",
      category: "Beard",
      size: "medium",
      ctaLabel: "View Photo",
    },
    {
      src: "/gallery/IMG_0122.JPG",
      alt: "Welcoming barbershop experience with a customer",
      title: "Welcome In",
      description: "The kind of service that keeps families coming back.",
      category: "Family",
      size: "medium",
      ctaLabel: "Explore",
    },
  ] satisfies GalleryItem[],
} as const;

