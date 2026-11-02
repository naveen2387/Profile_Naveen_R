"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { VideoCard } from "@/components/video/video-card";
import { VideoFilters } from "@/components/video/video-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { EMPTY_FILTERS, applyVideoFilters, type VideoFilterState } from "@/lib/video-filters";
import type { AvailableVideo } from "@/lib/catalog";

export function VideoGallery({ videos }: { videos: AvailableVideo[] }) {
  const [filters, setFilters] = useState<VideoFilterState>(EMPTY_FILTERS);
  const results = useMemo(() => applyVideoFilters(videos, filters), [videos, filters]);

  return (
    <div className="space-y-8">
      <VideoFilters
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
        totalCount={videos.length}
        noun="explainer videos"
      />

      {results.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((video) => (
            <li key={video.id} className="h-full">
              <VideoCard video={video} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<SearchX className="h-6 w-6" aria-hidden="true" />}
          title="No videos match these filters"
          description="Try a different class, subject or duration, or clear the filters to see every explainer."
        >
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        </EmptyState>
      )}
    </div>
  );
}
