// random float value
export function rndf(min, max) {
	return Math.random() * (max - min) + min;
}

// random int value
export function rndi(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default { rndf, rndi };

