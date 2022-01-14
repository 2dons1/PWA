// App Shell = core design of a website..
const version = 'v6';
const appShell = 'site-static' + "-" + version;
const dynamicCahce = 'site-dynamic' + "-" + version;

const staticAssets = [
    '/',
    'manifest.json',
    'index.html',
    'app.html',
    'fallback.html',
    'about.html',
    './js/app.js',
    './assets/site.css',
    './assets/img/android/android-launchericon-144-144.png'
];

// Listen for install event!
self.addEventListener('install', evt => {
    // Cache basic files(app shell).
    evt.waitUntil(caches.open(appShell).then(cache => {
        cache.addAll(staticAssets);
    }));
});

//  Listen for service worker activation!
self.addEventListener('activate', evt => {
    // Delete old caches
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== appShell && key !== dynamicCahce)
                .map(key => caches.delete(key))
            )
        })
    );
});

// Listen for a fetch event!
self.addEventListener('fetch', evt => {
    // If a fetch request is already cached get the result from cache instead of making a request to the server.
    evt.respondWith(
        caches.match(evt.request).then(cacheResponse => {
            return cacheResponse || fetch(evt.request).then(fetchResponse => {
                return caches.open(dynamicCahce).then(cache => {
                    cache.put(evt.request.url, fetchResponse.clone());
                    return fetchResponse;
                })
            });
        }).catch(() => { // If we are offline and .html file is requested send back the fallback.html.
            if(evt.request.url.indexOf('.html') > - 1){
                return caches.match('fallback.html');
            }
        })
    );
});