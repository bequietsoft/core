// class SW {
	
// 	static init() {
		
// 		navigator.serviceWorker.register('/sw.js')
// 		.then(reg => console.log('SW registered!', reg))
// 		.catch(err => console.log('Boo!', err));

		//console.log('ServiceWorker init');

		var cacheName = 'core-shell-content';
		var filesToCache = [
			'/js/*.js'
		];

		// console.log('app:');
		// console.log(self);

		self.addEventListener('install', function(event) {
			
			//console.log('ServiceWorker install');
			event.waitUntil(
				caches.open(cacheName).
				then(function(cache) {
					//console.log('ServiceWorker caching app shell');
					return cache.addAll(filesToCache);
				})
			);
		});
// 	}
// }

// export default SW;