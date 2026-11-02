import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-xs text-accent-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
