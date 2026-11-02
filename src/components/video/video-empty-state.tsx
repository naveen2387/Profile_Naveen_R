import { Film } from "lucide-react";
import { EmptyState, EmptyStateSteps } from "@/components/ui/empty-state";
import type { VideoType } from "@/types/video";

const COPY: Record<VideoType, { title: string; folder: string; thumbs: string; noun: string; icon: typeof Film }> = {
  explainer: {
    title: "No explainer videos are published yet",
    folder: "public/videos/explainers/",
    thumbs: "public/thumbnails/explainers/",
    noun: "explainer",
    icon: Film,
  },
};

/** Empty state for a video library with no media files present. Explains exactly how to add one. */
export function VideoEmptyState({ type }: { type: VideoType }) {
  const copy = COPY[type];
  const Icon = copy.icon;

  return (
    <EmptyState
      icon={<Icon className="h-6 w-6" aria-hidden="true" />}
      title={copy.title}
      description={`Each ${copy.noun} appears here automatically once its MP4 file exists. Nothing is shown before then, so no broken links or placeholder videos are displayed.`}
    >
      <EmptyStateSteps
        steps={[
          { label: `Copy the MP4 file into the ${copy.noun} videos folder`, path: copy.folder },
          { label: "Add a thumbnail image (optional)", path: copy.thumbs },
          { label: "Add its metadata entry to the central catalogue", path: "src/data/videos.ts" },
        ]}
      />
    </EmptyState>
  );
}
