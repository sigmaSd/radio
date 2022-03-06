/** @jsx h */
import { h, Head } from "../client_deps.ts";
import StationMain from "../islands/StatioMain.tsx";

const AudioPlay = () => {
  const styles = {
    width: "150px",
    height: "150px",
    padding: "5px",
  };
  const divStyle = {
    display: "none",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div id="audioDiv" style={divStyle}>
      <img id="audioImg" style={styles} />
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
      <div style={mainStyle}>
        <h1 style={h1Style}>Radio</h1>
        <AudioPlay />
        <StationMain />
      </div>
    </div>
  );
}
