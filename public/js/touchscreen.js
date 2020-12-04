class TouchScreen {
	
	static init(root) {

		TouchScreen.root = root;
		root.TouchScreen = TouchScreen;

		TouchScreen.pos = [];
		TouchScreen.events = [];

		document.addEventListener("touchcancel", TouchScreen.oncancel.bind(this));
		document.addEventListener("touchstart", TouchScreen.onstart.bind(this));
		document.addEventListener("touchend", TouchScreen.onend.bind(this));
		document.addEventListener("touchmove", TouchScreen.onmove.bind(this));
		
		return this;
	}

	static update() {
		//console.log('touchscreen update');
	}

	static oncancel(event) {
		//console.log(event);
		//TouchScreen.process(event.type);
	}

	static onstart(event) {
		console.log(event);
		console.log(this);
	}

	static onend(event) {
		//console.log(event);
		//TouchScreen.process(event.type);
	}

	static onmove(event) {
		//log(event);
		//TouchScreen.process(event.type);
	}

	// static eval_in_context(callback, context) {
	// 	return function() { 
	// 		return eval(callback); 
	// 	}
	// 	.call(context);
	// }

	// static process(event_type) {
	// 	TouchScreen.events.forEach(event => {
    //         if(event.type == event_type) 
	// 			TouchScreen.eval_in_context(event.callback, event.context || this);
    //     });
	// }
}

export default TouchScreen;
		