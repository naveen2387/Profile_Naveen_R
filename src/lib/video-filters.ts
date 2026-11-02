import type { ClassLevel, DurationRange, VideoSubject } from "@/types/video";

/** Shared between server and client: pure functions, no file-system access. */

export const CLASS_LEVELS: ClassLevel[] = [6, 7, 8, 9, 10];

export const SUBJECTS: VideoSubject[] = ["Science", "Mathematics", "Social Science", "English"];

export const DURATION_OPTIONS: { value: DurationRange; label: string }[] = [
  { value: "any", label: "Any length" },
  { value: "60-90s", label: "60–90 seconds" },
  { value: "2-3min", label: "2–3 minutes" },
];

export interface VideoFilterState {
  query: string;
  classLevel: ClassLevel | "all";
  subject: VideoSubject | "all";
  duration: DurationRange;
}

export const EMPTY_FILTERS: VideoFilterState = {
  query: "",
  classLevel: "all",
  subject: "all",
  duration: "any",
};

export function matchesDuration(durationSeconds: number, range: DurationRange): boolean {
  if (range === "60-90s") return durationSeconds >= 60 && durationSeconds <= 90;
  if (range === "2-3min") return durationSeconds >= 120 && durationSeconds <= 180;
  return true;
}

export function hasActiveFilters(filters: VideoFilterState): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.classLevel !== "all" ||
    filters.subject !== "all" ||
    filters.duration !== "any"
  );
}

export function applyVideoFilters<
  T extends {
    title: string;
    concept: string;
    description: string;
    classLevel: ClassLevel;
    subject: VideoSubject;
    durationSeconds: number;
  },
>(items: T[], filters: VideoFilterState): T[] {
  const query = filters.query.trim().toLowerCase();
  return items.filter((item) => {
    if (filters.classLevel !== "all" && item.classLevel !== filters.classLevel) return false;
    if (filters.subject !== "all" && item.subject !== filters.subject) return false;
    if (!matchesDuration(item.durationSeconds, filters.duration)) return false;
    if (query) {
      const haystack = `${item.title} ${item.concept} ${item.description} ${item.subject}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}
