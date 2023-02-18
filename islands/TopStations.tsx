import { useEffect } from "preact/hooks";
import Stations, { apiUrl, HEADERS } from "@/islands/Stations.tsx";
import { Signal, useSignal } from "@preact/signals";
import { StationType } from "@/interfaces/station.ts";
import { button74 } from "@/styles/styles.ts";

export default function TopStations() {
  const stations: Signal<StationType[]> = useSignal([]);
  const offset = useSignal(0);
  const pageNumItems = 20;

  useEffect(() => {
    fetch(
      `${apiUrl}/topclick?limit=${pageNumItems}&offset=${offset}`,
      {
        headers: HEADERS,
      },
    ).then((res) => res.json()).then((data) => {
      stations.value = data;
    });
  }, [offset.value]);

  function nextPage() {
    offset.value += pageNumItems;
  }
  function backPage() {
    offset.value -= pageNumItems;
  }

  return (
    <div>
      {stations.value.length !== 0 &&
        <Stations title="Top Stations" stations={stations} />}
      {offset.value >= pageNumItems &&
        <button style={button74} onClick={backPage}>back</button>}
      <button style={button74} onClick={nextPage}>next</button>
    </div>
  );
}
