/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="es2015" />
import "https://esm.sh/leaflet";
import L from "https://esm.sh/leaflet";

drawMap();

async function drawMap() {
  let activeCountry = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];

  const btn = document.getElementById("goBtn")!;
  btn.onclick = () => {
    window.location.href = `/byCountry/${activeCountry}`;
  };
  const latlng = await getLatLng(activeCountry);
  const map = L.map("map");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let activeMark = L.marker(latlng).addTo(map)
    .bindPopup(`Selected '${activeCountry}'`)
    .openPopup();

  map.setView(latlng, 4);
  map.on(
    "click",
    async (ev) => {
      activeMark.remove();
      const result = await onMapClick(ev as L.LeafletMouseEvent);
      if (result) {
        activeMark = result[0];
        activeCountry = result[1];
      }
    },
  );
}

async function onMapClick(
  ev: L.LeafletMouseEvent,
): Promise<[L.Marker, string] | undefined> {
  const map: L.Map = ev.target;

  const activeCountry = await countryFromLatLng(ev.latlng);
  if (!activeCountry) {
    return;
  }
  const latlon = await getLatLng(activeCountry);
  const activeMark = L.marker(latlon).addTo(map)
    .bindPopup(`Selected '${activeCountry}'`)
    .openPopup();
  return [activeMark, activeCountry];
}

async function getLatLng(cn: string): Promise<[number, number]> {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/search.php?country=${cn}&format=json`,
  ).then((r) => r.json());
  const lat = resp[0].lat;
  const lon = resp[0].lon;
  return [parseFloat(lat), parseFloat(lon)];
}

async function countryFromLatLng(
  { lat, lng }: { lat: number; lng: number },
): Promise<string> {
  const url =
    // make sure we get english country names because that's what the database expects.
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`;
  return await fetch(url).then((r) => r.json()).then((r) =>
    r.address?.country || ""
  );
}
