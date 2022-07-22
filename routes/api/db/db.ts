import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";
import { StationType } from "../../../islands/StatioMain.tsx";

export interface StationDBType {
  name: string;
  country: string;
  language: string;
  votes: number;
  url: string;
  favicon: string;
}

export const db = new DB("", { memory: true });
db.query(
  "create TABLE radio_table (name TEXT, country TEXT, language TEXT, votes INT, url TEXT, favicon TEXT)",
);
const jsonDb: StationDBType[] = JSON.parse(
  await Deno.readTextFile("static/db/compressed_db.json"),
);

const sanitize = (s: string) => s.replaceAll('"', "").replaceAll("'", "");
db.query(
  `insert into radio_table values ${
    jsonDb.map((station) =>
      "('" +
      sanitize(station.name) +
      "','" +
      sanitize(station.country) +
      "','" +
      sanitize(station.language) +
      "'," +
      station.votes +
      ",'" +
      sanitize(station.url) +
      "','" +
      sanitize(station.favicon) +
      "')"
    ).join(",")
  }`,
);

export const queryEntriesAndHandleTypes = async (query: string) => {
  const result = db.queryEntries(query) as unknown as StationType[];

  const newStations = result.filterMap(async (station) => {
    const url = new URL(station.url);

    if (url.pathname.endsWith(".pls")) {
      const urlList = await fetch(station.url).then((res) => res.text());

      const plsStations = urlList.split("\n").filterMap((line) => {
        if (line.startsWith("File")) {
          return {
            name: station.name,
            url: line.split("=")[1],
            favicon: station.favicon,
            votes: station.votes,
          };
        }
      });

      if (plsStations[0]) {
        return plsStations[0];
      }
    } else if (url.pathname.endsWith(".m3u")) {
      const urlList = await fetch(station.url).then((res) => res.text());

      const m3uStations = urlList.split("\n").filterMap((line) => {
        if (line.startsWith("#")) {
          return;
        }
        return {
          name: station.name,
          url: line,
          favicon: station.favicon,
          votes: station.votes,
        };
      });

      if (m3uStations[0]) {
        return m3uStations[0];
      }
    } else {
      return station;
    }
  });

  return await Promise.all(newStations);
};

declare global {
  interface Array<T> {
    filterMap<E>(f: (x: T) => E | undefined): E[];
  }
}
Array.prototype.filterMap = function <T, E>(f: (x: T) => E | undefined): E[] {
  return this.map(f).filter((x) => x) as E[];
};
