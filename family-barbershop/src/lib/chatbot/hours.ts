import { business } from "@/content/business";
import type { ShopStatus } from "@/lib/chatbot/types";

const TIMEZONE = "America/New_York";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function parseTime12h(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;

  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }

  return hours * 60 + minutes;
}

function parseHoursRange(hours: string): { open: number; close: number } | null {
  const parts = hours.split(/[–-]/).map((part) => part.trim());
  if (parts.length !== 2) return null;

  const open = parseTime12h(parts[0]);
  const close = parseTime12h(parts[1]);
  if (open === null || close === null || close <= open) return null;

  return { open, close };
}

function getZonedParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);

  const dayIndex = DAY_LABELS.indexOf(weekday as (typeof DAY_LABELS)[number]);
  return {
    dayIndex: dayIndex >= 0 ? dayIndex : 1,
    minutes: hour * 60 + minute,
  };
}

export function getShopStatus(now = new Date()): ShopStatus {
  const { dayIndex, minutes } = getZonedParts(now, TIMEZONE);
  const todayLabel = DAY_LABELS[dayIndex];
  const todayEntry = business.hours.find((entry) => entry.label === todayLabel);
  const todayHours = todayEntry?.hours ?? "Hours unavailable";

  const range = todayEntry ? parseHoursRange(todayEntry.hours) : null;
  const isOpen = range ? minutes >= range.open && minutes < range.close : false;

  const detail = isOpen
    ? `Open today until ${todayEntry?.hours.split(/[–-]/)[1]?.trim() ?? "closing"}`
    : `Closed now · Today: ${todayHours}`;

  return {
    isOpen,
    label: isOpen ? "Open Now" : "Closed",
    detail,
    todayHours,
  };
}

export function formatHoursList(): string {
  return business.hours.map((entry) => `${entry.label}: ${entry.hours}`).join("\n");
}
