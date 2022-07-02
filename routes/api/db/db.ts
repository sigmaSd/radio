import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";
import { isDeployed } from "../../../islands/StatioMain.tsx";

export interface StationDBType {
  name: string;
  country: string;
  language: string;
  votes: number;
  url: string;
  favicon: string;
}

export const db = isDeployed ? null : new DB("static/db/db.sqlite");
