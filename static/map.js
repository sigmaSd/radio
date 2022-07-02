// This file is generated by compileMap.ts
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="es2015" />
import "https://esm.sh/leaflet";
import L from "https://esm.sh/leaflet";
drawMap();
async function drawMap() {
  let activeCountry =
    Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1];
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
  let activeMark = L.marker(latlng).addTo(map).bindPopup(
    `Selected '${activeCountry}'`,
  ).openPopup();
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
  const activeMark = L.marker(latlon).addTo(map).bindPopup(
    `Selected '${activeCountry}'`,
  ).openPopup();
  return [
    activeMark,
    activeCountry,
  ];
}
async function getLatLng(cn) {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/search.php?country=${cn}&format=json`,
  ).then((r) => r.json());
  const lat = resp[0].lat;
  const lon = resp[0].lon;
  return [
    parseFloat(lat),
    parseFloat(lon),
  ];
}
async function countryFromLatLng({ lat, lng }) {
  const url =
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  return await fetch(url).then((r) => r.json()).then((r) => r.address.country);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tcmNvb2wvZGV2L2Rlbm8vZnJlc2gvcmFkaW8yL3N0YXRpYy9tYXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2Ugbm8tZGVmYXVsdC1saWI9XCJ0cnVlXCIgLz5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTVcIiAvPlxuaW1wb3J0IFwiaHR0cHM6Ly9lc20uc2gvbGVhZmxldFwiO1xuaW1wb3J0IEwgZnJvbSBcImh0dHBzOi8vZXNtLnNoL2xlYWZsZXRcIjtcblxuZHJhd01hcCgpO1xuXG5hc3luYyBmdW5jdGlvbiBkcmF3TWFwKCkge1xuICBsZXQgYWN0aXZlQ291bnRyeSA9IEludGwuRGF0ZVRpbWVGb3JtYXQoKVxuICAgIC5yZXNvbHZlZE9wdGlvbnMoKVxuICAgIC50aW1lWm9uZS5zcGxpdChcIi9cIilbMV07XG5cbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb0J0blwiKSE7XG4gIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9ieUNvdW50cnkvJHthY3RpdmVDb3VudHJ5fWA7XG4gIH07XG4gIGNvbnN0IGxhdGxuZyA9IGF3YWl0IGdldExhdExuZyhhY3RpdmVDb3VudHJ5KTtcbiAgY29uc3QgbWFwID0gTC5tYXAoXCJtYXBcIik7XG5cbiAgTC50aWxlTGF5ZXIoXCJodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ1wiLCB7XG4gICAgYXR0cmlidXRpb246XG4gICAgICAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnLFxuICB9KS5hZGRUbyhtYXApO1xuXG4gIGxldCBhY3RpdmVNYXJrID0gTC5tYXJrZXIobGF0bG5nKS5hZGRUbyhtYXApXG4gICAgLmJpbmRQb3B1cChgU2VsZWN0ZWQgJyR7YWN0aXZlQ291bnRyeX0nYClcbiAgICAub3BlblBvcHVwKCk7XG5cbiAgbWFwLnNldFZpZXcobGF0bG5nLCA0KTtcbiAgbWFwLm9uKFxuICAgIFwiY2xpY2tcIixcbiAgICBhc3luYyAoZXYpID0+IHtcbiAgICAgIGFjdGl2ZU1hcmsucmVtb3ZlKCk7XG4gICAgICBbYWN0aXZlTWFyaywgYWN0aXZlQ291bnRyeV0gPSBhd2FpdCBvbk1hcENsaWNrKGV2IGFzIEwuTGVhZmxldE1vdXNlRXZlbnQpO1xuICAgIH0sXG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9uTWFwQ2xpY2soXG4gIGV2OiBMLkxlYWZsZXRNb3VzZUV2ZW50LFxuKTogUHJvbWlzZTxbTC5NYXJrZXIsIHN0cmluZ10+IHtcbiAgY29uc3QgbWFwOiBMLk1hcCA9IGV2LnRhcmdldDtcbiAgY29uc3QgYWN0aXZlQ291bnRyeSA9IGF3YWl0IGNvdW50cnlGcm9tTGF0TG5nKGV2LmxhdGxuZyk7XG4gIGNvbnN0IGxhdGxvbiA9IGF3YWl0IGdldExhdExuZyhhY3RpdmVDb3VudHJ5KTtcbiAgY29uc3QgYWN0aXZlTWFyayA9IEwubWFya2VyKGxhdGxvbikuYWRkVG8obWFwKVxuICAgIC5iaW5kUG9wdXAoYFNlbGVjdGVkICcke2FjdGl2ZUNvdW50cnl9J2ApXG4gICAgLm9wZW5Qb3B1cCgpO1xuICByZXR1cm4gW2FjdGl2ZU1hcmssIGFjdGl2ZUNvdW50cnldO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRMYXRMbmcoY246IHN0cmluZyk6IFByb21pc2U8W251bWJlciwgbnVtYmVyXT4ge1xuICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaC5waHA/Y291bnRyeT0ke2NufSZmb3JtYXQ9anNvbmAsXG4gICkudGhlbigocikgPT4gci5qc29uKCkpO1xuICBjb25zdCBsYXQgPSByZXNwWzBdLmxhdDtcbiAgY29uc3QgbG9uID0gcmVzcFswXS5sb247XG4gIHJldHVybiBbcGFyc2VGbG9hdChsYXQpLCBwYXJzZUZsb2F0KGxvbildO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb3VudHJ5RnJvbUxhdExuZyhcbiAgeyBsYXQsIGxuZyB9OiB7IGxhdDogbnVtYmVyOyBsbmc6IG51bWJlciB9LFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgdXJsID1cbiAgICBgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZT9mb3JtYXQ9anNvbiZsYXQ9JHtsYXR9Jmxvbj0ke2xuZ31gO1xuICByZXR1cm4gYXdhaXQgZmV0Y2godXJsKS50aGVuKChyKSA9PiByLmpzb24oKSkudGhlbigocikgPT4gci5hZGRyZXNzLmNvdW50cnkpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVDQUF1QztBQUN2QywyQkFBMkI7QUFDM0IsOEJBQThCO0FBQzlCLE9BQU8sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxDQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkMsT0FBTyxFQUFFLENBQUM7QUFFVixlQUFlLE9BQU8sR0FBRztJQUN2QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQ3RDLGVBQWUsRUFBRSxDQUNqQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDO0lBRTFCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEFBQUMsQUFBQztJQUM5QyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQU07UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztLQUN0RCxDQUFDO0lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsYUFBYSxDQUFDLEFBQUM7SUFDOUMsTUFBTSxHQUFH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
