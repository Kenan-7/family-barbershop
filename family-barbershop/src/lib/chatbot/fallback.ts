import { business } from "@/content/business";
import { ensureDefaultActions } from "@/lib/chatbot/actions";
import { chatbotConfig } from "@/lib/chatbot/config";
import { getShopStatus } from "@/lib/chatbot/hours";
import type { ChatAction, ChatApiResponse, ChatCard } from "@/lib/chatbot/types";

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function withResponse(
  message: string,
  actions: ChatAction[],
  card?: ChatCard,
): ChatApiResponse {
  return {
    message,
    actions: ensureDefaultActions(actions),
    card,
    source: "fallback",
  };
}

function servicesResponse(): ChatApiResponse {
  return withResponse(
    "Here's what we offer — clean cuts, sharp fades, and beard work done right. Walk-ins are welcome when we have availability.",
    [
      { label: "View Services", type: "services", href: "/services" },
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
    ],
    { type: "services" },
  );
}

function haircutResponse(): ChatApiResponse {
  const haircut = business.services.find((s) => s.name === "Haircut");
  const fade = business.services.find((s) => s.name === "Skin Fade");
  const kids = business.services.find((s) => s.name.toLowerCase().includes("kids"));

  return withResponse(
    `Classic haircuts start at ${haircut?.price ?? "$35"}. Skin fades from ${fade?.price ?? "$40"}, and kids cuts are ${kids?.price ?? "$30"}. Every cut gets the same attention to detail.`,
    [
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
      { label: "View Services", type: "services", href: "/services" },
    ],
    { type: "services" },
  );
}

function beardResponse(): ChatApiResponse {
  const beard = business.services.find((s) => s.name === "Beard Trim");
  const shave = business.services.find((s) => s.name === "Hot Towel Shave");

  return withResponse(
    `Beard trims are ${beard?.price ?? "$20"} — shape, line-up, and detail work. Hot towel shaves are ${shave?.price ?? "$35"} if you want the full experience.`,
    [
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
      { label: "View Services", type: "services", href: "/services" },
    ],
    { type: "services" },
  );
}

function hoursResponse(): ChatApiResponse {
  const status = getShopStatus();
  return withResponse(
    status.isOpen
      ? `We're open right now. ${status.detail}`
      : `We're closed at the moment. ${status.detail}`,
    [
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
      { label: "Get Directions", type: "maps", href: business.mapsUrl },
    ],
    { type: "hours" },
  );
}

function bookingResponse(): ChatApiResponse {
  return withResponse(
    "Book online for your preferred time, or give us a call. I can't check live availability here — the booking page will show open slots.",
    [
      { label: "View Available Times", type: "booking", href: chatbotConfig.bookingHref },
      { label: `Call ${business.phone}`, type: "phone", href: business.phoneHref },
    ],
  );
}

function directionsResponse(): ChatApiResponse {
  return withResponse(
    `Find us at ${business.addressLine1}, ${business.addressLine2}. Free parking right at the shop.`,
    [
      { label: "Open Google Maps", type: "maps", href: business.mapsUrl },
      { label: "Copy Address", type: "link", href: business.mapsUrl },
    ],
    { type: "directions" },
  );
}

function walkInResponse(): ChatApiResponse {
  const faq = business.servicesPage.faq.find((item) =>
    item.question.toLowerCase().includes("walk-in"),
  );
  return withResponse(
    faq?.answer ??
      "Walk-ins are welcome when we have a chair open. For your preferred barber or time, booking ahead is the move.",
    [
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
      { label: `Call ${business.phone}`, type: "phone", href: business.phoneHref },
    ],
  );
}

function productsResponse(): ChatApiResponse {
  return withResponse(
    `We stock professional products our barbers actually use — matte clays, pomades, beard care, and more. Ask in the chair for a recommendation tailored to your hair.`,
    [
      { label: "View Products", type: "products", href: "/products" },
      { label: "Ask In Shop", type: "link", href: "/contact" },
    ],
    { type: "products" },
  );
}

function phoneResponse(): ChatApiResponse {
  return withResponse(
    `Reach us at ${business.phone}. Happy to help with appointments, walk-ins, or any questions.`,
    [{ label: `Call ${business.phone}`, type: "phone", href: business.phoneHref }],
  );
}

function kidsResponse(): ChatApiResponse {
  const kids = business.services.find((s) => s.name.toLowerCase().includes("kids"));
  return withResponse(
    `We're family-friendly — kids are always welcome. ${kids ? `Kids haircuts are ${kids.price} (${kids.duration}).` : ""} Our barbers are patient and great with little ones.`,
    [
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
      { label: "View Services", type: "services", href: "/services" },
    ],
    { type: "services" },
  );
}

function medicalGuardResponse(): ChatApiResponse {
  return withResponse(
    "I can't advise on scalp, skin, or hair conditions — that's best handled in person. Speak with one of our barbers or call the shop and we'll point you in the right direction.",
    [
      { label: `Call ${business.phone}`, type: "phone", href: business.phoneHref },
      { label: "Contact Us", type: "link", href: "/contact" },
    ],
  );
}

function defaultResponse(): ChatApiResponse {
  return withResponse(
    "I can help with haircuts, pricing, hours, directions, products, and booking. What do you need?",
    [
      { label: "View Services", type: "services", href: "/services" },
      { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
    ],
  );
}

export function getFallbackResponse(userMessage: string): ChatApiResponse {
  const text = userMessage.toLowerCase();

  if (
    includesAny(text, [
      "medical",
      "dermat",
      "scalp condition",
      "skin condition",
      "hair loss",
      "alopecia",
      "infection",
      "rash",
      "prescription",
      "doctor",
    ])
  ) {
    return medicalGuardResponse();
  }

  if (includesAny(text, ["open", "hours", "close", "closing", "today", "business hours"])) {
    return hoursResponse();
  }

  if (includesAny(text, ["beard trim", "beard", "shave", "hot towel"])) {
    if (!includesAny(text, ["product", "oil"])) return beardResponse();
  }

  if (includesAny(text, ["haircut", "fade", "cut", "kids haircut", "kids cut"])) {
    return haircutResponse();
  }

  if (includesAny(text, ["price", "cost", "pricing", "how much", "service"])) {
    return servicesResponse();
  }

  if (includesAny(text, ["book", "appointment", "schedule", "reserve", "availability"])) {
    return bookingResponse();
  }

  if (includesAny(text, ["address", "direction", "location", "where", "map", "parking"])) {
    return directionsResponse();
  }

  if (includesAny(text, ["walk in", "walk-in", "walkin"])) {
    return walkInResponse();
  }

  if (includesAny(text, ["product", "pomade", "clay", "oil", "styling", "layrite"])) {
    return productsResponse();
  }

  if (includesAny(text, ["phone", "call", "number", "reach"])) {
    return phoneResponse();
  }

  if (includesAny(text, ["kid", "child", "children", "son", "family"])) {
    return kidsResponse();
  }

  return defaultResponse();
}

export function parseAiJson(content: string): ChatApiResponse | null {
  try {
    const parsed = JSON.parse(content) as {
      message?: unknown;
      actions?: unknown;
      card?: unknown;
    };

    if (typeof parsed.message !== "string" || !parsed.message.trim()) return null;

    const actions = Array.isArray(parsed.actions)
      ? parsed.actions
          .map((action) => {
            if (!action || typeof action !== "object") return null;
            const label = (action as ChatAction).label;
            const type = (action as ChatAction).type;
            const href = (action as ChatAction).href;
            if (typeof label !== "string" || typeof href !== "string") return null;
            if (
              type !== "link" &&
              type !== "phone" &&
              type !== "booking" &&
              type !== "maps" &&
              type !== "products" &&
              type !== "services"
            ) {
              return null;
            }
            return { label, type, href };
          })
          .filter((action): action is ChatAction => action !== null)
          .slice(0, 5)
      : undefined;

    let card: ChatCard | undefined;
    if (
      parsed.card &&
      typeof parsed.card === "object" &&
      typeof (parsed.card as ChatCard).type === "string"
    ) {
      const type = (parsed.card as ChatCard).type;
      if (
        type === "hours" ||
        type === "directions" ||
        type === "products" ||
        type === "services"
      ) {
        card = { type };
      }
    }

    return {
      message: parsed.message.trim(),
      actions: ensureDefaultActions(actions),
      card,
      source: "ai",
    };
  } catch {
    return null;
  }
}
