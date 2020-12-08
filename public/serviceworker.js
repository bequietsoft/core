var cache_name = 'core-shell-content-v0.1';
var files_to_cache = [
	'/css/style.css',
	'/js/three.module.js',
	'/js/app.js',
	'/js/rnd.js',
	'/js/renderer.js',
	'/js/world.js',
	'/js/mouse.js',
	'/js/keyboard.js',
	'/js/touchscreen.js',
	'/js/gyro.js',
	'/js/material.js',
	'/js/craft.js',
	'/js/cincture.js',
	'/js/vectors.js',
	'/manifest.json',
	'/images/icons/favicon.ico',
	'/images/icons/icon-192x192.png',
	'/index.html',
	'/'
];

console.log(self);

self.addEventListener('install', function(event) {
	//console.log('Service worker install event');
	event.waitUntil(
		caches.open(cache_name)
		.then((cache) => {
			console.log('Service worker install app shell');
			return cache.addAll(files_to_cache);
		})
	);
});

self.addEventListener('activate', function(event) {
	//console.log('Service worker activate');
	event.waitUntil(
		caches.keys()
		.then(keys =>{
			return Promise.all(keys.map(key => {
				if (key !== cache_name) return caches.delete(key);
			}))
		})
	);
});

self.addEventListener('fetch', function(event) {
	//console.log('Service worker fetch ', event.request.url);
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			return response || fetch(event.request);
		})
	);
});