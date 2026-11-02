import { Award, Code2, HeartHandshake, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Chip } from "@/components/ui/chip";
import type { ExperienceCategory, ExperienceItem } from "@/types/profile";

const CATEGORY_ICONS: Record<ExperienceCategory, typeof Code2> = {
  Technical: Code2,
  Leadership: HeartHandshake,
  Sports: Trophy,
};

/** Achievements and activities, presented as a timeline rather than as employment history. */
export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative space-y-6 before:absolute before:left-[1.1rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-accent-soft/60 before:via-violet/40 before:to-transparent sm:before:left-[1.4rem]">
      {items.map((item, index) => {
        const Icon = CATEGORY_ICONS[item.category] ?? Award;
        return (
          <Reveal key={item.id} delay={index * 0.06}>
            <li className="relative pl-14 sm:pl-16">
              <span className="btn-gradient absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg sm:h-11 sm:w-11">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <article className="glass glass-hover rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className="border-accent-soft/30 text-accent-soft">{item.category}</Chip>
                  {item.period && <span className="text-xs text-subtle">{item.period}</span>}
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
              </article>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}
