import { log } from "./tools.js";
import * as THREE from "./three.module.js"

import Renderer from "./renderer.js";
import World from "./world.js";
import Mouse from "./mouse.js";
import Keyboard from "./keyboard.js";
import TouchScreen from "./touchscreen.js";
import Gyro from "./gyro.js";


class App {
	
	static init() {
        
		// variables
		{	
			App.evals = [];

			App.debug = true;
			App.shadows = true;
			App.smooth = 1;
			App.ambient_color = new THREE.Color("rgb(200, 200, 200)");
			App.fog_color = new THREE.Color("rgb(240, 240, 240)");
			App.ground_color = new THREE.Color("rgb(200, 200, 200)");
			App.light_color = new THREE.Color("rgb(255, 255, 255)");
			App.shadow_map_size = 1024;
			App.shadow_camera_size = 20;
			App.near = 0.1;
			App.fov = 50;
			App.far = 50;
			App.fog = 0.99;
			App.VR = false;

			App.last_tic = performance.now();
			App.fps = 30;
		}

		App.sw_init();
		
		Renderer.init();
		World.init();
		
		App.input_init();

        App.onresize();
		App.update();
    }

    static onresize() {
		App.camera.aspect = window.innerWidth / window.innerHeight;
		App.camera.updateProjectionMatrix();
	}

	static onload() {

		log(document.URL);
		console.log(navigator);

		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			App.mobile = true;
			if ( navigator.platform === 'Win32') {
				log("Mobile platform (emulation)");
				App.ondeviceready();
			} else {
				log("Mobile platform");
				document.addEventListener("deviceready", App.ondeviceready, false);
			}
		} else {
			App.mobile = false;
			log("Browser platform");
			App.ondeviceready();
		}
    }
    
    static ondeviceready() {
		log("Device ready");
		App.init();
    }
	
	static check_fps_limit() {
		let ct = performance.now();
		let et = ct - App.last_tic;
		if (et < 1000 / App.fps) return false;
		App.last_tic = ct;
		return true;
	}

	static sw_init() {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.register('./serviceworker.js')
			.then(function(registration) {
				console.log('Service worker registration successful, scope is:', 
				registration.scope);
			})
			.catch(function(error) {
				console.log('Service worker registration failed, error:', 
				error);
			});
		}
	}

	static input_init(){
		if (App.mobile) {
			TouchScreen.init(this);
			// TouchScreen.events.push({ 
			// 	type: 'touchstart', callback: 'this.log(this.Gyro.sensor);', context: this
			// });
			//App.Gyro = Gyro;//
			Gyro.init(this);
		} else {
			
			Mouse.init(this);
			Keyboard.init(this);
			Keyboard.keys.push({ code: 'Backquote', event: 'App.VR = !App.VR;' });
		}
	}

	static eval_in_context(callback, context) {
		return function() { 
			return eval(callback); 
		}
		.call(context);
	}

	static call(event) {
		
		console.log(event);
		return;

		TouchScreen.events.forEach(event => {
            if(event.type == event_type) 
				TouchScreen.eval_in_context(event.callback, event.context || this);
        });
	}

    static update() {
		
		requestAnimationFrame(App.update);

		if (App.mobile) {
			TouchScreen.update();
			Gyro.update();
		} else {
			Mouse.update();
			App.camera.position.x += Mouse.wheel/10;
			if(Mouse.buttons[2]) {
				App.camera.root.rotation.y -= Mouse.dx/300;
				App.camera.target.rotation.z -= Mouse.dy/300;
			}
		}
		
		// if(Mouse.buttons[1]) { App.VR = !App.VR; }
		//console.log(App.camera.position);
		
		if (App.check_fps_limit()) 
			if (!App.VR) Renderer.update(); else Renderer.updateVR();
		
	}
}

export default App;

window.addEventListener("resize", App.onresize);
window.addEventListener("load", App.onload);
document.addEventListener('contextmenu', event => event.preventDefault());