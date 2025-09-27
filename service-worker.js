// service-worker.js - File basilare per abilitare l'installazione PWA
const CACHE_NAME = 'fashion-hair-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Aggiungi qui anche i link a FullCalendar e Firebase se vuoi l'accesso offline completo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});