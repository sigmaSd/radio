/** @jsx h */
import { h, Head } from "../client_deps.ts";
import StationMain from "../islands/StatioMain.tsx";

const AudioPlay = () => {
  return <audio id="audio" />;
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
