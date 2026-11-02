/** A promotional or motion-graphics reel. Kept apart from the educational video library. */
export interface PromoItem {
  id: string;
  title: string;
  description: string;
  durationSeconds: number;
  videoPath: string;
  thumbnailPath: string;
}
