const CACHE_NAME = 'kejawan-digital-v1';
// Daftar file sing arep disimpen nang HP warga ben iso offline
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/gerak.js',
  // Nek kowe duwe gambar, lebokno sisan jenenge nang kene:
  // '/logo.png',
  // '/gambar-lomba.png'
];

// Proses Install: Nyimpen kabeh file nang "Gudang" (Cache)
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache berhasil dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Proses Fetch: Pas warga mbukak web, cek "Gudang" dhisik
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Nek file-e ono nang gudang, tampilno sing seko gudang (offline)
        if (response) {
          return response;
        }
        // Nek ora ono, nembe njupuk seko internet (online)
        return fetch(event.request);
      }
    )
  );
});
