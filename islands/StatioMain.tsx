/** @jsx h */
import { h, useEffect, useState } from "../client_deps.ts";

export interface StationType {
  name: string;
  url: string;
  favicon: string;
}

const HEADERS = {
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
  };

  return (
    <div>
      <button
        style={styles}
        onClick={() => playStation(station)}
      >
        {station.favicon !== "" ? "" : station.name}
      </button>
      <p>{stationName(station.name)}</p>
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

  return (
    <div>
      <h2>{title}</h2>
      <div style={divStyle}>
        {displayStations.map((station) => <Station station={station} />)}
      </div>
      {(pager + pageNumItems < stations.length) &&
        <button onClick={nextPage}>next</button>}
      {pager > 0 &&
        <button onClick={backPage}>back</button>}
    </div>
  );
}

function SearchStations() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState("Country");
  const [stations, setStations] = useState<StationType[]>([]);

  // deno-lint-ignore no-explicit-any
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  // deno-lint-ignore no-explicit-any
  const handleMethod = (e: any) => {
    setMethod(e.target.value);
  };

  async function search() {
    let urlMethod: string;
    switch (method) {
      case "Country":
        urlMethod = "bycountry";
        break;
      case "Language":
        urlMethod = "bylanguage";
        break;
      case "Name":
        urlMethod = "byname";
        break;
      default:
        throw "ureachable";
    }
    setStations(
      await (
        await fetch(
          `https://de1.api.radio-browser.info/json/stations/${urlMethod}/${input}`,
          {
            "headers": HEADERS,
          },
        )
      ).json(),
    );
  }

  return (
    <div>
      <h2>Search Stations</h2>
      <input onChange={handleChange} value={input} />
      <select onChange={handleMethod}>
        <option>Country</option>
        <option>Language</option>
        <option>Name</option>
      </select>
      <button onClick={search}>Search</button>
      {stations.length !== 0 && (
        <Stations title="Search Results" stations={stations} />
      )}
    </div>
  );
}

export default function StationMain(
  { country, noSearch }: { country?: string; noSearch?: boolean },
) {
  const [stations, setStations] = useState<StationType[]>([]);
  useEffect(() => {
    getStations(country).then((stations) => {
      setStations(stations);
    });
  }, []);
  if (noSearch === undefined) {
    noSearch = false;
  }
  return (
    <div>
      {stations !== null &&
        <Stations title="Local Stations" stations={stations} />}
      {!noSearch && <SearchStations />}
    </div>
  );
}
