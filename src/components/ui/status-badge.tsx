import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

const STATUS_STYLES: Record<ProjectStatus, { label: string; dot: string; text: string; border: string }> = {
  completed: {
    label: "Completed",
    dot: "bg-success",
    text: "text-success",
    border: "border-success/30 bg-success/10",
  },
  experimental: {
    label: "Experimental",
    dot: "bg-warning",
    text: "text-warning",
    border: "border-warning/30 bg-warning/10",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-accent-soft",
    text: "text-accent-soft",
    border: "border-accent-soft/30 bg-accent/10",
  },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        style.border,
        style.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {style.label}
    </span>
  );
}

export const STATUS_DESCRIPTIONS: Record<ProjectStatus, string> = {
  completed: "Built and working end to end.",
  experimental: "Exploratory work used to test ideas and models.",
  "in-progress": "Under active development.",
};
