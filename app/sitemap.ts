import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { tracks, trackPath } from "@/lib/tracks";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestRelease = tracks.reduce((latest, track) =>
    track.releasedAt > latest ? track.releasedAt : latest
  , tracks[0]?.releasedAt ?? "2026-05-11");

  return [
    {
      url: siteUrl,
      lastModified: latestRelease,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tracks.map((track) => ({
      url: `${siteUrl}${trackPath(track)}`,
      lastModified: track.releasedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
