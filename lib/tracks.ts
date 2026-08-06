export type Track = {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  bpm: number;
  key: string;
  duration: number; // seconds
  youtubeUrl: string;
  /**
   * Path under /public/audio. Placeholder file names — drop your own
   * mp3/ogg masters into public/audio/ using these exact file names,
   * or edit the paths below to match your files.
   */
  audioSrc: string;
  cover: string;
};

/**
 * PLACEHOLDER TRACK DATA
 * ----------------------
 * Replace title / subtitle / bpm / key / duration / youtubeUrl with your
 * actual release information. Track 01 uses the title shown on the
 * supplied jacket artwork ("WATER BLUE NEW WORLD"); tracks 02–06 are
 * placeholders — swap in your real track list before launch.
 */
export const tracks: Track[] = [
  {
    id: "track-00",
    index: 0,
    title: "TEST",
    subtitle: "test",
    bpm: 137,
    key: "C# -> A",
    duration: 452,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260511_Dancing_stars_on_me_(Uplifting Trance 20260511 mix).m4a",
    cover: "/images/Jacket_hp_Dancing_stars_on_me_(Uplifting Trance mix 20260511 mix).webp",
  },
  {
    id: "track-01",
    index: 1,
    title: "Dancing Stars on Me!",
    subtitle: "(Uplifting Trance 20260511 mix)",
    bpm: 137,
    key: "C# -> A",
    duration: 372,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260511_Dancing_stars_on_me_(Uplifting Trance 20260511 mix).m4a",
    cover: "/images/Jacket_hp_Dancing_stars_on_me_(Uplifting Trance mix 20260511 mix).webp",
  },
  {
    id: "track-02",
    index: 2,
    title: "Mirai no Bokura wa Shitteru yo",
    subtitle: "(Uplifting Trance 20260603 mix)",
    bpm: 140,
    key: "Ab ",
    duration: 477,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260603_未来の僕らは知ってるよ_(Uplifting Trance 20260603 mix).m4a",
    cover: "/images/Jacket_hp未来の僕らは知ってるよ_(Uplifting Trance 20260603 mix).webp",
  },
  {
    id: "track-03",
    index: 3,
    title: "Nijiiro Passions!",
    subtitle: "(Uplifting Trance 20260620 mix)",
    bpm: 138,
    key: "G",
    duration: 454,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260620_虹色Passions！(Uplifting Trance 20260620 mix).m4a",
    cover: "/images/Jacket_hp_虹色Passions！(Uplifting Trance 20260620 mix).webp",
  },
  {
    id: "track-04",
    index: 4,
    title: "START!! True dreams",
    subtitle: "(Uplifting Trance 20260706 mix)",
    bpm: 138,
    key: "F",
    duration: 458,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260706_START!! True dreams (Uplifting Trance 20260706 mix).m4a",
    cover: "/images/Jacket_hp_START!! True dreams (Uplifting Trance 20260706 mix).webp",
  },
  {
    id: "track-05",
    index: 5,
    title: "Yume no Tobira",
    subtitle: "(Uplifting Trance 260716 mix)",
    bpm: 138,
    key: "Ab -> C",
    duration: 441,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260716_ユメノトビラ_(Uplifting Trance 260716 mix).m4a",
    cover: "/images/Jacket_hp_ユメノトビラ_(Uplifting Trance 260716 mix).webp",
  },
  {
    id: "track-06",
    index: 6,
    title: "Dancing Stars on Me!",
    subtitle: "(Uplifting Trance 20260511 mix)",
    bpm: 137,
    key: "C# -> A",
    duration: 452,
    youtubeUrl: "https://www.youtube.com",
    audioSrc: "/audio/260511_Dancing_stars_on_me_(Uplifting Trance 20260511 mix).m4a",
    cover: "/images/Jacket_hp_Dancing_stars_on_me_(Uplifting Trance mix 20260511 mix).webp",
  },
];
