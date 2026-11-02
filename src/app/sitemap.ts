import type { MetadataRoute } from "next";
import { getAvailableVideos, getProjects } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/videos", "/promos", "/projects", "/skills", "/workflow", "/about", "/contact"].map(
    (path) => ({ url: `${SITE.url}${path}`, lastModified }),
  );

  const projectRoutes = getProjects().map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified,
  }));

  const videoRoutes = getAvailableVideos("explainer").map((video) => ({
    url: `${SITE.url}/videos/${video.id}`,
    lastModified,
  }));

  return [...staticRoutes, ...projectRoutes, ...videoRoutes];
}
