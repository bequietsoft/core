import { log } from "./tools.js";
import * as THREE from "./three.module.js"

// import SW from "./sw.js";
import Renderer from "./renderer.js";
import World from "./world.js";
import Mouse from "./mouse.js";
import Keyboard from "./keyboard.js";
import Touchscreen from "./touchscreen.js";

class App {
	
	static init() {
        
        // #region variables
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

			//App.auth = false;
        // #endregion
		
		//SW.init();
        Renderer.init();
		World.init();
		
		//if (App.mobile) {

			Touchscreen.init();

		//} else {
			Mouse.init();
			Keyboard.init();
			Keyboard.keys.push({ code: "Backquote", event: "App.VR = !App.VR;" })
		//}

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

    static update() {
		
		requestAnimationFrame(App.update);

		if (App.mobile) {
			
			Touchscreen.update();

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