export function log(m) {
	m = performance.now() + "\t" + m;
	console.log(m);
	var log = document.getElementById("log");
	if(log) log.innerHTML += m + "<br>";
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