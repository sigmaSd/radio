/** @jsx h */
import { PageProps } from "$fresh/src/server/types.ts";
import { h } from "preact";
import AudioPlay from "../../components/AudioPlay.tsx";
import StationMain from "../../islands/StatioMain.tsx";

export default function Page(props: PageProps) {
  const country = decodeURIComponent(props.params.country); // handle things like "United%20Kingdom"

  return (
    <div>
      <AudioPlay />
      <StationMain title={country} country={country} />
    </div>
  );
}
