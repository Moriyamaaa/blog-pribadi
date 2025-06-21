const CACHE_NAME = 'blog-json-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './login.html',
  './register.html',
  './reset.html',
  './profile.html',
  './css/style.css',
  './js/dashboard.js',
  './js/export.js',
  './js/statistics.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});