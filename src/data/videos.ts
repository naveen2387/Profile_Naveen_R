import type { VideoItem } from "@/types/video";

/**
 * Central video catalogue: the only place video metadata lives.
 *
 * To publish a video:
 *   1. Copy the MP4 to  public/videos/explainers/
 *   2. Copy a thumbnail to  public/thumbnails/explainers/
 *   3. Add an entry below.
 *
 * An entry is hidden automatically until its MP4 file exists, so no broken links are shown.
 * While no entry has a file, the site shows an empty state instead.
 *
 * Example entry:
 * {
 *   id: "photosynthesis-explained",
 *   title: "Photosynthesis Explained",
 *   description: "How plants turn light, water and carbon dioxide into food.",
 *   classLevel: 7,
 *   subject: "Science",
 *   concept: "Photosynthesis",
 *   durationSeconds: 150,
 *   videoType: "explainer",
 *   videoPath: "/videos/explainers/photosynthesis-explained.mp4",
 *   thumbnailPath: "/thumbnails/explainers/photosynthesis-explained.jpg",
 *   language: "English",
 *   creationDate: "2026-01-15",
 * },
 */
export const videos: VideoItem[] = [
  {
    id: "newtons-laws-of-motion",
    title: "Newton's Laws of Motion",
    description:
      "An animated explainer on Newton's three laws of motion, using a moving bus to show steady speed and inertia.",
    classLevel: 9,
    subject: "Science",
    concept: "Newton's Laws of Motion",
    durationSeconds: 128,
    videoType: "explainer",
    videoPath: "/videos/explainers/newtons-laws-of-motion.mp4",
    thumbnailPath: "/thumbnails/explainers/newtons-laws-of-motion.jpg",
    language: "English",
    creationDate: "2026-11-02",
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis",
    description:
      "An animated explainer on how a leaf uses sunlight, carbon dioxide and water to make glucose and release oxygen.",
    classLevel: 7,
    subject: "Science",
    concept: "Photosynthesis",
    durationSeconds: 84,
    videoType: "explainer",
    videoPath: "/videos/explainers/photosynthesis.mp4",
    thumbnailPath: "/thumbnails/explainers/photosynthesis.jpg",
    language: "English",
    creationDate: "2026-11-02",
  },
];
