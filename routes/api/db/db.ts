import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";

export interface StationDBType {
  name: string;
  country: string;
  language: string;
  votes: number;
  url: string;
  favicon: string;
}

export const db = new DB("static/db/db.sqlite");
