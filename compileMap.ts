// Script to compile static/map.ts to static/map.js
// Run after any changes to static/map.ts

const compileMap = async () => {
  Deno.writeTextFileSync(
    "static/map.js",
    (await Deno.emit("static/map.ts"))
      .files[new URL("static/map.ts.js", import.meta.url).href].split(
        "\n",
      )
      .filter((l) => !l.startsWith("import")).join("\n"),
  );
};

await compileMap();
