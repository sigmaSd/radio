/** @jsx h */
import { h, Head } from "../client_deps.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import StationMain from "../islands/StatioMain.tsx";

export const AudioPlay = () => {
  const imgStyle = {
    width: "150px",
    height: "150px",
    padding: "5px",
    fontSize: "20px",
    fontWeight: "bold",
  };
  const divStyle = {
    display: "none",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div id="audioDiv" style={divStyle}>
      <img id="audioImg" style={imgStyle} />
      <audio id="audio" controls />
    </div>
  );
};

export default function Home() {
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
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <div style={mainStyle}>
        <h1 style={h1Style}>Radio</h1>
        <AudioPlay />
        <StationMain />
      </div>
    </div>
  );
}
