import { Handlers } from "$fresh/server.ts";
import { queryEntriesAndHandleTypes } from "../db.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { language } = ctx.params;

    const countries = queryEntriesAndHandleTypes(
      `SELECT * FROM radio_table WHERE Language LIKE '%${language}%'`,
    );

    return new Response(JSON.stringify(countries));
  },
};
