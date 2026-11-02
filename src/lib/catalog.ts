import { videos as allVideos } from "@/data/videos";
import { projects as allProjects } from "@/data/projects";
import { promos as allPromos } from "@/data/promos";
import type { ProjectItem } from "@/types/project";
import type { PromoItem } from "@/types/promo";
import type { VideoItem, VideoType } from "@/types/video";
import { publicFileExists } from "@/lib/assets";

/**
 * Server-only catalogue access. Filters out any entry whose media file is missing,
 * so the UI never shows a video, thumbnail or screenshot that does not exist.
 */

export interface AvailableVideo extends VideoItem {
  thumbnailAvailable: boolean;
}

export function getAvailableVideos(type: VideoType): AvailableVideo[] {
  return allVideos
    .filter((video) => video.videoType === type && publicFileExists(video.videoPath))
    .map((video) => ({
      ...video,
      thumbnailAvailable: publicFileExists(video.thumbnailPath),
    }))
    .sort((a, b) => b.creationDate.localeCompare(a.creationDate));
}

export function getAvailableVideo(id: string, type: VideoType): AvailableVideo | undefined {
  return getAvailableVideos(type).find((video) => video.id === id);
}

export interface AvailablePromo extends PromoItem {
  thumbnailAvailable: boolean;
}

export function getAvailablePromos(): AvailablePromo[] {
  return allPromos
    .filter((promo) => publicFileExists(promo.videoPath))
    .map((promo) => ({
      ...promo,
      thumbnailAvailable: publicFileExists(promo.thumbnailPath),
    }));
}

export interface ProjectCardData extends ProjectItem {
  thumbnailAvailable: boolean;
}

export function getProjects(): ProjectCardData[] {
  return allProjects.map((project) => ({
    ...project,
    thumbnailAvailable: publicFileExists(project.thumbnailPath),
  }));
}

export function getProject(slug: string): ProjectItem | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function getProjectMedia(project: ProjectItem) {
  return {
    thumbnailAvailable: publicFileExists(project.thumbnailPath),
    screenshots: project.screenshots.filter((shot) => publicFileExists(shot.path)),
  };
}
