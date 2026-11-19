/* Service worker: офлайн-кэш приложения */
/* При каждом релизе поднимай версию (polski-v4, v5…), чтобы у пользователя
   обновился офлайн-кэш и не «залипал» старый код. */
const CACHE = "polski-v10";
const ASSETS = [
  "./",
  "./index.html",
  "./favicon.svg",
  "./data/days.js",
  "./data/vocab.js",
  "./data/curriculum.js",
  "./data/karta_cards.js",
  "./srs.js",
  "./store.js",
  "./practice.js",
  "./lessons.js",
  "./program.js",
  "./karta.js",
  "./sobes.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      /* кэшируем каждый файл отдельно: один недостающий не ломает установку */
      Promise.all(ASSETS.map(a => c.add(a).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* stale-while-revalidate: отдаём из кэша, в фоне обновляем */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
