const map = L.map("map");
let activeMark = undefined;
let activeCountry = undefined;
const btn = document.getElementById("goBtn");
btn.onclick = () => {
    window.location.href = `/byCountry/${activeCountry}`;
};
drawMap();
async function getLatLon(cn) {
    const resp = await fetch(`https://nominatim.openstreetmap.org/search.php?country=${cn}&format=json`).then((r) => r.json());
    const lat = resp[0].lat;
    const lon = resp[0].lon;
    return [parseFloat(lat), parseFloat(lon)];
}
async function drawMap() {
    const cn = Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split("/")[1];
    activeCountry = cn;
    const latlon = await getLatLon(cn);
    map.setView(latlon, 4);
    map.on("click", onMapClick);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    activeMark = L.marker(latlon).addTo(map)
        .bindPopup(`Selected '${cn}'`)
        .openPopup();
}
async function onMapClick(e) {
    const cn = await countryFromLatLng(e.latlng);
    activeCountry = cn;
    const latlon = await getLatLon(cn);
    activeMark.remove();
    activeMark = L.marker(latlon).addTo(map)
        .bindPopup(`Selected '${cn}'`)
        .openPopup();
}
async function countryFromLatLng({ lat, lng }) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return await fetch(url).then((r) => r.json()).then((r) => r.address.country);
}
