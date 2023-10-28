import { StationType } from "@/interfaces/station.ts";

const createRadioDb = async (arg?: string) => {
  // create the db folder
  try {
    await Deno.mkdir("./static_server/db");
  } catch (e) {
    if (e instanceof Deno.errors.AlreadyExists) {
      /**/
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
      console.log("database is up to date");
    } else {
      console.log("database is outdated");
    }
    return;
  }

  let size = (await fetch("https://de1.api.radio-browser.info/json/stations"))
    .headers.get("content-length");
  if (size) size = formatBytes(parseFloat(size));

  console.log(
    `%cfetching the latest radio database (${size})`,
    "color:green",
  );
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

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " +
    sizes[i];
}

if (import.meta.main) {
  await createRadioDb(Deno.args[0]);
}
