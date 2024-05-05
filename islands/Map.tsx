import type * as Leaflet from "https://esm.sh/v135/@types/leaflet@1.9.4/index.d.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  type StateUpdater,
  useContext,
  useEffect,
  useState,
} from "preact/hooks";
import { type ComponentChildren, createContext } from "preact";

// Create a context to hold Leaflet data/functions
const LeafletContext = createContext<typeof Leaflet | null>(null);

// LeafletProvider component manages Leaflet loading and context
function LeafletProvider(props: { children: ComponentChildren }) {
  if (!IS_BROWSER) {
    // NOTE: what is the point of returning this component
    // return <p>Leaflet must be loaded on the client. No children will render</p>;
    return;
  }
  const [value, setValue] = useState<typeof Leaflet | null>(null);
  return (
    <>
      {/* Load Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
      />
      {/* Load Leaflet JS */}
      <script
        // deno-lint-ignore no-window
        onLoad={() => setValue(window.L)}
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      />
      {/* Provide Leaflet context to children */}
      <LeafletContext.Provider value={value}>
        {props.children}
      </LeafletContext.Provider>
    </>
  );
}

// MapComponent utilizes Leaflet context for rendering the map
function MapComponent(
  { activeCountry, setActiveCountry }: {
    activeCountry: string;
    setActiveCountry: StateUpdater<string>;
  },
) {
  const leaf = useContext(LeafletContext);
  if (!leaf) return <div>Loading Map...</div>;

  //@ts-ignore seems ok
  useEffect(async () => {
    const latlng = await getLatLng(activeCountry);

    const map = leaf.map("map");
    leaf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let activeMark = leaf.marker(latlng).addTo(map)
      .bindPopup(`Selected '${activeCountry}'`)
      .openPopup();
    map.setView(latlng, 4);
    map.on(
      "click",
      async (ev) => {
        activeMark.remove();
        const result = await (async () => {
          const map = ev.target;

          const activeCountryNew = await countryFromLatLng(ev.latlng);
          if (!activeCountry) {
            return;
          }
          const latlon = await getLatLng(activeCountryNew);
          const activeMark = leaf.marker(latlon).addTo(map)
            .bindPopup(`Selected '${activeCountryNew}'`)
            .openPopup();
          return [activeMark, activeCountryNew] as const;
        })();
        if (result) {
          activeMark = result[0];
          setActiveCountry(result[1]);
        }
      },
    );
  }, []);
  return <div id="map" class="relative w-[80vw] h-[50vh]" />;
}

// MapIsland is the parent component integrating LeafletProvider and MapComponent
export default function MapIsland() {
  const [activeCountry, setActiveCountry] = useState(
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split("/")[1],
  );
  return (
    <>
      <LeafletProvider>
        <MapComponent
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        />
      </LeafletProvider>
      <a
        class="bg-green-600 border border-gray-400 rounded-md shadow-sm py-2 px-4 text-white font-bold cursor-pointer inline-block mt-5 w-150 h-30"
        href={`/byCountry/${activeCountry}`}
      >
        Go
      </a>
    </>
  );
}

async function getLatLng(cn: string): Promise<[number, number]> {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/search.php?country=${cn}&format=json`,
  ).then((r) => r.json());
  const lat = resp[0].lat;
  const lon = resp[0].lon;
  return [Number.parseFloat(lat), Number.parseFloat(lon)];
}

async function countryFromLatLng(
  { lat, lng }: { lat: number; lng: number },
): Promise<string> {
  const url =
    // make sure we get english country names because that's what the database expects.
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`;
  return await fetch(url).then((r) => r.json()).then((r) =>
    r.address?.country || ""
  );
}
