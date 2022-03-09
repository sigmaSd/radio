/** @jsx h */
import { h, useEffect, useState } from "../client_deps.ts";

export interface StationType {
  name: string;
  url: string;
  favicon: string;
}

export const HEADERS = {
  "User-Agent": "https://github.com/sigmaSd/freshRadio",
};

export async function getStations(cn: string | undefined) {
  if (cn === undefined) {
    cn = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split("/")[1];
  }
  const stations: StationType[] = await (
    await fetch(
      `https://de1.api.radio-browser.info/json/stations/bycountry/${cn}`,
      {
        "headers": HEADERS,
      },
    )
  ).json();
  return stations;
}

const Station = ({ station }: { station: StationType }) => {
  const playStation = (station: StationType) => {
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
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "5px",
    backgroundColor: "#ccc",
    fontWeight: "medium",
    fontSize: "22px",
    color: "#fb3f0a",
  };

  return (
    <div>
      <button
        style={styles}
        onClick={() => playStation(station)}
      >
        {station.favicon !== "" ? "" : station.name}
      </button>
      <p style={{ fontWeight: "bold" }}>{stationName(station.name)}</p>
    </div>
  );
};
export function Stations(
  { title, stations }: { title: string; stations: StationType[] },
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

  const button74 = {
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

  const h2Style = {
    "color": "#fb3e00",
    "fontSize": "4em",
    "fontWeight": "80",
  };

  return (
    <div>
      <h2 style={h2Style}>{title}</h2>
      <div style={divStyle}>
        {displayStations.map((station) => <Station station={station} />)}
      </div>
      {(pager + pageNumItems < stations.length) &&
        <button style={button74} onClick={nextPage}>next</button>}
      {pager > 0 &&
        <button style={button74} onClick={backPage}>back</button>}
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
      setStations(stations);
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
