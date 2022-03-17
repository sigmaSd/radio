/** @jsx h */
import { h, PageProps } from "../client_deps.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import FavStations from "../islands/FavStations.tsx";
import { AudioPlay } from "./index.tsx";

export default function Page(props: PageProps) {
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
