/** @jsx h */
import { h } from "preact";
import AudioPlay from "../components/AudioPlay.tsx";
import FavStations from "../islands/FavStations.tsx";

export default function Page() {
  return (
    <div>
      <AudioPlay />
      <FavStations />
    </div>
  );
}
