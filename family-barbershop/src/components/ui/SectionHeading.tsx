import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow ? (
        <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.20em] text-brand/90">
          <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-white/70">{description}</p>
      ) : null}
    </div>
  );
}

