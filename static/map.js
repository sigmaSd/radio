drawMap();
async function drawMap() {
  let activeCountry = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];
  const btn = document.getElementById("goBtn");
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
  map.on("click", async (ev) => {
    activeMark.remove();
    [activeMark, activeCountry] = await onMapClick(ev);
  });
}
async function onMapClick(ev) {
  const map = ev.target;
  const activeCountry = await countryFromLatLng(ev.latlng);
  const latlon = await getLatLng(activeCountry);
  const activeMark = L.marker(latlon).addTo(map)
    .bindPopup(`Selected '${activeCountry}'`)
    .openPopup();
  return [activeMark, activeCountry];
}
async function getLatLng(cn) {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/search.php?country=${cn}&format=json`,
  ).then((r) => r.json());
  const lat = resp[0].lat;
  const lon = resp[0].lon;
  return [parseFloat(lat), parseFloat(lon)];
}
async function countryFromLatLng({ lat, lng }) {
  const url =
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  return await fetch(url).then((r) => r.json()).then((r) => r.address.country);
}
