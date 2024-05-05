import { useState } from "preact/hooks";
import type { StationType } from "@/interfaces/station.ts";
import Audioplay from "@/components/AudioPlay.tsx";
import { type Signal, useComputed, useSignal } from "@preact/signals";
import { button74 } from "@/styles/styles.ts";

export const HEADERS = {
  "User-Agent": "https://github.com/sigmaSd/freshRadio",
};

// for testing
let useRemoteDb: boolean;
try {
  useRemoteDb = !!Deno.env.get("DENO_DEPLOYMENT_ID");
} catch {
  useRemoteDb = true;
}
// hardcode to false
useRemoteDb = false;

export const apiUrl = useRemoteDb
  ? "https://de1.api.radio-browser.info/json/stations"
  : "/api/db";

export const sortByVotes = (a: { votes: number }, b: { votes: number }) =>
  a.votes >= b.votes ? -1 : 1;

const Station = (
  { station, activeStaion }: {
    station: StationType;
    activeStaion: Signal<StationType | undefined>;
  },
) => {
  const stationName = (name: string) => {
    if (name.length > 12) {
      return `${name.slice(0, 12)}..`;
    }
    return name;
  };

  const stationStyle = {
    backgroundImage: `url(${station.favicon})`,
    width: "150px",
    height: "150px",
    backgroundSize: "150px",
    border: "4px solid",
    borderColor: activeStaion.value === station ? "#fa4" : "#abb",
    borderRadius: "5px",
    margin: "2px",
    backgroundColor: "#ccc",
    fontWeight: "bolder",
    fontSize: "1em",
    color: "#422800",
  };

  const [trigger, setTrigger] = useState(false);

  const toggleFavStation = (station: StationType) => {
    const currentFavStations: StationType[] = JSON.parse(
      localStorage.getItem("favStations") ||
        JSON.stringify([]),
    );

    currentFavStations.find((s) => s.url === station.url)
      ? localStorage.setItem(
        "favStations",
        JSON.stringify(currentFavStations.filter((s) => s.url !== station.url)),
      )
      : localStorage.setItem(
        "favStations",
        JSON.stringify([...currentFavStations, station]),
      );

    // force redraw star
    setTrigger(!trigger);
  };

  const starStyle = () => {
    const currentFavStations: StationType[] = JSON.parse(
      localStorage.getItem("favStations") ||
        JSON.stringify([]),
    );

    return {
      color: currentFavStations.find((s) => s.url === station.url)
        ? "yellow"
        : "grey",
      visibility: "visible",
    };
  };

  return (
    <div>
      <button
        type="button"
        style={stationStyle}
        onClick={() => {
          activeStaion.value = station;
          Audioplay.playStation(station);
        }}
      >
        {station.favicon !== "" ? "" : station.name}
      </button>
      <div class="flex justify-center">
        <p class="font-bold">{stationName(station.name)}</p>
        <button
          type="button"
          class="invisible"
          onClick={() => toggleFavStation(station)}
        >
          {(starStyle().color === "yellow")
            ? (
              <img
                alt="{x}"
                src="/icon/star-filled.svg"
                class="visible w-5"
              />
            )
            : (
              <img
                alt="{}"
                src="/icon/star-unfilled.svg"
                class="visible w-5"
              />
            )}
        </button>
      </div>
    </div>
  );
};
export default function Stations(
  { title, stations }: {
    title: string;
    stations: Signal<StationType[]>;
  },
) {
  const pageNumItems = 20;
  const pager = useSignal(0);
  const displayStations = useComputed(() => {
    return stations.value.slice(
      pager.value,
      pager.value + pageNumItems,
    );
  });

  const activeStaion = useSignal<StationType | undefined>(
    undefined,
  );

  function nextPage() {
    pager.value += pageNumItems;
  }
  function backPage() {
    pager.value -= pageNumItems;
  }

  return (
    <div>
      <h2 class="text-ab3400 text-2xl font-light">{title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(160px, 1fr))",
        }}
      >
        {displayStations.value.map((station: StationType) => (
          <Station
            // The database already remove duplicate stations
            // so its probably fine to use the name as key
            key={station.name}
            station={station}
            activeStaion={activeStaion}
          />
        ))}
      </div>
      {pager.value > 0 &&
        <button type="button" style={button74} onClick={backPage}>back</button>}
      {(pager.value + pageNumItems < stations.value.length) &&
        <button type="button" style={button74} onClick={nextPage}>next</button>}
    </div>
  );
}
