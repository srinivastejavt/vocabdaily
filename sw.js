// VocabDaily Service Worker — Offline-first caching
const CACHE_NAME = 'vocabdaily-v3';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/words.js',
    '/slang.js',
    '/idioms.js',
    '/storage.js',
    '/api.js',
    '/tts.js',
    '/chat.js',
    '/quiz.js',
    '/spaced-repetition.js',
    '/achievements.js',
    '/search.js',
    '/voice-input.js',
    '/daily-challenge.js',
    '/data-manager.js',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Install — cache all static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch — cache-first for static assets, network-first for API calls
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Network-first for Dictionary API calls (so we get fresh data when online)
    if (url.hostname === 'api.dictionaryapi.dev') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cache successful API responses
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fall back to cached API response if offline
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Cache-first for everything else (static assets)
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request).then((response) => {
                // Don't cache non-success or opaque responses
                if (!response || response.status !== 200 || response.type === 'opaque') {
                    return response;
                }

                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone);
                });
                return response;
            });
        }).catch(() => {
            // Ultimate fallback for navigation requests
            if (event.request.mode === 'navigate') {
                return caches.match('/index.html');
            }
        })
    );
});
