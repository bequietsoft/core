export function log(msg) {
	//msg = performance.now() + "\t" + msg;
	if (typeof msg === 'object') msg = JSON.stringify(msg);
	console.log(msg);

	var log = document.getElementById("log");
	
	if (log == undefined) { 
		log = document.createElement("div");
		log.id = 'log';
		log.style.position = 'absolute';
		// log.style.width = '100%';
		// log.style.height = '100%';
		log.style.backgroundColor = '0x0000FF';
		log.style.fontFamily = 'Consolas';
		log.style.fontSize = '10px';
		log.style.overflow = 'hidden';
		log.style.padding = '4px';
		document.body.appendChild(log);
	}
	
	if (log) {
		//log.innerHTML.replace('<h1>', '').replace('</h1>', ''); 
		//log.innerHTML = '<h1>' + msg + '</h1><br>' + log.innerHTML;
		log.innerHTML = msg + '<br>' + log.innerHTML;
	}
}

// random float value
export function rndf(min, max) {
    return Math.random() * (max - min) + min;
}

// random int value
export function rndi(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// clamp value
export function clamp( v, a, b ) {
	if ( v > b ) return b;
	if ( v < a ) return a;
	return v;
}

// convert degrees to radians
export function d2r( deg ) {
	return deg * Math.PI / 180;
}