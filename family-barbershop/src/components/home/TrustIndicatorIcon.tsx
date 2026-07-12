import {
  CalendarDays,
  HeartHandshake,
  Scissors,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { TrustIconKey } from "@/content/business";
import { cn } from "@/lib/cn";

const ICONS: Record<TrustIconKey, LucideIcon> = {
  star: Star,
  "users-round": UsersRound,
  scissors: Scissors,
  "calendar-days": CalendarDays,
  "heart-handshake": HeartHandshake,
};

export function TrustIndicatorIcon({
  icon,
  size = "sm",
  className,
}: {
  icon: TrustIconKey;
  size?: "sm" | "md";
  className?: string;
}) {
  const Icon = ICONS[icon];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-brand/20 bg-black/35 text-brand-2 shadow-[0_0_18px_rgba(197,157,95,0.12)] backdrop-blur-sm",
        size === "sm" ? "h-7 w-7" : "h-9 w-9 sm:h-10 sm:w-10",
        className,
      )}
    >
      <Icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} strokeWidth={1.75} />
    </span>
  );
}
