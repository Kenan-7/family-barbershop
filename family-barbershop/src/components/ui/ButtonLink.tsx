import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition will-change-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-black hover:bg-brand/90 active:scale-[0.99] shadow-[0_14px_40px_rgba(197,157,95,0.18)] hover:shadow-[0_18px_46px_rgba(197,157,95,0.28)]",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-brand/25 hover:bg-white/10 active:scale-[0.99] hover:shadow-[0_12px_36px_rgba(0,0,0,0.20)]",
  ghost: "text-white/90 hover:text-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (isInternalHref(href)) {
    return (
      <Link
        className={classes}
        href={href}
        {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      rel={props.rel ?? "noopener noreferrer"}
      target={props.target}
      {...props}
    >
      {children}
    </a>
  );
}

