import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cinzel, Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/aurora-background";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MusicPlayer } from "@/components/music-player";
import { PlayerProvider } from "@/components/providers/player-provider";
import { siteUrl } from "@/lib/site";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const title = "Love Live! Trance";
const description =
  "ラブライブ！の名曲をUplifting Tranceへとリミックスした曲。オーロラのように広がるシンセと透き通るピアノで紡ぐ、夜空を旅するような音の世界。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Love Live! Trance",
  },
  description,
  keywords: [
    "LoveLive!",
    "Remix",
    "Uplifting Trance",
    "Trance",
    "ラブライブ",
    "リミックス",
    "アニソン",
    "Anison"
  ],
  authors: [{ name: "LoveLive! Trance Project" }],
  openGraph: {
    type: "music.album",
    title,
    description,
    url: siteUrl,
    siteName: "Love Live! Trance",
    locale: "ja_JP",
    images: [
      {
        url: "/images/hero.webp",
        width: 2500,
        height: 2500,
        alt: "Love Live! Trance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06182F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${cinzel.variable} ${cormorant.variable} ${notoSansJP.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          メインコンテンツへスキップ
        </a>
        <AuroraBackground />
        <PlayerProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <MusicPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
