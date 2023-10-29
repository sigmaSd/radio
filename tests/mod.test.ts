import puppeteer from "npm:puppeteer";
import { assert } from "https://deno.land/std@0.201.0/assert/mod.ts";

const worker = new Worker(
  import.meta.resolve("../main.ts"),
  { type: "module" },
);

await new Promise((r) => setTimeout(r, 1000));

const browser = await puppeteer.launch({
  product: "firefox",
  executablePath: "firefox",
  headless: false,
});
const page = await browser.pages().then((ps) => ps[0]);

await page.goto("http://localhost:8000");

const h2 = await page.$("h2");
const stationsDiv = await page.evaluateHandle((element) => {
  return element!.parentElement!.children[1];
}, h2);

await page.evaluateHandle((element) => {
  (element!.children[0].children[0] as HTMLButtonElement).click();
}, stationsDiv);

const audioDiv = await page.$("#audio");
assert(audioDiv !== null);

await page.$("nav > ul > li.float-left:nth-child(3)").then((link) =>
  link!.click()
);

// await browser.close();
// worker.terminate();
