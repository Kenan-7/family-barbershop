import { business } from "@/content/business";

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function parseTimeToMinutes(time: string): number {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
}

function getHoursForDayIndex(dayIndex: number) {
  const label = DAY_LABELS[dayIndex];
  return business.hours.find((entry) => entry.label === label);
}

export type ShopStatus = {
  isOpen: boolean;
  hoursText: string;
  todayLabel: string;
  statusDetail: string;
};

export function getShopStatus(now: Date): ShopStatus {
  const todayIndex = now.getDay();
  const todayLabel = DAY_LABELS[todayIndex];
  const todayHours = getHoursForDayIndex(todayIndex);

  if (!todayHours) {
    return {
      isOpen: false,
      hoursText: "Closed today",
      todayLabel,
      statusDetail: "Check hours for the next available day",
    };
  }

  const [openStr, closeStr] = todayHours.hours.split(/[–-]/).map((part) => part.trim());
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = parseTimeToMinutes(openStr);
  const closeMinutes = parseTimeToMinutes(closeStr);
  const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes;

  if (isOpen) {
    const minutesUntilClose = closeMinutes - nowMinutes;
    return {
      isOpen: true,
      hoursText: todayHours.hours,
      todayLabel,
      statusDetail: `Closes in ${formatDuration(minutesUntilClose)}`,
    };
  }

  if (nowMinutes < openMinutes) {
    const minutesUntilOpen = openMinutes - nowMinutes;
    return {
      isOpen: false,
      hoursText: todayHours.hours,
      todayLabel,
      statusDetail: `Opens in ${formatDuration(minutesUntilOpen)}`,
    };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextIndex = (todayIndex + offset) % 7;
    const nextHours = getHoursForDayIndex(nextIndex);
    if (!nextHours) continue;

    const [nextOpenStr] = nextHours.hours.split(/[–-]/).map((part) => part.trim());
    const dayLabel = offset === 1 ? "tomorrow" : DAY_LABELS[nextIndex];

    return {
      isOpen: false,
      hoursText: todayHours.hours,
      todayLabel,
      statusDetail: `Opens ${dayLabel} at ${nextOpenStr}`,
    };
  }

  return {
    isOpen: false,
    hoursText: todayHours.hours,
    todayLabel,
    statusDetail: "Currently closed",
  };
}
