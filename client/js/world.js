import * as THREE from "./three.module.js"
import App from "./app.js";
import Material from "./material.js";
import { mat, tmat } from "./material_v2.js";
import Vector from "./vector.js";
import Craft from "./craft.js";

class World {

	static init() {
		
		App.scene = new THREE.Scene();
		App.scene.background = new THREE.Color( App.fog_color );
		App.scene.fog = new THREE.Fog( App.fog_color, 10, 50 );

		App.hemiLight = new THREE.HemisphereLight( 0xf8f8ff, 0xffffff, 0.5 );
			App.hemiLight.position.set( 0, 20, 0 );
		
		App.dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			App.dirLight.position.set( 3, 10, 10 );
			App.dirLight.castShadow = true;
			App.dirLight.shadow.camera.top = 2;
			App.dirLight.shadow.camera.bottom = - 2;
			App.dirLight.shadow.camera.left = - 2;
			App.dirLight.shadow.camera.right = 2;
			App.dirLight.shadow.camera.near = 0.1;
			App.dirLight.shadow.camera.far = 40;

		// ground
		App.world = new THREE.Object3D();
		App.mesh = new THREE.Mesh( 
			new THREE.PlaneBufferGeometry( 100, 100 ), 
			new THREE.MeshPhongMaterial( { color: App.ground_color, depthWrite: false } ) );
			App.mesh.rotation.x = - Math.PI / 2;
			App.mesh.receiveShadow = true;
				
		App.camera = new THREE.PerspectiveCamera();
			App.camera.root = new THREE.Object3D();
			App.camera.target = new THREE.Object3D();
			App.camera.root.add(App.camera.target);
			App.camera.target.add(App.camera);
			App.camera.position.x -= 3;
			App.camera.root.rotateY(Math.PI/8);
			
			//App.camera.root.rotateY(-Math.PI/4);
			App.camera.target.rotateZ(-Math.PI/8); 
			App.camera.lookAt(App.camera.root.position);

		App.scene.add(App.hemiLight);
		App.scene.add(App.dirLight);
		App.world.add(App.mesh);
		App.scene.add(App.world);
		App.scene.add(App.camera.root);

		App.camera.root.position.y += 0.5;

		World.demo_start();
	}

	static demo_start() {
		//World.helpers();
		//World.demo_scene_01();
		//World.demo_scene_02();
		//World.demo_scene_03(1); // cincture_v1
		//World.demo_scene_04(1); // cincture_v2
		World.demo_scene_05(); // cincture_v2
	}

	static demo_scene_01() {
		var wm = Material.create("standard", 0xffffff);
		App.scene.add(
			Craft.box(2, 0.01, 2, Vector.create(0, 0.05, 0), Vector.zero, wm, true)
		);
	}

	static demo_scene_02() {
		var wm = Material.create("standard", 0xffffff);
		App.scene.add(
			Craft.sphere(1, Vector.create(0, 1, 0), Vector.zero, wm, true, 128)
		);
	}

	static demo_scene_03(object_cnt) {

		let wm = Material.create("standard", 0xffffff);

		//let object_cnt = 3;
		let step = 1.5;
		let offset = -((object_cnt-1) * step) / 2;

		for(let d=1; d<=object_cnt; d++) {
			let cinc = Craft.cincture_v1(d, App.scene, wm, 0, true);
			cinc.object.position.x = offset + (d-1) * step;
			//cinc.object.position.z = -1;
			App.scene.add(cinc.object);
		}
	}

	static demo_scene_04(object_cnt) {
		
		//let wm = tmat('../img/uvgrid.jpg');
		let wm = mat('standard', 0xffffff);
		//let wm = mat('wire', 0x000000);

		//let object_cnt = 3;
		let step = 1.5;
		let offset = -((object_cnt-1) * step) / 2;

		for(let d=1; d<=object_cnt; d++) {
			let cinc = Craft.cincture_v2(d, wm);
			App.scene.add(cinc.mesh);
			cinc.mesh.position.x = offset + (d-1) * step;

			// let cinc2 = Craft.cincture_v2(d, wm);
			// App.scene.add(cinc2.mesh);
			// cinc2.mesh.position.x = offset + (d-1) * step + 1;
			// cinc2.mesh.position.y += 1;
			// cinc2.mesh.rotation.z += Math.PI;

		}
	}

	static demo_scene_05() {
		let d = 2;
		let wm = mat('standard', 0xffffff);
		let cinc = Craft.cincture_v2(d, wm);
		App.scene.add(cinc.mesh);
		cinc.mesh.position.x += 0.5;
		cinc.mesh.position.y += 0.5;
		cinc.mesh.rotation.z += Math.PI/2;
	}

	static helpers() {
		Craft.helper();
		App.world.add(Craft.helper({color:0x00ff00}));
		App.camera.root.add(Craft.helper(0.5, 0.5, 0.5, "green"));
		App.camera.target.add(Craft.helper(0.5, 0.5, 0.5, "red"));
	}

}

export default World;
