import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { TrustIndicatorIcon } from "@/components/home/TrustIndicatorIcon";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { cn } from "@/lib/cn";

export function TrustBar({ className }: { className?: string }) {
  return (
    <section
      aria-label="Trust indicators"
      className={cn("relative overflow-hidden border-b border-white/10", className)}
    >
      <SectionAtmosphere variant="trust" particleCount={6} />
      <Container className="relative py-3 sm:py-3.5">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 lg:flex-nowrap lg:gap-2.5">
          {business.trustBar.map((item) => (
            <li
              key={item.label}
              className="w-full min-[420px]:w-[calc(50%-0.25rem)] md:w-auto lg:min-w-0 lg:flex-1"
            >
              <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_28px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:bg-white/[0.07] sm:px-3.5">
                <TrustIndicatorIcon icon={item.icon} size="sm" className="h-8 w-8" />
                <span className="text-xs font-medium leading-none text-white/85 sm:text-[13px]">
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
