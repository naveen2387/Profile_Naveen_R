import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark: "NAVEEN" in white, "R" in the brand gradient. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-sm font-bold tracking-[0.22em] sm:text-base", className)}>
      <span className="text-foreground">NAVEEN</span>{" "}
      <span className="text-gradient">R</span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="NAVEEN R, home" className={cn("inline-flex items-center rounded-lg", className)}>
      <Wordmark />
    </Link>
  );
}
