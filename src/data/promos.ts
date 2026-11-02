import type { PromoItem } from "@/types/promo";

/**
 * Promotional and motion-graphics reels, kept apart from the educational library.
 *
 * To publish a reel:
 *   1. Copy the MP4 to  public/videos/promos/
 *   2. Copy a thumbnail to  public/thumbnails/promos/
 *   3. Add an entry below.
 *
 * An entry is hidden until its MP4 file exists, so no broken links are shown.
 */
export const promos: PromoItem[] = [
  {
    id: "greezo-promo",
    title: "Greezo Promo",
    description:
      "A 48-second promotional animation with weekly meal plans, pricing cards and a chameleon mascot.",
    durationSeconds: 48,
    videoPath: "/videos/promos/greezo-promo.mp4",
    thumbnailPath: "/thumbnails/promos/greezo-promo.jpg",
  },
  {
    id: "stypp-reel",
    title: "STYPP Reel",
    description:
      "A 48-second motion-graphics reel with a phone mockup of a social post and a marketing tagline.",
    durationSeconds: 48,
    videoPath: "/videos/promos/stypp.mp4",
    thumbnailPath: "/thumbnails/promos/stypp.jpg",
  },
];
