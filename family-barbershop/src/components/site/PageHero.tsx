import { Container } from "@/components/site/Container";
import { cn } from "@/lib/cn";

export function PageHero({
  title,
  description,
  eyebrow,
  children,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-glow border-b border-white/10", className)}>
      <Container className="py-14 sm:py-18">
        {eyebrow ? (
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.20em] text-brand/90">
            <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </Container>
    </section>
  );
}

