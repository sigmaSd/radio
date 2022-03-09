/** @jsx h */
import { h, useState } from "../client_deps.ts";
import { HEADERS, Stations, StationType } from "./StatioMain.tsx";

export default function SearchStations() {
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
