import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-gradient text-white hover:-translate-y-0.5",
  secondary: "glass text-foreground hover:-translate-y-0.5 hover:border-border-strong",
  ghost: "text-muted hover:text-foreground hover:bg-surface",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
}

/** A link styled as a button. Use for navigation only; actions use real <button> elements. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
    VARIANT_CLASSES[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
