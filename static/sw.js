const cacheName = "myapp";
const offlinePage = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.add(offlinePage);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        return await fetch(event.request);
      } catch {
        // If no cache is available, respond with the offline page
        return caches.match(offlinePage);
      }
    })(),
  );
});
