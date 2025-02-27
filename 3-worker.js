// (A) SAVE PROJECT FILES INTO BROWSER CACHE
self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches
    .open("Hello")
    .then(cache => cache.addAll([
      "1-dummy.css",
      "1-dummy.html",
      "1-dummy.js",
      "2-manifest.json",
      "3-worker.js",
      "FAVICON.webp",
      "NOT.webp"
    ]))
    .catch(e => console.error(e))
  );
});

// (B) LOAD FILES FROM CACHE - FALLBACK TO NETWORK IF NECESSARY
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches
    .match(evt.request)
    .then(res => res || fetch(evt.request))
  );
});

// (C) OPTIONAL - CLAIM CONTROL INSTANTLY
self.addEventListener("activate", evt => self.clients.claim());