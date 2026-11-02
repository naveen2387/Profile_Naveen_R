"use client";

import { VideoCard } from "@/components/video/video-card";
import type { AvailableVideo } from "@/lib/catalog";

export function VideoGallery({ videos }: { videos: AvailableVideo[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <li key={video.id} className="h-full">
          <VideoCard video={video} />
        </li>
      ))}
    </ul>
  );
}
