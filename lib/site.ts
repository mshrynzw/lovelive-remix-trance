/** Production site origin — used for metadata, sitemap, and robots. */
export const siteUrl = "https://lovelive-trance.com";

export const siteName = "Love Live! Trance";

export const siteArtist = "Kaoru Yuki (Snowdome World)";

/** Legal name. JSON-LD と llms.txt 専用。画面には出さない。 */
export const siteArtistLegalName = "米沢正寛";

export const siteArtistIdentity = `${siteArtist} は${siteArtistLegalName}と同一人物です。`;

export const siteDescription =
  "ラブライブ！の名曲をUplifting Tranceへリミックス。Dancing stars on me!、未来の僕らは知ってるよ、虹色Passions!、START!! True dreams、ユメノトビラ、WATER BLUE NEW WORLD など。Kaoru Yuki (Snowdome World) による試聴サイト。";

export const youtubePlaylistUrl =
  "https://www.youtube.com/playlist?list=PLGTHA_agRTUU";

export const tiktokUrl = "https://www.tiktok.com/@kaoru_yuki_sdw";

/** Footer disclaimer — unofficial fan work. */
export const unofficialNotice =
  "本サイトは非公式のファン制作リミックス作品を紹介するものです。「ラブライブ！」および関連の商標・著作権は各権利者に帰属します。";

export const tdmPolicyPath = "/tdm-policy.txt";

export const llmsTxtPath = "/llms.txt";

export const llmsFullTxtPath = "/llms-full.txt";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${encodeURI(normalized)}`;
}
