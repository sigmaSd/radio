import { Handlers } from "$fresh/server.ts";
import { queryEntriesAndHandleTypes } from "../db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { country } = ctx.params;

    const countries = await queryEntriesAndHandleTypes(
      `SELECT * FROM radio_table WHERE Country LIKE '%${country}%'`,
    );

    return new Response(JSON.stringify(countries));
  },
};
