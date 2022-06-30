// Script to compile static/map.ts to static/map.js
// Run after any changes to static/map.ts
// deno task compile-map
import { emit } from "https://deno.land/x/emit@0.3.0/mod.ts";

const compileMap = async () => {
  const emitResult = await emit("static/map.js");
  const mapJs = emitResult[new URL("static/map.js", import.meta.url).href];
  await Deno.writeTextFile("static/map.js", mapJs);
};

await compileMap();
