/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import NavigationBar from "../components/NavigationBar.tsx";

export default function Map() {
  const mainStyle = {
    textAlign: "center",
    padding: "1em",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div>
      <NavigationBar />
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <div style={mainStyle}>
        <button style={{ backgroundColor: "lightGreen" }} id="goBtn">
          Go!
        </button>
        <div id="map"></div>
        <script type="module" src="/map.js" />
      </div>
    </div>
  );
}
