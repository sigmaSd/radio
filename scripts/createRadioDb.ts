import {} from "https://deno.land/x/simple_shell@0.9.0/src/stringUtils.ts";

const createRadioDb = async () => {
  // create the db folder
  try {
    await Deno.mkdir("./static/db");
  } catch (e) {
    if (e instanceof Deno.errors.AlreadyExists) {
      console.log("db folder already exists");
    } else {
      throw e;
    }
  }

  // fetch the json db
  if ("./static/db/db.json".pathExists()) {
    console.log("db.json already exists");
  } else {
    await (await fetch("https://de1.api.radio-browser.info/json/stations")).body
      ?.pipeTo((await Deno.create("./static/db/db.json")).writable);
  }
  // convert it to sqlite
  await jsonToSqlite(
    {
      jsonDbPath: "./static/db/db.json",
      sqliteDbPath: "./static/db/db.sqlite",
      tableName: "radio_table",
      jsonToCsvFn: (db: { name: string; country: string; url: string }[]) => {
        const sanitize = (str: string) => str.replaceAll("\n", " ");
        return "Name,Country,Url\n" +
          db.filter((s) => s.name.trim() && s.country.trim() && s.url.trim())
            .map(
              (station) => {
                return `${
                  sanitize(station.name.trim())
                },${station.country.trim()},${station.url.trim()}`;
              },
            ).join("\n");
      },
    },
  );
};

const jsonToSqlite = async (
  {
    jsonDbPath,
    jsonToCsvFn,
    sqliteDbPath,
    tableName,
  }: {
    jsonDbPath: string;
    sqliteDbPath: string;
    tableName: string;
    // deno-lint-ignore no-explicit-any
    jsonToCsvFn: (jsonDb: any) => string;
  },
) => {
  // convert it into csv
  const csvDbPath = `${jsonDbPath.replace(".json", "")}.csv`;
  if (csvDbPath.pathExists()) {
    console.log(`${csvDbPath} already exists`);
  } else {
    const db = JSON.parse(await Deno.readTextFile(jsonDbPath));
    const csv = jsonToCsvFn(db);
    await Deno.writeTextFile(csvDbPath, csv);
  }

  // convert it to sqlite
  if (sqliteDbPath.pathExists()) {
    console.log(`${sqliteDbPath} already exists`);
  } else {
    const sqlite3 = Deno.spawnChild("sqlite3", {
      args: [sqliteDbPath],
      stdin: "piped",
      stderr: "null", // required to make sqlite3 work
    });
    await sqlite3.stdin.getWriter().write(
      new TextEncoder().encode(
        `.mode csv\n.import ${csvDbPath} ${tableName}\n.quit\n
        `,
      ),
    );
    await sqlite3.status;
  }
};

if (import.meta.main) {
  await createRadioDb();
}
