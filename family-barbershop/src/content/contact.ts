import { business } from "@/content/business";

export const contactPage = {
  eyebrow: "CONTACT & BOOKING",
  headline: "Let's Get You Looking Sharp.",
  headlineAccent: "Book, call, or stop by.",
  description:
    "Reach out with a question, book online, or visit Family Barber Shop in Roswell. Walk-ins are welcome when availability allows.",
  backgroundWord: "CONTACT",
  trustChips: [
    "Open 7 Days",
    "Walk-ins Welcome",
    "Free Parking",
    "Family Friendly",
    "5.0 Google Rating",
  ],
  form: {
    title: "Send a message",
    description: "Share your preferred service and timing — we'll follow up during business hours.",
    submitLabel: "Send Message",
    successTitle: "Thanks — we received your message.",
    successDescription: (phone: string) =>
      `We'll get back to you during business hours. For immediate help, call ${phone}.`,
    callAction: "Call Shop",
    bookAction: "Book Appointment",
  },
  map: {
    title: "Visit the shop",
    copyLabel: "Copy Address",
    copiedLabel: "Copied",
    directionsLabel: "Open in Google Maps",
    badges: ["Free Parking", "Walk-ins Welcome"],
  },
  hours: {
    title: "Hours",
    viewFullLabel: "View full business hours",
    hideFullLabel: "Hide full schedule",
  },
  quickActions: {
    title: "Quick actions",
  },
  social: {
    title: "Follow us",
  },
} as const;

export const preferredDayOptions = [
  { value: "", label: "Select a day (optional)" },
  { value: "flexible", label: "Flexible" },
  ...business.hours.map((entry) => ({
    value: entry.label.toLowerCase(),
    label: entry.label,
  })),
] as const;

export const preferredTimeOptions = [
  { value: "", label: "Select a time (optional)" },
  { value: "morning", label: "Morning (before 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 4 PM)" },
  { value: "evening", label: "Evening (after 4 PM)" },
  { value: "asap", label: "As soon as possible" },
] as const;

export function getServiceOptions() {
  return [
    { value: "", label: "Select a service (optional)" },
    ...business.services.map((service) => ({
      value: service.name,
      label: `${service.name} — ${service.price}`,
    })),
  ];
}

export function getSocialLinks() {
  const links = [
    {
      key: "instagram" as const,
      label: "Instagram",
      href: business.links.instagram,
    },
    {
      key: "facebook" as const,
      label: "Facebook",
      href: business.links.facebook,
    },
    {
      key: "googleReviews" as const,
      label: "Google Reviews",
      href: business.links.googleReviews,
    },
    {
      key: "yelp" as const,
      label: "Yelp",
      href: business.links.yelp,
    },
    {
      key: "tiktok" as const,
      label: "TikTok",
      href: business.links.tiktok,
    },
  ];

  return links.filter((link) => Boolean(link.href));
}

export function getFullAddress() {
  return `${business.addressLine1}, ${business.addressLine2}`;
}
