import { business } from "@/content/business";
import type { QuickAction } from "@/lib/chatbot/types";

/**
 * Chatbot UI copy and quick actions.
 * Phone, address, hours, and links are sourced from business.ts — not duplicated here.
 */
export const chatbotConfig = {
  launcherLabel: "Ask Family Barber",
  launcherSymbol: "✦",
  title: "Family Barber Assistant",
  subtitle: "Ask about services, products, booking and hours",
  welcomeGreeting: "👋 Welcome to Family Barber Shop",
  welcomeMessage: "How can I help today?",
  inactivityTooltip: "Need help choosing a service?",
  typingLabel: "Family Barber Assistant is typing",
  privacyNotice:
    "Please avoid sharing sensitive personal information. Messages are used only to assist you during this visit and are not stored permanently.",
  inputPlaceholder: "Ask about haircuts, pricing, booking...",
  offlineMessage:
    "I'm having a little trouble connecting right now. Give us a call or book online — we'll take care of you.",
  errorMessage:
    "Something went wrong on my end. Call the shop or try again in a moment.",
  maxMessageLength: 500,
  maxHistoryMessages: 10,
  inactivityDelayMs: 20_000,
  tooltipDismissKey: "fbs-chat-tooltip-dismissed",
  logoSrc: "/logo.png",
  logoAlt: `${business.name} logo`,
  get bookingHref() {
    return business.links.bookingUrl || "/contact";
  },
  get phone() {
    return business.phone;
  },
  get phoneHref() {
    return business.phoneHref;
  },
  get mapsUrl() {
    return business.mapsUrl;
  },
  quickActions: [
    {
      id: "haircuts",
      label: "Haircuts",
      emoji: "✂",
      message: "What haircut services do you offer and what are the prices?",
    },
    {
      id: "beard",
      label: "Beard Trim",
      emoji: "💈",
      message: "Tell me about beard trim services and pricing.",
    },
    {
      id: "pricing",
      label: "Pricing",
      emoji: "⭐",
      message: "What are your service prices?",
    },
    {
      id: "directions",
      label: "Directions",
      emoji: "📍",
      message: "What is your address and how do I get there?",
    },
    {
      id: "booking",
      label: "Book Appointment",
      emoji: "📅",
      message: "How do I book an appointment?",
    },
    {
      id: "products",
      label: "Products",
      emoji: "🧴",
      message: "What grooming products do you carry in the shop?",
    },
    {
      id: "call",
      label: "Call Shop",
      emoji: "☎",
      message: "What is your phone number?",
    },
    {
      id: "hours",
      label: "Business Hours",
      emoji: "🕒",
      message: "Are you open right now? What are your business hours?",
    },
  ] satisfies QuickAction[],
} as const;
