import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { StationType } from "@/interfaces/station.ts";
import Stations, { apiUrl, HEADERS, sortByVotes } from "@/islands/Stations.tsx";
import { button54 } from "@/styles/styles.ts";

export default function SearchStations() {
  const input = useSignal("");
  const method = useSignal("Country");
  const stations = useSignal<StationType[]>([]);

  // reset selected method to country
  useEffect(() => {
    method.value = "Country";
  }, []);

  async function search() {
    let urlMethod: string;
    switch (method.value) {
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

    stations.value = await fetch(
      `${apiUrl}/${urlMethod}/${input}`,
      {
        headers: HEADERS,
      },
    ).then((res) => res.json()).then((stations) => stations.sort(sortByVotes));
  }

  return (
    <div>
      <h2>Search Stations</h2>
      <input
        style={button54}
        value={input.value}
        onChange={(e) => {
          input.value = (e?.target as HTMLInputElement).value;
        }}
      />
      <select
        style={button54}
        value={method.value}
        onChange={(e) => {
          method.value = (e?.target as HTMLInputElement).value;
        }}
      >
        <option>Country</option>
        <option>Language</option>
        <option>Name</option>
      </select>
      <button type="button" style={button54} onClick={search}>Search</button>
      {stations.value.length !== 0 && (
        <Stations title="Search Results" stations={stations} />
      )}
    </div>
  );
}
