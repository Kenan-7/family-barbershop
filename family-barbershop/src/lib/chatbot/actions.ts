import { business } from "@/content/business";
import { chatbotConfig } from "@/lib/chatbot/config";
import type { ChatAction } from "@/lib/chatbot/types";

const DEFAULT_ACTIONS: ChatAction[] = [
  { label: "Book Appointment", type: "booking", href: chatbotConfig.bookingHref },
  { label: "Call Shop", type: "phone", href: chatbotConfig.phoneHref },
  { label: "Directions", type: "maps", href: business.mapsUrl },
];

export function ensureDefaultActions(actions?: ChatAction[]): ChatAction[] {
  const merged = [...(actions ?? [])];

  for (const action of DEFAULT_ACTIONS) {
    if (!merged.some((item) => item.label === action.label)) {
      merged.push(action);
    }
  }

  return merged.slice(0, 5);
}
