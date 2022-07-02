import {} from "https://deno.land/x/simple_shell@0.9.0/src/stringUtils.ts";
import { StationDBType } from "../routes/api/db/db.ts";

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
      sqliteTableConstructor:
        "CREATE TABLE radio_table(name TEXT, country TEXT, language TEXT, votes INT, url TEXT, favicon TEXT)",
      jsonToCsvFn: (
        db: StationDBType[],
      ) => {
        const sanitize = (str: string) =>
          str.trim().replaceAll("\n", " ").replaceAll(",", " ");
        return db.filter((s) => s.name.trim() && s.url.trim())
          .map(
            (station) => {
              return (
                sanitize(station.name) + "," +
                sanitize(station.country) + "," +
                sanitize(station.language) + "," +
                station.votes + "," +
                sanitize(station.url) + "," +
                sanitize(station.favicon)
              );
            },
          ).join("\n");
      },
    },
  );
};

/**
 * @description
 * convert a json db to csv and then to sqlite
 *
 * @note
 * `sqliteTableConstructor` is a string that is used to create the table, if it is specified the csv file *should not* contain a header row.
 * if it's not specified then the csv file *must* contain a header row so it can be used to infer the column names.
 */
const jsonToSqlite = async (
  {
    jsonDbPath,
    jsonToCsvFn,
    sqliteDbPath,
    sqliteTableConstructor,
    tableName,
  }: {
    jsonDbPath: string;
    sqliteDbPath: string;
    tableName: string;
    sqliteTableConstructor?: string;
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
        ".mode csv\n" +
          (sqliteTableConstructor ? `${sqliteTableConstructor};\n` : "") +
          `.import ${csvDbPath} ${tableName}\n` +
          ".exit\n",
      ),
    );
    await sqlite3.status;
  }
};

if (import.meta.main) {
  await createRadioDb();
}
