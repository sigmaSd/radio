import type { Handlers } from "$fresh/server.ts";
import type { StationType } from "@/interfaces/station.ts";
import { db } from "@/static_server/db.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const country = decodeURIComponent(ctx.params.country); // handle things like "United%20Kingdom"

    const countries = db.queryEntries(
      `SELECT * FROM radio_table WHERE Country LIKE '%${country}%'`,
    ) as unknown as StationType[];

    return new Response(JSON.stringify(countries));
  },
};
