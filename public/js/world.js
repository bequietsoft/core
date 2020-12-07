// import * as THREE from "./three.module.js"
// import App from "./app.js";

// import Material from "./material-old.js";
// import { mat, tmat } from "./material_v2.js";
// import Vector from "./vector-old.js";
import Craft from "./craft.js";

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
			World.camera.position.x -= 3;
			World.camera.root.rotateY(Math.PI/8);
			
			//App.camera.root.rotateY(-Math.PI/4);
			World.camera.target.rotateZ(-Math.PI/8); 
			World.camera.lookAt(World.camera.root.position);

		World.scene.add(World.hemiLight);
		World.scene.add(World.dirLight);
		World.root.add(World.ground);
		World.scene.add(World.root);
		World.scene.add(World.camera.root);

		//World.camera.root.position.y += 0.5;

		//World.add_helpers();
		World.demo_start();
	}

	static demo_start() {
		World.demo_scene_01();
	}

	static demo_scene_01() {
		
		let cinc1 = Craft.cincture_generator_01();
		let cinc2 = Craft.cincture_generator_01({ type: 'wire'});
		
		World.scene.add(cinc1.mesh);
		World.scene.add(cinc2.mesh);
		
		// cinc.mesh.position.x += 0.5;
		// cinc.mesh.position.y += 0.5;
		// cinc.mesh.rotation.z += Math.PI/2;
	}

	static add_helpers() {
		World.root.add(Craft.helper(0.2, 0.2, 0.2, "red"));
		World.camera.root.add(Craft.helper(0.3, 0.3, 0.3, "green"));
		World.camera.target.add(Craft.helper(0.5, 0.5, 0.5, "blue"));
	}

}

export default World;
