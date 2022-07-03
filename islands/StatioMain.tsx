/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export interface StationType {
  name: string;
  url: string;
  favicon: string;
  votes: number;
}
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
  { station, activeStaion, setActiveStation, updateFavStations }: {
    station: StationType;
    activeStaion: StationType | undefined;
    setActiveStation: (station: StationType) => void;
    updateFavStations?: () => void;
  },
) => {
  const playStation = (station: StationType) => {
    setActiveStation(station);
    const audioDiv = document.getElementById("audioDiv") as HTMLDivElement;
    audioDiv.style.display = "flex";
    const audioImg = document.getElementById("audioImg") as HTMLImageElement;
    if (station.favicon !== "") {
      audioImg.alt = "";
      audioImg.src = station.favicon;
      audioImg.style.height = "150px";
    } else {
      audioImg.src = "";
      audioImg.alt = station.name;
      audioImg.style.height = "40px";
    }
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.setAttribute("controls", "");
    audio.src = station.url;
    audio.play();
  };

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

  const [trigger, setForceRender] = useState(false);

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
    setForceRender(!trigger);
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
        onClick={() => playStation(station)}
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
                src="/star-filled.svg"
                style={{ visibility: "visible", width: "20px" }}
              />
            )
            : (
              <img
                src="/star-unfilled.svg"
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
    stations: StationType[];
    updateFavStations?: () => void;
  },
) {
  const pageNumItems = 20;
  const [pager, setPager] = useState(0);
  const [displayStations, setDisplayStations] = useState<StationType[]>(
    stations.slice(pager, pager + pageNumItems),
  );
  useEffect(() => {
    setDisplayStations(stations.slice(pager, pager + pageNumItems));
  }, [pager, stations]);
  function nextPage() {
    setPager(pager + pageNumItems);
  }
  function backPage() {
    setPager(pager - pageNumItems);
  }

  const divStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const h2Style = {
    "color": "#ab3400",
    "fontSize": "2em",
    "fontWeight": "light",
  };

  const [activeStaion, setActiveStation] = useState<StationType | undefined>(
    undefined,
  );
  return (
    <div>
      <h2 style={h2Style}>{title}</h2>
      <div style={divStyle}>
        {displayStations.map((station) => (
          <Station
            station={station}
            activeStaion={activeStaion}
            setActiveStation={setActiveStation}
            updateFavStations={updateFavStations}
          />
        ))}
      </div>
      {pager > 0 &&
        <button style={button74} onClick={backPage}>back</button>}
      {(pager + pageNumItems < stations.length) &&
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
  const [stations, setStations] = useState<StationType[]>([]);
  useEffect(() => {
    getStations(country).then((stations) => {
      setStations(stations.sort(sortByVotes));
    });
  }, []);
  return (
    <div>
      {stations !== null &&
        (
          <Stations
            title={title ? title : "Local Stations"}
            stations={stations}
          />
        )}
    </div>
  );
}
