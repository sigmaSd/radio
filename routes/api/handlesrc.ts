import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    let station: string = await req.text();

    const url = new URL(station);

    if (url.pathname.endsWith(".pls")) {
      const urlList = await fetch(station).then((res) => res.text());

      const plsStations = urlList.split("\n").filterMap((line) => {
        if (line.startsWith("File")) {
          return line.split("=")[1];
        }
      });

      if (plsStations[0]) {
        station = plsStations[0];
      }
    } else if (url.pathname.endsWith(".m3u")) {
      const urlList = await fetch(station).then((res) => res.text());

      const m3uStations = urlList.split("\n").filterMap((line) => {
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

      const asxStations = urlList.split("\n").filterMap((l) => {
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

declare global {
  interface Array<T> {
    filterMap<E>(f: (x: T) => E | undefined): E[];
  }
}
Array.prototype.filterMap = function <T, E>(f: (x: T) => E | undefined): E[] {
  return this.map(f).filter((x) => x) as E[];
};
