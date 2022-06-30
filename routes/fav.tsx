/** @jsx h */
import { h } from "preact";
import NavigationBar from "../components/NavigationBar.tsx";
import FavStations from "../islands/FavStations.tsx";
import { AudioPlay } from "./index.tsx";

export default function Page() {
  const mainStyle = {
    textAlign: "center",
    padding: "1em",
    margin: "0 auto",
  };
  return (
    <div>
      <NavigationBar />
      <main style={mainStyle}>
        <AudioPlay />
        <FavStations />
      </main>
    </div>
  );
}
