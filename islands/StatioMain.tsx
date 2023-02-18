import { useEffect } from "preact/hooks";
import { StationType } from "@/interfaces/station.ts";
import Audioplay from "@/components/AudioPlay.tsx";
import { Signal, useComputed, useSignal } from "@preact/signals";

export const button74 = {
  backgroundColor: "#fbeee0",
  border: "2px solid #422800",
  borderRadius: "30px",
  boxShadow: "#422800 4px 4px 0 0",
  color: "#422800",
  cursor: "pointer",
  display: "inline-block",
  fontWeight: "600",
  fontSize: "18px",
  padding: "0 18px",
  lineHeight: "50px",
  textAlign: "center",
  textDecoration: "none",
  userSelect: "none",
  webkitUserSelect: "none",
  touchAction: "manipulation",
};

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

export async function getStations(cn: string | undefined) {
  if (cn === undefined) {
    cn = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split("/")[1];
  }
  const stations: StationType[] = await (
    await fetch(
      `${apiUrl}/bycountry/${cn}`,
      {
        headers: HEADERS,
      },
    )
  ).json();
  return stations;
}

const Station = (
  { station, activeStaion, updateFavStations }: {
    station: StationType;
    activeStaion: StationType | undefined;
    updateFavStations?: () => void;
  },
) => {
  const stationName = (name: string) => {
    if (name.length > 12) {
      return `${name.slice(0, 12)}..`;
    } else {
      return name;
    }
  };

  const styles = {
    backgroundImage: `url(${station.favicon})`,
    width: "150px",
    height: "150px",
    backgroundSize: "150px",
    border: "4px solid",
    borderColor: activeStaion === station ? "#fa4" : "#abb",
    borderRadius: "5px",
    margin: "2px",
    backgroundColor: "#ccc",
    fontWeight: "bolder",
    fontSize: "1em",
    color: "#422800",
  };

  const trigger = useSignal(false);

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
    if (updateFavStations) {
      updateFavStations();
    }

    // force redraw
    trigger.value = !trigger.value;
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
        onMouseEnter={(e) => {
          (e.target! as HTMLButtonElement).style.cursor = "pointer";
        }}
        onMouseLeave={(e) => {
          (e.target! as HTMLButtonElement).style.cursor = "default";
        }}
        style={styles}
        onClick={() => {
          activeStaion = station;
          Audioplay.playStation(station);
        }}
      >
        {station.favicon !== "" ? "" : station.name}
      </button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ fontWeight: "bold" }}>{stationName(station.name)}</p>
        <button
          onMouseEnter={(e) => {
            (e.target! as HTMLButtonElement).style.cursor = "pointer";
          }}
          onMouseLeave={(e) => {
            (e.target! as HTMLButtonElement).style.cursor = "default";
          }}
          style={{ visibility: "hidden" }}
          onClick={() => toggleFavStation(station)}
        >
          {(starStyle().color === "yellow")
            ? (
              <img
                src="/icon/star-filled.svg"
                style={{ visibility: "visible", width: "20px" }}
              />
            )
            : (
              <img
                src="/icon/star-unfilled.svg"
                style={{ visibility: "visible", width: "20px" }}
              />
            )}
        </button>
      </div>
    </div>
  );
};
export function Stations(
  { title, stations, updateFavStations }: {
    title: string;
    stations: Signal<StationType[]>;
    updateFavStations?: () => void;
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

  const divStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(160px, 1fr))",
  };

  const h2Style = {
    "color": "#ab3400",
    "fontSize": "2em",
    "fontWeight": "light",
  };

  return (
    <div>
      <h2 style={h2Style}>{title}</h2>
      <div style={divStyle}>
        {displayStations.value.map((station) => (
          <Station
            station={station}
            activeStaion={activeStaion.value}
            updateFavStations={updateFavStations}
          />
        ))}
      </div>
      {pager.value > 0 &&
        <button style={button74} onClick={backPage}>back</button>}
      {(pager.value + pageNumItems < stations.value.length) &&
        <button style={button74} onClick={nextPage}>next</button>}
    </div>
  );
}

export default function StationMain(
  { title, country }: {
    title?: string;
    country?: string;
  },
) {
  const stations = useSignal<StationType[]>([]);
  useEffect(() => {
    getStations(country).then((newStations) => {
      stations.value = newStations.sort(sortByVotes);
    });
  }, []);
  return (
    <div>
      {stations.value !== null &&
        (
          <Stations
            title={title ? title : "Local Stations"}
            stations={stations}
          />
        )}
    </div>
  );
}
