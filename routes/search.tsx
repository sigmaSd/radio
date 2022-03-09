/** @jsx h */
import { h } from "../client_deps.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import SearchStations from "../islands/StationSearch.tsx";
import { AudioPlay } from "./index.tsx";

export default function Search() {
  const mainStyle = {
    textAlign: "center",
    padding: "1em",
    margin: "0 auto",
  };
  const h1Style = {
    "color": "#ff3e00",
    "textTransform": "uppercase",
    "fontSize": "4em",
    "fontWeight": "100",
  };

  return (
    <div>
      <NavigationBar />
      <div style={mainStyle}>
        <h1 style={h1Style}>Radio</h1>
        <AudioPlay />
        <SearchStations />
      </div>
    </div>
  );
}
