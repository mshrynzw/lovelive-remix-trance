import { siteArtist, siteName, siteUrl } from "@/lib/site";
import { tracks, trackPath, type Track } from "@/lib/tracks";

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "ja",
    description:
      "ラブライブ！楽曲の Uplifting Trance リミックスを試聴できる非公式ファンサイト。",
    publisher: {
      "@type": "Person",
      name: siteArtist,
    },
  };
}

export function musicAlbumJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: siteName,
    url: siteUrl,
    inLanguage: "ja",
    description:
      "ラブライブ！の名曲を Uplifting Trance へとリミックスしたアルバム。",
    genre: ["Trance", "Uplifting Trance", "Anison Remix"],
    image: absoluteUrl("/images/hero.webp"),
    byArtist: {
      "@type": "Person",
      name: siteArtist,
    },
    numTracks: tracks.length,
    track: tracks.map((track, i) => musicRecordingJsonLd(track, i + 1)),
  };
}

export function musicRecordingJsonLd(track: Track, position?: number) {
  const url = absoluteUrl(trackPath(track));
  return {
    "@type": "MusicRecording",
    name: track.title,
    alternateName: track.titleEn,
    url,
    duration: `PT${Math.floor(track.duration / 60)}M${track.duration % 60}S`,
    datePublished: track.releasedAt,
    image: absoluteUrl(track.cover),
    genre: "Uplifting Trance",
    byArtist: {
      "@type": "Person",
      name: siteArtist,
    },
    inAlbum: {
      "@type": "MusicAlbum",
      name: siteName,
      url: siteUrl,
    },
    ...(position != null ? { position } : {}),
    sameAs: [track.youtubeUrl],
  };
}

export function trackPageJsonLd(track: Track) {
  return {
    "@context": "https://schema.org",
    ...musicRecordingJsonLd(track, track.index),
  };
}
