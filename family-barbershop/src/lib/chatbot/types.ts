export type ChatActionType = "link" | "phone" | "booking" | "maps" | "products" | "services";

export type ChatAction = {
  label: string;
  type: ChatActionType;
  href: string;
};

export type ChatCardType = "hours" | "directions" | "products" | "services";

export type ChatCard = {
  type: ChatCardType;
};

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  actions?: ChatAction[];
  card?: ChatCard;
  createdAt: number;
  status?: "sending" | "sent" | "error";
};

export type ChatApiMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatApiRequest = {
  messages: ChatApiMessage[];
};

export type ChatApiResponse = {
  message: string;
  actions?: ChatAction[];
  card?: ChatCard;
  source: "ai" | "fallback";
};

export type ShopStatus = {
  isOpen: boolean;
  label: "Open Now" | "Closed";
  detail: string;
  todayHours: string;
};

export type QuickAction = {
  id: string;
  label: string;
  emoji: string;
  message: string;
};
