import { Head } from "$fresh/runtime.ts";

export default function Map() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <link rel="stylesheet" href="/map/map.css" />
      </Head>
      <div id="map"></div>
      <button
        class="bg-green-600 border border-gray-400 rounded-md shadow-sm py-2 px-4 text-white font-bold cursor-pointer inline-block mt-5 w-150 h-30"
        id="goBtn"
      >
        Go!
      </button>
      <script type="module" src="/map/map.js" />
    </>
  );
}
