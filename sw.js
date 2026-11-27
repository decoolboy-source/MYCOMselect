// Cache Storage dùng chung cả origin decoolboy-source.github.io: chỉ xóa cache của chính app này.
const CACHE_PREFIX = "MYCOMselect-";
const CACHE_NAME = CACHE_PREFIX + "v6";
const ASSETS = [
  "./",
  "./index.html",
  "./nasa-ui.css",
  "./style.css",
  "./icons.js",
  "./app.js",
  "./data-io.js",
  "./oil.js",
  "./handbook-data.js",
  "./handbook.js",
  "./data.json",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
];

// While this app is still under active iteration, prefer fresh network fetches
// for everything except the heavier, rarely-changing icon files — this avoids
// getting stuck on a stale cached bug after a new version is deployed.
const CACHE_FIRST = ["icon-192.png", "icon-512.png", "icon-maskable-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // cache each asset individually so one failed fetch doesn't abort caching
      // of everything else (cache.addAll fails atomically on any single error)
      Promise.all(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn("SW: failed to cache", url, err))
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isCacheFirst(request) {
  const url = new URL(request.url);
  const path = url.pathname.split("/").pop();
  return CACHE_FIRST.includes(path);
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (isCacheFirst(event.request)) {
    // cache-first only for icons: rarely change, safe to serve instantly
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // network-first for everything else (HTML/CSS/JS/data): always fetch the
  // latest version; fall back to cache only when offline or the fetch fails
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
