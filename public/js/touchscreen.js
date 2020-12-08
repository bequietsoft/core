class TouchScreen {
	
	static init(App) {

		TouchScreen.App = App;
		App.TouchScreen = TouchScreen;

		TouchScreen.d = { x:0, y:0 };
		TouchScreen.last_pos = { x:-200, y:-200 };
		TouchScreen.curent_pos = { x:-200, y:-200 };
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
		//console.log(event);
		TouchScreen.touch = true;
		//console.log(this);
	}

	static onend(event) {
		//console.log(event);
		TouchScreen.touch = false;
		//TouchScreen.process(event.type);
	}

	static onmove(event) {
		
		let t = event.touches[0];

		TouchScreen.App.log(t.clientX + ' : ' + t.clientY);
		TouchScreen.curent_pos.x = t.clientX;
		TouchScreen.curent_pos.y = t.clientY;

		//if ()
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
		