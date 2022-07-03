import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";

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

for (const station of jsonDb) {
  try {
    db.query(
      `insert into radio_table values ('${station.name}', '${station.country}', '${station.language}', ${station.votes}, '${station.url}', '${station.favicon}')`,
    );
  } catch {
    // some rows are broken, ignore
  }
}
