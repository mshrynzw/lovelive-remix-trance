import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { TrackList } from "@/components/track-list";
import { NextUp } from "@/components/next-up";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TrackList />
      <NextUp />
    </>
  );
}
