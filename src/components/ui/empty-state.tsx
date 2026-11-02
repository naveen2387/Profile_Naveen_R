import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

/** Shown when a section has no real content yet. Never shows placeholder media. */
export function EmptyState({ icon, title, description, children, className }: EmptyStateProps) {
  return (
    <div className={cn("glass relative overflow-hidden rounded-3xl p-8 sm:p-12", className)}>
      <div aria-hidden="true" className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="btn-gradient mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white">
          {icon}
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        {children && <div className="mt-6 w-full text-left">{children}</div>}
      </div>
    </div>
  );
}

export function EmptyStateSteps({ steps }: { steps: { label: string; path: string }[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={step.label} className="flex items-start gap-3 rounded-2xl border border-border bg-background/50 p-4">
          <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-bold text-accent-soft">
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{step.label}</p>
            <code className="mt-1 block break-all font-mono text-xs text-muted">{step.path}</code>
          </div>
        </li>
      ))}
    </ol>
  );
}
