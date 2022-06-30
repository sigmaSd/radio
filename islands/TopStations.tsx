/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { button74, HEADERS, Stations, StationType } from "./StatioMain.tsx";

export default function TopStations() {
  const [stations, setStations] = useState<StationType[]>([]);
  const [offset, setOffset] = useState(0);
  const pageNumItems = 20;

  useEffect(() => {
    fetch(
      `https://de1.api.radio-browser.info/json/stations/topclick?limit=${pageNumItems}&offset=${offset}`,
      {
        "headers": HEADERS,
      },
    ).then((res) => res.json()).then((data) => {
      setStations(data);
    });
  }, [offset]);

  function nextPage() {
    setOffset(offset + pageNumItems);
  }
  function backPage() {
    setOffset(offset - pageNumItems);
  }

  return (
    <div>
      {stations.length !== 0 && (
        <Stations title="Top Stations" stations={stations} />
      )}
      <button style={button74} onClick={nextPage}>next</button>
      {(offset >= pageNumItems) &&
        <button style={button74} onClick={backPage}>back</button>}
    </div>
  );
}
