import type { MetadataRoute } from "next";
import { projects } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://muahx.art";

  const pages = [
    "",
    "/digital-art",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectPages = projects.map((p) => ({
    url: `${siteUrl}/digital-art/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...pages, ...projectPages];
}