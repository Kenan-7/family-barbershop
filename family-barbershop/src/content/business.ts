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
};

export type Product = {
  name: string;
  description: string;
  price: string;
  category?: string;
  popular?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export type Testimonial = {
  name: string;
  rating: number; // 1..5
  text: string;
  location?: string;
  featured?: boolean;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export const business = {
  name: "Family Barber Shop",
  tagline: "Clean cuts. Warm service. Family-friendly.",
  siteUrl: "https://familybarbershopusa.com", // TODO: replace if you use a different domain
  phone: "678-395-3129",
  phoneHref: "tel:+16783953129",
  addressLine1: "4750 Alabama Rd #116",
  addressLine2: "Roswell, GA 30075",
  neighborhoodOrArea: "Roswell, GA",
  // TODO: replace with your real Google Maps place link (or embed link on the Contact page)
  mapsUrl:
    "https://www.google.com/maps/place/Family+Barber+Shop/@34.0984296,-84.5780005,36645m/data=!3m1!1e3!4m10!1m2!2m1!1sbarber+shop!3m6!1s0x88f573b15e4b209d:0xb8d813430a3e0996!8m2!3d34.0662981!4d-84.4233375!15sCgtiYXJiZXIgc2hvcFoNIgtiYXJiZXIgc2hvcJIBC2JhcmJlcl9zaG9wmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5UVVJKY1hOcGQyMW5SUkFC4AEA-gEECE4QPQ!16s%2Fg%2F11wx4m9nq1?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=4750%20Alabama%20Rd%20%23116%2C%20Roswell%2C%20GA%2030075&z=15&output=embed", // TODO: replace with your preferred Google Maps embed URL
  // Local SEO: keep this consistent with your real listing (Google Business Profile).
  geo: {
    latitude: 0,
    longitude: 0,
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
  links: {
    bookingUrl:
      "https://book.squareup.com/appointments/dlm0qs4bdxsqfp/location/LFJGMMHS7QE1R/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so",
    instagram: "https://www.instagram.com/familybarbershopusa/",
    facebook: "https://www.facebook.com/thefamily.barbershopusa",
    tiktok: "", // TODO: add your TikTok profile URL
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
    },
    {
      name: "Skin Fade",
      description: "Tight fade blended to skin for a crisp look.",
      price: "From $40",
      duration: "38 min",
      popular: true,
    },
    {
      name: "Beard Trim",
      description: "Shape, line-up, and detail work.",
      price: "$20",
      duration: "20 min",
    },
    {
      name: "Kids Haircut",
      description: "Patient, friendly service for kids.",
      price: "$30",
      duration: "25 min",
    },
    {
      name: "Line Up",
      description: "Sharp edges around hairline and beard.",
      price: "$15",
      duration: "15 min",
    },
    {
      name: "Hot Towel Shave",
      description: "Hot towel, straight-razor finish, and aftercare.",
      price: "$35",
      duration: "30 min",
    },
    {
      name: "Hair Wash & Styling",
      description: "Shampoo, condition, and style for a fresh look.",
      price: "From $15",
      duration: "15 min",
    },
  ] satisfies Service[],
  products: [
    {
      name: "Layrite Super Shine Cream",
      description: "Light hold with high shine for polished styles and a smooth, classic finish.",
      price: "$27",
      category: "Styling",
      popular: true,
      imageSrc: "/gallery/Layrite_Deluxe-Super_Shine_Cream-4_25oz-Front-0046.webp",
      imageAlt: "Layrite Super Shine Cream",
    },
    {
      name: "Layrite Natural Matte Pomade",
      description: "Medium hold with a matte finish for clean texture and natural everyday styling.",
      price: "$27",
      category: "Styling",
      imageSrc: "/gallery/Layrite_Deluxe-Natural_Matte_Pomade-10oz-Front-0024_2048x.webp",
      imageAlt: "Layrite Natural Matte Pomade",
    },
    {
      name: "Layrite Super Hold Pomade",
      description: "Extra hold for structured styles that stay sharp all day with a classic barbershop finish.",
      price: "$27",
      category: "Styling",
      popular: true,
      imageSrc: "/gallery/Layrite_Deluxe-Super_Hold_Pomade-4_25oz-Front-0037_1024x1024@2x.webp",
      imageAlt: "Layrite Super Hold Pomade",
    },
    {
      name: "Layrite Cement Clay",
      description: "High hold and matte texture for modern styles with definition and lasting control.",
      price: "$27",
      category: "Styling",
      imageSrc: "/gallery/Layrite_Deluxe-Cement_Clay-4_25oz-Front-0191_1024x1024@2x.webp",
      imageAlt: "Layrite Cement Clay",
    },
    {
      name: "Beard Oil",
      description: "Softens beard hair and adds a light, healthy shine.",
      price: "$22",
      category: "Beard Care",
      imageSrc: "/gallery/beard_oil_lg_bkg_1024x1024@2x.webp",
      imageAlt: "Beard oil product bottle",
    },
  ] satisfies Product[],
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
  gallery: [
    // Photos live in /public/gallery. Replace these filenames anytime.
    { src: "/gallery/_DSC6236.jpg", alt: "Barber cutting hair at Family Barbershop" },
    { src: "/gallery/_DSC6268.jpg", alt: "Inside Family Barbershop - chairs and stations" },
    { src: "/gallery/_DSC6288.jpg", alt: "Hot towel shave detail at Family Barbershop" },
    { src: "/gallery/_DSC6364.jpg", alt: "Shop interior - clean and modern" },
    { src: "/gallery/_DSC6648.jpg", alt: "In-shop service moment at Family Barbershop" },
    { src: "/gallery/IMG_0447.png", alt: "Kids haircut - family-friendly service" },
  ] satisfies GalleryImage[],
} as const;

