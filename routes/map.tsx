import { Head } from "$fresh/runtime.ts";

export default function Map() {
  /* CSS */
  const buttonStyle = {
    appearance: "none",
    backgroundColor: "#2ea44f",
    border: "1px solid rgba(27, 31, 35, .15)",
    borderRadius: "6px",
    boxShadow: "rgba(27, 31, 35, .1) 0 1px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    display: "inline-block",
    marginBottom: "5px",
    width: "50px",
  };
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <button style={buttonStyle} id="goBtn">
        Go!
      </button>
      <div id="map"></div>
      <script type="module" src="/map.js" />
    </div>
  );
}
