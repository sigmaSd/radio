/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { HEADERS, sortByVotes, Stations, StationType } from "./StatioMain.tsx";

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
      (await (
        await fetch(
          `https://de1.api.radio-browser.info/json/stations/${urlMethod}/${input}`,
          {
            "headers": HEADERS,
          },
        )
      ).json()).sort(sortByVotes),
    );
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
      <input style={button54} onChange={handleChange} value={input} />
      <select style={button54} onChange={handleMethod}>
        <option>Country</option>
        <option>Language</option>
        <option>Name</option>
      </select>
      <button style={button54} onClick={search}>Search</button>
      {stations.length !== 0 && (
        <Stations title="Search Results" stations={stations} />
      )}
    </div>
  );
}
