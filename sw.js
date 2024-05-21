const CACHE_NAME = 'app-cache-v2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './img/cenario.jpg',
    './img/inimigo.png',
    './img/iorix.png',
    './img/kyo.png',
    './img/orochi-chris.png',
    './css/cenario.css',
    './css/heroi.css',
    './css/inimigo.css',
    './css/loading.css',
    './css/main.css',
    './css/menu.css',
    './css/controle.css',
    './css/responsivo.css',
    './js/app.js',
    './factory/Personagem.js',
    './factory/PersonagemFactory.js',
    './js/cenario/Cenario.js',
    './js/menu/controle.js',
    './js/personagens/inimigo.js',
    './js/personagens/kyo.js',
    './js/menu/loading.js',
    './js/menu/Menu.js',
    './js/MonitorarPerformance.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});


self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

 