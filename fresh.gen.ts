// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/api/db/bycountry/[country].ts";
import * as $2 from "./routes/api/db/bylanguage/[language].ts";
import * as $3 from "./routes/api/db/byname/[name].ts";
import * as $4 from "./routes/api/db/topclick.ts";
import * as $5 from "./routes/api/handlesrc.ts";
import * as $6 from "./routes/byCountry/[country].tsx";
import * as $7 from "./routes/fav.tsx";
import * as $8 from "./routes/index.tsx";
import * as $9 from "./routes/map.tsx";
import * as $10 from "./routes/search.tsx";
import * as $11 from "./routes/top.tsx";
import * as $$0 from "./islands/FavStations.tsx";
import * as $$1 from "./islands/StatioMain.tsx";
import * as $$2 from "./islands/StationSearch.tsx";
import * as $$3 from "./islands/Stations.tsx";
import * as $$4 from "./islands/TopStations.tsx";

const manifest = {
  routes: {
    "./routes/_app.tsx": $0,
    "./routes/api/db/bycountry/[country].ts": $1,
    "./routes/api/db/bylanguage/[language].ts": $2,
    "./routes/api/db/byname/[name].ts": $3,
    "./routes/api/db/topclick.ts": $4,
    "./routes/api/handlesrc.ts": $5,
    "./routes/byCountry/[country].tsx": $6,
    "./routes/fav.tsx": $7,
    "./routes/index.tsx": $8,
    "./routes/map.tsx": $9,
    "./routes/search.tsx": $10,
    "./routes/top.tsx": $11,
  },
  islands: {
    "./islands/FavStations.tsx": $$0,
    "./islands/StatioMain.tsx": $$1,
    "./islands/StationSearch.tsx": $$2,
    "./islands/Stations.tsx": $$3,
    "./islands/TopStations.tsx": $$4,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
