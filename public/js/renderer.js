import * as THREE from "./three.module.js"
import App from "./app.js";

export default class Renderer  {

	static init() {

		var renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.depth = App.far;
			renderer.setClearColor(App.ambient_color, 1);
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFShadowMap;
			renderer.shadowMapBias = 0.00001;
			renderer.shadowMapDarkness = 0.5;
			renderer.shadowMapWidth = 128;
			renderer.shadowMapHeight = 128;
			renderer.domElement.id = "canvas";

		document.body.appendChild(renderer.domElement);
		Renderer.instance = renderer;
		Renderer.instance.domElement.hidden = true;

		// Renderer.VR = false;
	}
	
	static resize() {
		if(Renderer.width != window.innerWidth || Renderer.height != window.innerHeight) {
			Renderer.width = window.innerWidth;
			Renderer.height = window.innerHeight;
			
			Renderer.instance.setSize(Renderer.width, Renderer.height);
			if (Renderer.instance.domElement.hidden) Renderer.instance.domElement.hidden = false;
		}
	}

	static update() {
		Renderer.resize();
		Renderer.instance.clear();
		let width = Renderer.width;
		let height = Renderer.height;

		Renderer.instance.setViewport(0, 0, width, height);
		Renderer.instance.setScissor(0, 0, width, height);
		Renderer.instance.render(App.scene, App.camera);
	}

	static updateVR() {
		Renderer.resize();
		Renderer.instance.clear();
		let width = Renderer.width;
		let height = Renderer.height;

		Renderer.instance.setScissorTest( true );

		Renderer.instance.setViewport(0, 0, width/2, height);
		Renderer.instance.setScissor(0, 0, width/2, height);
		App.camera.root.rotateY(-0.1);
		Renderer.instance.render(App.scene, App.camera);
		
		Renderer.instance.setViewport(width/2, 0, width/2, height);
		Renderer.instance.setScissor(width/2, 0, width/2, height);
		App.camera.root.rotateY(+0.2);
		Renderer.instance.render(App.scene, App.camera);
		App.camera.root.rotateY(-0.1);
	}

	// static switch_vr() {
	// 	Renderer.VR = !Renderer.VR;
	// 	console.log('VR: ' + Renderer.VR);
	// }
}


