import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";
import { StationType } from "@/interfaces/station.ts";

export const db = new DB("", { memory: true });

db.query(
  "create TABLE radio_table (name TEXT, country TEXT, language TEXT, votes INT, url TEXT, favicon TEXT)",
);
const jsonDb: StationType[] = JSON.parse(
  await Deno.readTextFile("static_server/db/compressed_db.json"),
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
