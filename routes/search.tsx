/** @jsx h */
import { h } from "preact";
import AudioPlay from "../components/AudioPlay.tsx";
import SearchStations from "../islands/StationSearch.tsx";

export default function Search() {
  return (
    <div>
      <AudioPlay />
      <SearchStations />
    </div>
  );
}
