import { Handlers } from "$fresh/server.ts";
import { StationType } from "../../../../interfaces/station.ts";
import { db } from "../db.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { language } = ctx.params;

    const countries = db.queryEntries(
      `SELECT * FROM radio_table WHERE Language LIKE '%${language}%'`,
    ) as unknown as StationType[];

    return new Response(JSON.stringify(countries));
  },
};
