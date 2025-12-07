const CACHE_NAME = 'trade-simple-v8'; // FINAL CACHE VERSION
const urlsToCache = [
    '/', 
    '/index.html',
    '/logo.png',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11' // Cache SweetAlert2
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Service Worker: Failed to cache assets:', err);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate Event (Cleanup)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache: ' + cacheName);
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
});