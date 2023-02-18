import { StationType } from "@/interfaces/station.ts";

const createRadioDb = async (arg?: string) => {
  // create the db folder
  try {
    await Deno.mkdir("./static_server/db");
  } catch (e) {
    if (e instanceof Deno.errors.AlreadyExists) {
      console.log("db folder already exists");
    } else {
      throw e;
    }
  }

  if (arg === "check-update") {
    const newDb = await fetch(
      "https://de1.api.radio-browser.info/json/stations",
    ).then((res) => res.json());
    const oldDb = await Deno.readTextFile("./static_server/db/db.json");
    if (newDb === oldDb) {
      console.log("db is up to date");
    } else {
      console.log("db is outdated");
    }
    return;
  }

  // fetch the json db
  await (await fetch("https://de1.api.radio-browser.info/json/stations")).body
    ?.pipeTo((await Deno.create("./static_server/db/db.json")).writable);

  // create a new db containing only the needed columns
  await Deno.writeTextFile(
    "./static_server/db/compressed_db.json",
    JSON.stringify(
      (await Deno.readTextFile("./static_server/db/db.json").then(JSON.parse))
        .map(
          (s: StationType) => {
            return {
              name: s.name,
              country: s.country,
              language: s.language,
              votes: s.votes,
              url: s.url,
              favicon: s.favicon,
            };
          },
        ),
    ),
  );
};

if (import.meta.main) {
  await createRadioDb(Deno.args[0]);
}
