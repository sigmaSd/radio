import { Webview } from "https://deno.land/x/webview@0.7.6/mod.ts";

const worker = new Worker(
  import.meta.resolve("./main.ts"),
  { type: "module" },
);

await new Promise((r) => setTimeout(r, 1000));
const webview = new Webview();

webview.navigate("http://localhost:8000/");
webview.run();

worker.terminate();
