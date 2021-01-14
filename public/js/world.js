// import * as THREE from "./three.module.js"
// import App from "./app.js";

// import Material from "./material-old.js";
import { mat } from "./material.js";
// import Vector from "./vector-old.js";
import { rndi, rndf } from "./rnd.js";
import Craft from "./craft.js";
import Person from "./person.js";
//import { Material } from "./three.module.js";

class World {

	static init(App) {
		
		World.App = App;
		App.World = World;

		let THREE = App.THREE;

		World.scene = new THREE.Scene();
		World.scene.background = new THREE.Color( App.fog_color );
		World.scene.fog = new THREE.Fog( App.fog_color, 10, 50 );

		World.hemiLight = new THREE.HemisphereLight( 0xf8f8ff, 0xffffff, 0.5 );
			World.hemiLight.position.set( 0, 20, 0 );
		
		World.dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			World.dirLight.position.set( 3, 10, 10 );
			World.dirLight.castShadow = true;
			World.dirLight.shadow.camera.top = 2;
			World.dirLight.shadow.camera.bottom = - 2;
			World.dirLight.shadow.camera.left = - 2;
			World.dirLight.shadow.camera.right = 2;
			World.dirLight.shadow.camera.near = 0.1;
			World.dirLight.shadow.camera.far = 40;

		// ground
		World.root = new THREE.Object3D();
		World.ground = new THREE.Mesh( 
			new THREE.PlaneBufferGeometry( 100, 100 ), 
			new THREE.MeshPhongMaterial( { color: App.ground_color, depthWrite: false } ) );
			World.ground.rotation.x = - Math.PI / 2;
			World.ground.receiveShadow = true;
				
		World.camera = new THREE.PerspectiveCamera();
			World.camera.root = new THREE.Object3D();
			World.camera.target = new THREE.Object3D();
			World.camera.root.add(World.camera.target);
			World.camera.target.add(World.camera);
		
		World.cameraDirLight = new THREE.DirectionalLight( 0xffffaa, 0.1 );
		World.camera.add(World.cameraDirLight);		
		World.cameraDirLight.target = World.camera.target;

			World.camera.position.x -= 3;
			//World.camera.root.rotateY(Math.PI/8);
			
			//World.camera.root.rotateY(-Math.PI/4);
			World.camera.target.rotateY(-Math.PI/2); 
			World.camera.target.rotateZ(-Math.PI/8); 
			World.camera.lookAt(World.camera.root.position);

		World.scene.add(World.hemiLight);
		World.scene.add(World.dirLight);
		World.root.add(World.ground);
		World.scene.add(World.root);
		World.scene.add(World.camera.root);

		World.avatar = new Person(World.camera.root);
		World.avatar.set_pose_01();
		
		//World.camera.root.position.y += 0.5;

		//World.add_helpers();
		//World.demo_scene_00();
		World.demo_scene_01();
		//World.rnd_scene_01();
	}

	static demo_scene_00() {
	
		let box = Craft.box(
			{width: 0.5, height: 0.5, length: 0.5 }
		);
		box.material =  mat(0xffffff, 'wire');
		box.castShadow = false;
		box.receiveShadow = false;
		box.position.y = 0.25;
		World.scene.add(box);
	}

	static demo_scene_01() {
		
		let cinc1 = Craft.cincture_generator_01( {width: 0.3, height: 0.5, length: 0.5 }, 8);
		//let cinc2 = Craft.cincture_generator_01( {width: 0.5, height: 0.5, length: 0.5 }, 4);
		
		// let cinc3 = Craft.cincture_generator_01( {width: 0.01, height: 0.5, length: 0.5 } );
		
		World.scene.add(cinc1.mesh);
		//World.scene.add(cinc2.mesh);
		
		// World.scene.add(cinc3.mesh);
		
		// cinc.mesh.position.x += 0.5;
		// cinc.mesh.position.y += 0.5;
		// cinc.mesh.rotation.z += Math.PI/2;
	}

	static rnd_scene_01() {

		for(let i=0; i<100; i++) {
			let type = rndi(0, 1);
			if (type == 0) {
				let height = rndf(0.1, 1.0);
				let obj = Craft.box(
					{width: rndf(0.1, 1.0), height: height, length: rndf(0.1, 1.0)},
					{x: rndf(-20, +20), y: height/2, z: rndf(-20, +20)});
				mesh.position.set(position.x, position.y, position.z);
				mesh.rotation.set(rotation.x, rotation.y, rotation.z);
				World.scene.add(obj);
			}
		}
	}

	static add_helpers() {
		//World.root.add(Craft.helper(0.02, 0.02, 0.02, "red"));
		let h1 = Craft.helper({ width: 0.1, height: 0.1, length:0.1 }, 0xff0000);
		World.camera.root.add(h1);
		//World.camera.target.add(Craft.helper(0.05, 0.05, 0.05, "blue"));
	}

}

export default World;
