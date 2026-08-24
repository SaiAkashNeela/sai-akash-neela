// Minimal cache-first with network fallback Service Worker
const CACHE_NAME = 'sai-akash-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const deletions = [];
      for (const name of cacheNames) {
        if (name !== CACHE_NAME) {
          deletions.push(caches.delete(name));
        }
      }
      return Promise.all(deletions);
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
