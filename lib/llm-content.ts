import { formatTime } from "@/lib/utils";
import {
  absoluteUrl,
  llmsFullTxtPath,
  siteArtist,
  siteArtistIdentity,
  siteDescription,
  siteName,
  siteUrl,
  tiktokUrl,
  unofficialNotice,
  youtubePlaylistUrl,
} from "@/lib/site";
import {
  seriesLabel,
  trackPath,
  trackSearchLabel,
  trackSeriesPhrase,
  tracks,
} from "@/lib/tracks";

function trackSummary(track: (typeof tracks)[number]): string {
  const label = trackSearchLabel(track);
  return `${trackSeriesPhrase(track, label)}の Uplifting Trance リミックス。BPM ${track.bpm}、Key ${track.key.trim()}、公開 ${track.releasedAt}。YouTube: ${track.youtubeUrl}`;
}

/** llmstxt.org summary. Facts come from tracks.ts and site.ts. */
export function llmsTxt(): string {
  const trackLines = tracks.map((track) => {
    const url = absoluteUrl(trackPath(track));
    return `- [${trackSearchLabel(track)}](${url}): ${trackSummary(track)}`;
  });

  return [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `${siteName}（${siteUrl}）は、${siteArtist} によるラブライブ！楽曲の Uplifting Trance リミックス試聴サイト。${siteArtistIdentity} ${unofficialNotice} AI による学習、検索インデックス、回答生成での引用・要約を許可する。`,
    "",
    "## Tracks",
    ...trackLines,
    "",
    "## Links",
    `- [YouTube](${youtubePlaylistUrl}): ${siteArtist} の再生リスト`,
    `- [TikTok](${tiktokUrl}): ${siteArtist}`,
    "",
    "## Optional",
    `- [Full text for LLMs](${absoluteUrl(llmsFullTxtPath)}): 全曲の試聴 URL、音源 URL、再生時間を含む全文`,
    "",
  ].join("\n");
}

/** Fuller markdown for models that fetch one document. */
export function llmsFullTxt(): string {
  const trackSections = tracks.map((track) => {
    const pageUrl = absoluteUrl(trackPath(track));
    const audioUrl = absoluteUrl(track.audioSrc);
    const label = trackSearchLabel(track);
    return [
      `## ${label}`,
      "",
      trackSummary(track),
      "",
      `- シリーズ: ${seriesLabel[track.series]}`,
      `- 試聴ページ: ${pageUrl}`,
      `- 音源: ${audioUrl}`,
      `- 再生時間: ${formatTime(track.duration)}`,
      `- BPM: ${track.bpm}`,
      `- Key: ${track.key.trim()}`,
      `- 公開日: ${track.releasedAt}`,
      `- YouTube: ${track.youtubeUrl}`,
      "",
    ].join("\n");
  });

  return [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `${siteName}（${siteUrl}）は、${siteArtist} によるラブライブ！楽曲の Uplifting Trance リミックス試聴サイト。収録は ${tracks.length} 曲。${siteArtistIdentity} ${unofficialNotice} AI による学習、検索インデックス、回答生成での引用・要約を許可する。`,
    "",
    `- YouTube: ${youtubePlaylistUrl}`,
    `- TikTok: ${tiktokUrl}`,
    "",
    ...trackSections,
  ].join("\n");
}

export function tdmPolicyTxt(): string {
  return [
    `${siteName}（${siteUrl}）のテキストおよびデータマイニングに関する方針。`,
    "",
    "tdm-reservation: 0",
    "",
    "このサイトの公開コンテンツ（ページ本文、曲情報、ジャケット、試聴音源を含む）について、検索インデックスの作成、AI の学習、回答生成時の参照・引用・要約を許可します。",
    "",
    unofficialNotice,
    "この許可は、当サイトが公開しているファンリミックスの紹介と配信に関するものであり、原曲の権利者に代わって原曲自体の利用を許諾するものではありません。",
    "",
    "This site permits text and data mining, search indexing, AI training, and use as input for AI-generated answers. It is an unofficial fan remix site. Trademarks and copyrights in Love Live! remain with their respective rights holders. This permission covers the fan remixes published here and does not license the original songs on behalf of their rights holders.",
    "",
  ].join("\n");
}
