/** @jsx h */
import { h } from "preact";
import AudioPlay from "../components/AudioPlay.tsx";
import StationMain from "../islands/StatioMain.tsx";

export default function Home() {
  return (
    <div>
      <AudioPlay />
      <StationMain />
    </div>
  );
}
