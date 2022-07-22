import { Handlers } from "$fresh/server.ts";
import { queryEntriesAndHandleTypes } from "../db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { name } = ctx.params;

    const countries = await queryEntriesAndHandleTypes(
      `SELECT * FROM radio_table WHERE Name LIKE '%${name}%'`,
    );

    return new Response(JSON.stringify(countries));
  },
};
