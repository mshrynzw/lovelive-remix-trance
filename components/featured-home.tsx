"use client";

import * as React from "react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { tracks, type Track } from "@/lib/tracks";

function pickFeaturedTrack(): Track {
  const pool = tracks.filter((t) => t.id !== "track-00");
  const list = pool.length > 0 ? pool : tracks;
  return list[Math.floor(Math.random() * list.length)]!;
}

export function FeaturedHome() {
  const [featured, setFeatured] = React.useState<Track | null>(null);

  React.useEffect(() => {
    setFeatured(pickFeaturedTrack());
  }, []);

  return (
    <>
      <Hero featuredTrack={featured} />
      <About featuredTrack={featured} />
    </>
  );
}
