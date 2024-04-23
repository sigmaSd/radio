import type { Handlers } from "$fresh/server.ts";
import type { StationType } from "@/interfaces/station.ts";
import { db } from "@/static_server/db.ts";

export const handler: Handlers = {
  GET(req) {
    const rawSearch = new URL(req.url).search;
    const params: { [key: string]: string } = {};
    for (const pair of rawSearch.substring(1).split("&")) {
      const [key, value] = pair.split("=");
      params[key] = value;
    }
    // construct query that may include limit or/and offest depending on the prams
    let query = "SELECT * FROM radio_table ORDER BY votes DESC";
    if (params.limit) {
      query += ` LIMIT ${params.limit}`;
    }
    if (params.offset) {
      query += ` OFFSET ${params.offset}`;
    }

    const stations = db.queryEntries(query) as unknown as StationType[];

    return new Response(JSON.stringify(stations));
  },
};
