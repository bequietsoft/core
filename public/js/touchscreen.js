import { log } from "./tools.js";

class Touchscreen {
	
	static init() {
		console.log('touchscreen init');

		Touchscreen.pos = [];

		document.addEventListener("touchcancel", Touchscreen.oncancel.bind(this));
		document.addEventListener("touchstart", Touchscreen.onstart.bind(this));
		document.addEventListener("touchend", Touchscreen.onend.bind(this));
		document.addEventListener("touchmove", Touchscreen.onmove.bind(this));
	}

	static update() {
		//console.log('touchscreen update');
	}

	static oncancel(event) {
		log(event);
	}

	static onstart(event) {
		log(event);
	}

	static onend(event) {
		log(event);
	}

	static onmove(event) {
		log(event);
	}
}

export default Touchscreen;
		