import {
  absoluteUrl,
  llmsTxtPath,
  siteArtist,
  siteArtistLegalName,
  siteDescription,
  siteName,
  siteUrl,
  tiktokUrl,
  unofficialNotice,
  youtubePlaylistUrl,
} from "@/lib/site";
import {
  seriesLabel,
  tracks,
  trackPath,
  trackSearchLabel,
  trackSeriesPhrase,
  type Track,
} from "@/lib/tracks";

function artistJsonLd() {
  return {
    "@type": "Person" as const,
    name: siteArtist,
    alternateName: siteArtistLegalName,
    sameAs: [youtubePlaylistUrl, tiktokUrl],
  };
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
    isAccessibleForFree: true,
    usageInfo: absoluteUrl(llmsTxtPath),
    copyrightNotice: unofficialNotice,
    publisher: artistJsonLd(),
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
    isAccessibleForFree: true,
    copyrightNotice: unofficialNotice,
    byArtist: artistJsonLd(),
    numTracks: tracks.length,
    track: tracks.map((track) => musicRecordingJsonLd(track, track.index)),
  };
}

export function musicRecordingJsonLd(track: Track, position?: number) {
  const url = absoluteUrl(trackPath(track));
  return {
    "@type": "MusicRecording",
    name: track.title,
    alternateName: track.titleEn,
    url,
    contentUrl: absoluteUrl(track.audioSrc),
    encodingFormat: "audio/mp4",
    isAccessibleForFree: true,
    copyrightNotice: unofficialNotice,
    duration: `PT${Math.floor(track.duration / 60)}M${track.duration % 60}S`,
    datePublished: track.releasedAt,
    image: absoluteUrl(track.cover),
    genre: "Uplifting Trance",
    byArtist: artistJsonLd(),
    additionalProperty: [
      { "@type": "PropertyValue", name: "BPM", value: track.bpm },
      { "@type": "PropertyValue", name: "Key", value: track.key.trim() },
    ],
    about: {
      "@type": "MusicComposition",
      name: track.title,
      alternateName: track.titleEn,
      isPartOf: {
        "@type": "CreativeWorkSeries",
        name: seriesLabel[track.series],
      },
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

export function breadcrumbJsonLd(track: Track) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteName,
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: track.title,
        item: absoluteUrl(trackPath(track)),
      },
    ],
  };
}

export function faqPageJsonLd() {
  const titles = tracks
    .map(
      (track) =>
        `${trackSearchLabel(track)}（${seriesLabel[track.series]}、BPM ${track.bpm}）`
    )
    .join("、");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Love Live! Trance とは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${siteDescription} ${unofficialNotice}`,
        },
      },
      {
        "@type": "Question",
        name: "誰が制作していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${siteArtist}。YouTube: ${youtubePlaylistUrl} TikTok: ${tiktokUrl}`,
        },
      },
      {
        "@type": "Question",
        name: "公式サイトですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: unofficialNotice,
        },
      },
      {
        "@type": "Question",
        name: "どこで聴けますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${siteUrl} で試聴できます。YouTube 再生リスト: ${youtubePlaylistUrl}`,
        },
      },
      {
        "@type": "Question",
        name: "収録曲は何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: titles,
        },
      },
    ],
  };
}

export function trackFaqJsonLd(track: Track) {
  const url = absoluteUrl(trackPath(track));
  const label = trackSearchLabel(track);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${label} の Uplifting Trance リミックスはどこで試聴できますか？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${trackSeriesPhrase(track, label)}の Uplifting Trance リミックス by ${siteArtist}。${url} で試聴でき、YouTube は ${track.youtubeUrl}。BPM ${track.bpm} / ${track.subtitle}。`,
        },
      },
    ],
  };
}
