import { cn } from "@/lib/cn";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cn("h-4 w-4", filled ? "text-brand" : "text-white/20")}
      fill="currentColor"
    >
      <path d="M10 15.27l-5.18 2.73 1-5.8L1.64 7.98l5.82-.84L10 1.9l2.54 5.24 5.82.84-4.18 4.22 1 5.8L10 15.27z" />
    </svg>
  );
}

export function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${r} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < r} />
      ))}
    </div>
  );
}

