import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <div className={cn("max-w-3xl space-y-4", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
          <span className="h-px w-6 bg-gradient-to-r from-accent-soft to-violet" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading id={id} className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description && <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
