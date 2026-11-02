export type VideoType = "explainer";

export type VideoSubject = "Science" | "Mathematics" | "Social Science" | "English";

export type ClassLevel = 6 | 7 | 8 | 9 | 10;

export type DurationRange = "any" | "60-90s" | "2-3min";

/**
 * One educational video. Paths are relative to /public and must point at real files:
 * entries whose MP4 is missing are hidden automatically (see src/lib/videos.ts).
 */
export interface VideoItem {
  /** Unique, URL-safe identifier. Used for /videos/[id]. */
  id: string;
  title: string;
  description: string;
  classLevel: ClassLevel;
  subject: VideoSubject;
  /** The specific concept the video teaches, e.g. "Photosynthesis". */
  concept: string;
  durationSeconds: number;
  videoType: VideoType;
  /** e.g. "/videos/explainers/photosynthesis.mp4" */
  videoPath: string;
  /** e.g. "/thumbnails/explainers/photosynthesis.jpg" (optional file; a placeholder is shown if missing) */
  thumbnailPath: string;
  language: string;
  /** ISO date, YYYY-MM-DD */
  creationDate: string;
}
