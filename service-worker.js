/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-pwa-cache';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'images/icon-192x192.png',
  'images/icon-512x512.png',
];


self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened');
      cache.addAll(FILES_TO_CACHE).then(() => {
        console.log('Cache populated');
      });
    })
  );
});


self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Fetching from cache');
        return response;
      } else {
        console.log('Fetching from network');
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }
    })
  );
});