import { Head } from "$fresh/runtime.ts";
import MapIsland from "@/islands/Map.tsx";

export default function RadioMap() {
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
      <MapIsland />
    </>
  );
}
