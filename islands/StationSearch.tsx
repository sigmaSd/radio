import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { StationType } from "@/interfaces/station.ts";
import {
  apiUrl,
  HEADERS,
  sortByVotes,
  Stations,
} from "@/islands/StatioMain.tsx";

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
    stations.value = (await (
      await fetch(
        `${apiUrl}/${urlMethod}/${input}`,
        {
          headers: HEADERS,
        },
      )
    ).json()).sort(sortByVotes);
  }

  const button54 = {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "16px",
    letterSpacing: "2px",
    textDecoration: "none",
    textTransform: "uppercase",
    color: "#000",
    cursor: "pointer",
    border: "3px solid",
    padding: "0.25em 0.5em",
    boxShadow:
      "1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px",
    position: "relative",
    userSelect: "none",
    webkitUserSelect: "none",
    touchAction: "manipulation",
  };

  return (
    <div>
      <h2>Search Stations</h2>
      <input
        style={button54}
        value={input.value}
        // deno-lint-ignore no-explicit-any
        onChange={(e: any) => {
          input.value = e.target.value;
        }}
      />
      <select
        style={button54}
        value={method.value}
        // deno-lint-ignore no-explicit-any
        onChange={(e: any) => {
          method.value = e.target.value;
        }}
      >
        <option>Country</option>
        <option>Language</option>
        <option>Name</option>
      </select>
      <button style={button54} onClick={search}>Search</button>
      {stations.value.length !== 0 && (
        <Stations title="Search Results" stations={stations.value} />
      )}
    </div>
  );
}
