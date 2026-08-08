import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cinzel, Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/aurora-background";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MusicPlayer } from "@/components/music-player";
import { PlayerProvider } from "@/components/providers/player-provider";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ラブライブ！Uplifting Trance Remix`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "ラブライブ",
    "Love Live",
    "Uplifting Trance",
    "Trance",
    "リミックス",
    "Remix",
    "アニソン",
    "Anison",
    "Kaoru Yuki",
    "Snowdome World",
  ],
  authors: [{ name: "LoveLive! Trance Project" }],
  creator: "Kaoru Yuki (Snowdome World)",
  openGraph: {
    type: "music.album",
    title: `${siteName} | ラブライブ！Uplifting Trance Remix`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "ja_JP",
    images: [
      {
        url: "/images/hero.webp",
        width: 2500,
        height: 2500,
        alt: "Love Live! Trance — ラブライブ！Uplifting Trance Remix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ラブライブ！Uplifting Trance Remix`,
    description: siteDescription,
    images: ["/images/hero.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
