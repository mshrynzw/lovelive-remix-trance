export type LoveLiveSeries =
  | "muse"
  | "sunshine"
  | "nijigasaki"
  | "superstar"
  | "hasunosora";

export const seriesLabel: Record<LoveLiveSeries, string> = {
  muse: "ラブライブ！",
  sunshine: "ラブライブ！サンシャイン!!",
  nijigasaki: "ラブライブ！虹ヶ咲学園スクールアイドル同好会",
  superstar: "ラブライブ！スーパースター!!",
  hasunosora: "ラブライブ！蓮ノ空女学院スクールアイドルクラブ",
};

export type Track = {
  id: string;
  /** URL segment under /tracks/[slug] */
  slug: string;
  index: number;
  series: LoveLiveSeries;
  /** Display / primary title (prefer Japanese when that is how fans search) */
  title: string;
  /** English or romanized form when different from title — used in metadata */
  titleEn?: string;
  subtitle: string;
  bpm: number;
  key: string;
  duration: number; // seconds
  youtubeUrl: string;
  /** ISO date (YYYY-MM-DD) of the mix / release — sitemap & JSON-LD */
  releasedAt: string;
  /**
   * Path under /public/audio. Placeholder file names — drop your own
   * mp3/ogg masters into public/audio/ using these exact file names,
   * or edit the paths below to match your files.
   */
  audioSrc: string;
  cover: string;
};

export const tracks: Track[] = [
  {
    id: "track-01",
    slug: "dancing-stars-on-me",
    index: 1,
    series: "muse",
    title: "Dancing stars on me!",
    subtitle: "(Uplifting Trance 20260511 mix)",
    bpm: 137,
    key: "C# -> A",
    duration: 372,
    youtubeUrl: "https://www.youtube.com/watch?v=SoCiVmTeQ_E",
    releasedAt: "2026-05-11",
    audioSrc: "/audio/260511_Dancing_stars_on_me_(Uplifting Trance 20260511 mix).m4a",
    cover: "/images/Jacket_hp_Dancing_stars_on_me_(Uplifting Trance mix 20260511 mix).webp",
  },
  {
    id: "track-02",
    slug: "mirai-no-bokura-wa-shitteru-yo",
    index: 2,
    series: "sunshine",
    title: "未来の僕らは知ってるよ",
    titleEn: "Mirai no Bokura wa Shitteru yo",
    subtitle: "(Uplifting Trance 20260603 mix)",
    bpm: 140,
    key: "Ab ",
    duration: 477,
    youtubeUrl: "https://www.youtube.com/watch?v=KvYeikMzMj8",
    releasedAt: "2026-06-03",
    audioSrc: "/audio/260603_未来の僕らは知ってるよ_(Uplifting Trance 20260603 mix).m4a",
    cover: "/images/Jacket_hp未来の僕らは知ってるよ_(Uplifting Trance 20260603 mix).webp",
  },
  {
    id: "track-03",
    slug: "nijiiro-passions",
    index: 3,
    series: "nijigasaki",
    title: "虹色Passions!",
    titleEn: "Nijiiro Passions!",
    subtitle: "(Uplifting Trance 20260620 mix)",
    bpm: 138,
    key: "G",
    duration: 454,
    youtubeUrl: "https://www.youtube.com/watch?v=4y27yCoDEds",
    releasedAt: "2026-06-20",
    audioSrc: "/audio/260620_虹色Passions！(Uplifting Trance 20260620 mix).m4a",
    cover: "/images/Jacket_hp_虹色Passions！(Uplifting Trance 20260620 mix).webp",
  },
  {
    id: "track-04",
    slug: "start-true-dreams",
    index: 4,
    series: "superstar",
    title: "START!! True dreams",
    subtitle: "(Uplifting Trance 20260706 mix)",
    bpm: 138,
    key: "F",
    duration: 458,
    youtubeUrl: "https://www.youtube.com/watch?v=fZU6xXjdhpw",
    releasedAt: "2026-07-06",
    audioSrc: "/audio/260706_START!! True dreams (Uplifting Trance 20260706 mix).m4a",
    cover: "/images/Jacket_hp_START!! True dreams (Uplifting Trance 20260706 mix).webp",
  },
  {
    id: "track-05",
    slug: "yume-no-tobira",
    index: 5,
    series: "muse",
    title: "ユメノトビラ",
    titleEn: "Yume no Tobira",
    subtitle: "(Uplifting Trance 260716 mix)",
    bpm: 138,
    key: "Ab -> C",
    duration: 441,
    youtubeUrl: "https://www.youtube.com/watch?v=V7XVKRHAbxg",
    releasedAt: "2026-07-16",
    audioSrc: "/audio/260716_ユメノトビラ_(Uplifting Trance 260716 mix).m4a",
    cover: "/images/Jacket_hp_ユメノトビラ_(Uplifting Trance 260716 mix).webp",
  },
  {
    id: "track-06",
    slug: "water-blue-new-world",
    index: 6,
    series: "sunshine",
    title: "WATER BLUE NEW WORLD",
    subtitle: "(Uplifting Trance 20260726 mix)",
    bpm: 138,
    key: "G -> Eb",
    duration: 559,
    youtubeUrl: "https://www.youtube.com/watch?v=pLwPi2bpC-E",
    releasedAt: "2026-07-26",
    audioSrc: "/audio/260726_WATER BLUE NEW WORLD_(Uplifting Trance 20260726 mix).m4a",
    cover: "/images/Jacket_hp_WATER BLUE NEW WORLD_(Uplifting Trance 20260726 mix).webp",
  },
];

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

export function trackPath(track: Track): string {
  return `/tracks/${track.slug}`;
}

/** Title line for meta descriptions — includes EN when present. */
export function trackSearchLabel(track: Track): string {
  return track.titleEn ? `${track.title}（${track.titleEn}）` : track.title;
}

/** e.g. ラブライブ！サンシャイン!!「未来の僕らは知ってるよ」 */
export function trackSeriesPhrase(track: Track, quotedTitle = track.title): string {
  return `アニメ「${seriesLabel[track.series]}」の「${quotedTitle}」`;
}
