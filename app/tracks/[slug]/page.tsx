import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { TrackDetail } from "@/components/track-detail";
import { trackPageJsonLd } from "@/lib/json-ld";
import { siteArtist, siteName, siteUrl } from "@/lib/site";
import {
  getTrackBySlug,
  trackPath,
  trackSearchLabel,
  tracks,
} from "@/lib/tracks";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) return {};

  const label = trackSearchLabel(track);
  const title = `${label} Uplifting Trance Remix`;
  const description = `ラブライブ！「${label}」の Uplifting Trance リミックス by ${siteArtist}。BPM ${track.bpm} / ${track.subtitle}。試聴・YouTube はこちら。`;
  const url = `${siteUrl}${trackPath(track)}`;

  return {
    title,
    description,
    alternates: {
      canonical: trackPath(track),
    },
    openGraph: {
      type: "music.song",
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "ja_JP",
      images: [
        {
          url: track.cover,
          width: 1200,
          height: 1200,
          alt: `${track.title} ジャケット`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [track.cover],
    },
  };
}

export default async function TrackPage({ params }: PageProps) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) notFound();

  const idx = tracks.findIndex((t) => t.id === track.id);
  const prev = idx > 0 ? tracks[idx - 1]! : null;
  const next = idx >= 0 && idx < tracks.length - 1 ? tracks[idx + 1]! : null;

  return (
    <>
      <JsonLd data={trackPageJsonLd(track)} />
      <TrackDetail track={track} prev={prev} next={next} />
    </>
  );
}
