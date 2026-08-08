import type { Metadata } from "next";
import { FeaturedHome } from "@/components/featured-home";
import { TrackList } from "@/components/track-list";
import { NextUp } from "@/components/next-up";
import { JsonLd } from "@/components/json-ld";
import { musicAlbumJsonLd, websiteJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={musicAlbumJsonLd()} />
      <FeaturedHome />
      <TrackList />
      <NextUp />
    </>
  );
}
