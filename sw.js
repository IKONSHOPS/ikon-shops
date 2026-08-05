/* ============================================================
   IKON SHOPS — Service Worker (PWA Offline Support)
   ============================================================ */

const CACHE_NAME = 'ikon-shops-v1';
const ASSETS = [
  '/ikon-shops/',
  '/ikon-shops/index.html',
  '/ikon-shops/css/style.css',
  '/ikon-shops/js/app.js',
  '/ikon-shops/js/products.js',
  '/ikon-shops/js/store.js',
  '/ikon-shops/images/icon-192.png',
  '/ikon-shops/images/icon-512.png',
  '/ikon-shops/images/hoodie_cyberpunk.jpg',
  '/ikon-shops/images/cargo_holographic.jpg',
  '/ikon-shops/images/jersey_argentina.jpg',
  '/ikon-shops/images/jersey_realmadrid.jpg',
  '/ikon-shops/images/jersey_barcelona.jpg',
  '/ikon-shops/images/kurta_block.jpg',
  '/ikon-shops/images/upi_qr.jpg'
];

// Install — cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match('/ikon-shops/index.html'));
    })
  );
});
