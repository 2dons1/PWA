// Register a service worker.
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => a = 1) // This runs if promise is resolved.
        .catch((err) => b = 1) // This runs if promise failes.
}