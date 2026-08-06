import { FeaturedHome } from "@/components/featured-home";
import { TrackList } from "@/components/track-list";
import { NextUp } from "@/components/next-up";

export default function Home() {
  return (
    <>
      <FeaturedHome />
      <TrackList />
      <NextUp />
    </>
  );
}
