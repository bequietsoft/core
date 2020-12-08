import * as THREE from "./three.module.js"
import * as V from "./vectors.js";
// import { rndf } from "./rnd.js"; //let rndf1 = rndf;
import Renderer from "./renderer.js";
import World from "./world.js";
import Mouse from "./mouse.js";
import Keyboard from "./keyboard.js";
import TouchScreen from "./touchscreen.js";
import Gyro from "./gyro.js";


class App {
	
	static init() {
        
		// global app variables
		{	
			App.THREE = THREE;
			App.V = V;

			// App.evals = [];

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

			App.last_tic = performance.now();
			App.fps = 30;
		}

		App.service_worker_init();

		Renderer.init(this);
		World.init(this);
		
		App.input_inits(this);

        App.onresize();
		App.update();
    }

    static onresize() {
		App.World.camera.aspect = window.innerWidth / window.innerHeight;
		App.World.camera.updateProjectionMatrix();
	}

	static onload() {
		
		App.log(document.URL);
		App.log(navigator);

		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			App.mobile = true;
			if (navigator.platform === 'Win32') {
				App.log("Mobile platform (emulation)");
				App.ondeviceready();
			} else {
				log("Mobile platform");
				document.addEventListener("deviceready", App.ondeviceready, false);
			}
		} else {
			App.mobile = false;
			App.log("Browser platform");
			App.ondeviceready();
		}
    }
    
    static ondeviceready() {
		App.log("Device ready");
		App.init();
    }

	static check_fps_limit() {
		let ct = performance.now();
		let et = ct - App.last_tic;
		if (et < 1000 / App.fps) return false;
		App.last_tic = ct;
		return true;
	}

	static service_worker_init() {
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

	static input_inits(App){
		if (App.mobile) {
			TouchScreen.init(App);
			Gyro.init(App);
		} else {
			Mouse.init(App);
			Keyboard.init(App);
			
			// user inputs
			Keyboard.keys.push({ code: 'Backquote', callback: 'App.VR = !App.VR;' });
			Keyboard.keys.push({ code: 'Digit2', callback: 'console.log(App.World.camera);' });

			Keyboard.keys.push({ code: 'KeyW', callback: 'App.move(+0.1, 0, 0)' });
			Keyboard.keys.push({ code: 'KeyS', callback: 'App.move(-0.1, 0, 0)' });
		}
	}

	static move(x, y, z) {
		// let dx = App.World.camera.root.position.x - App.World.camera.position.x;
		// let dz = App.World.camera.root.position.z - App.World.camera.position.z;
		// let mv = App.V.NV(App.V.V(dx, 0, dz));
		// console.log(mv);
		// App.World.camera.root.position.x += mv.x;
		// App.World.camera.root.position.z += mv.z;

		let mv = App.V.V(x, y, z);
		console.log(mv);

		let ra = App.World.camera.root.rotation.y * 180 / Math.PI;
		console.log(ra);
		
		let rv = App.V.V(0, ra, 0);
		mv = App.V.RV(mv, rv);
		console.log(mv);

		// let np = App.V.AV(App.World.camera.root.position, mv);
		// App.World.camera.root.position.set(np.x, np.y, np.z);
	}
	

	static log(msg) {
	
		//msg = performance.now() + "\t" + msg;

		console.log(msg);

		if (typeof msg === 'object') return;//msg = msg.toString();
	
		var log_element = document.getElementById("log");
		
		if (log_element == undefined) { 
			log_element = document.createElement("div");
			log_element.id = 'log';
			log_element.style.position = 'absolute';
			// log.style.width = '100%';
			// log.style.height = '100%';
			log_element.style.backgroundColor = '0x0000FF';
			log_element.style.fontFamily = 'Consolas';
			log_element.style.fontSize = '10px';
			log_element.style.overflow = 'hidden';
			log_element.style.padding = '4px';
			document.body.appendChild(log_element);
		}
		
		if (log_element) {
			//log.innerHTML.replace('<h1>', '').replace('</h1>', ''); 
			//log.innerHTML = '<h1>' + msg + '</h1><br>' + log.innerHTML;
			log_element.innerHTML = msg + '<br>' + log_element.innerHTML;
		}
	}

	static call_in_context(callback, context) {
		return function() { return eval(callback); }
		.call(context);
	}

	static call(callback) {
		App.call_in_context(callback, this);
	}

    static update() {
		
		requestAnimationFrame(App.update);

		if (App.mobile) {
			TouchScreen.update();
			Gyro.update();
		} else {
			Mouse.update();
			App.World.camera.position.x += Mouse.wheel/10;
			if(Mouse.buttons[2]) {
				App.World.camera.root.rotation.y -= Mouse.dx/300;
				App.World.camera.target.rotation.z -= Mouse.dy/300;
			}
		}
		
		// if(Mouse.buttons[1]) { App.VR = !App.VR; }
		//console.log(App.camera.position);
		
		if (App.check_fps_limit()) 
			if (!App.Renderer.VR) 
				Renderer.update(); 
			else 
				Renderer.updateVR();
		
	}
}

export default App;

window.addEventListener("resize", App.onresize);
window.addEventListener("load", App.onload);

document.addEventListener('contextmenu', event => event.preventDefault());

