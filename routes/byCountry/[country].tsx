/** @jsx h */
import { PageProps } from "$fresh/src/server/types.ts";
import { h } from "preact";
import NavigationBar from "../../components/NavigationBar.tsx";
import StationMain from "../../islands/StatioMain.tsx";
import { AudioPlay } from "../index.tsx";

export default function Page(props: PageProps) {
  const country = decodeURIComponent(props.params.country); // handle things like "United%20Kingdom"
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
        <StationMain title={country} country={country} />
      </main>
    </div>
  );
}
