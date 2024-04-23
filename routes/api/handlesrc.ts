import type { Handlers } from "$fresh/server.ts";
import {} from "@/static_server/deps.ts";

export const handler: Handlers = {
  async POST(req) {
    let station: string = await req.text();

    const url = new URL(station);

    if (url.pathname.endsWith(".pls")) {
      const urlList = await fetch(station).then((res) => res.text());

      const plsStations = urlList.lines().filterMap((line) => {
        if (line.startsWith("File")) {
          return line.split("=")[1];
        }
      });

      if (plsStations[0]) {
        station = plsStations[0];
      }
    } else if (url.pathname.endsWith(".m3u")) {
      const urlList = await fetch(station).then((res) => res.text());

      const m3uStations = urlList.lines().filterMap((line) => {
        if (line.startsWith("#")) {
          return;
        }
        return line;
      });

      if (m3uStations[0]) {
        station = m3uStations[0];
      }
    } else if (url.pathname.endsWith(".asx")) {
      const urlList = await fetch(station).then((res) => res.text());

      const asxStations = urlList.lines().filterMap((l) => {
        const line = l.toLowerCase().trim();

        if (line.startsWith("<ref")) {
          return line.split("href=")[1].split('"')[1];
        }
      });

      if (asxStations[0]) {
        station = asxStations[0];
      }
    }
    return new Response(station);
  },
};
