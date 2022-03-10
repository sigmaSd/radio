/** @jsx h */
import { h, PageProps } from "../../client_deps.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import StationMain from "../../islands/StatioMain.tsx";
import { AudioPlay } from "../index.tsx";

export default function Page(props: PageProps) {
  const { country } = props.params;
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