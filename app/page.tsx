import type { Metadata } from "next";
import { FeaturedHome } from "@/components/featured-home";
import { TrackList } from "@/components/track-list";
import { NextUp } from "@/components/next-up";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, musicAlbumJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { llmsTxtPath } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "text/plain": llmsTxtPath,
    },
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={musicAlbumJsonLd()} />
      <JsonLd data={faqPageJsonLd()} />
      <FeaturedHome />
      <TrackList />
      <NextUp />
    </>
  );
}
