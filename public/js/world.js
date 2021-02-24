// import * as THREE from "./three.module.js"
// import App from "./app.js";

// import Material from "./material-old.js";
import { mat } from "./material.js";
// import Vector from "./vector-old.js";
import { rndi, rndf } from "./rnd.js";
import Craft from "./craft.js";
import Person from "./person.js";
import App from "./app.js";
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

			World.camera.position.x -= 4;
			//World.camera.position.y += 1.3;
			World.camera.root.position.y += 1.4;
			//World.camera.root.rotateY(Math.PI/8);
			
			//World.camera.root.rotateY(-Math.PI/4);
			World.camera.target.rotateY(-Math.PI/1); 
			World.camera.target.rotateZ(-Math.PI/6); 
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
		//World.test_scene_00();
		//World.test_scene_01();
		//World.test_scene_02();
		//World.rnd_scene_01();
	}

	static test_scene_00() {
	
		let box = Craft.box(
			{width: 0.5, height: 0.5, length: 0.5 }
		);
		box.material =  mat(0xffffff, 'wire');
		box.castShadow = false;
		box.receiveShadow = false;
		box.position.y = 0.25;
		World.scene.add(box);
	}

	static test_scene_01() {
		
		let cc = 16;
		let nc = 16;

		let PI = Math.PI;
		let m_height = 1.6;
		let mh = m_height / 8;
		let marm = mh * 3;
		let mleg = mh * 4;

		// boxes
		for (let i=0; i<4; i++) {
			let box = Craft.box(mh * 3, mh, mh * 2, mat(0xffffff, 'wire'));
			box.position.y = i * mh * 2 + mh / 2;
			World.scene.add(box);
		}
		
								//width
										//height
												//length
														//cinc_cnt, nodes_cnt
																	//curve_k, form_k 
																				//cinc_base 
																						//smooth_normals
		let m_head = Craft.mesh( mh*0.75, mh, mh*0.9,   cc, nc,    	1.0, 0.25,	0.0,	0.75 );
			m_head.mesh.position.set(0.0, mh/6, 0.0);
			m_head.mesh.rotation.set(-0.4, 0.0, 0.0);

		let m_body = Craft.mesh( mh * 2.4, mh * 3 , mh,	cc, nc,    	0.3, 0.95,	0.05,	0.75 );
			m_body.mesh.position.y += m_height * 4 / 8;
			Craft.bendS(m_body, -1.5, 0.7, 0.3, 'X', 0.25);

		let m_larm = Craft.mesh( mh, marm , mh,			cc, nc,    	0.5, -0.6,	0.01,	0.75 );
			m_larm.mesh.position.set(0.00, -0.06, -0.025);
			m_larm.mesh.rotation.set(PI, 0.0, -PI/2);

		let m_rarm = Craft.mesh( mh, marm , mh,			cc, nc,    	0.5, -0.6,	0.01,	0.75 );
			m_rarm.mesh.position.set(0.00, -0.06, -0.025);
			m_rarm.mesh.rotation.set(0.0, 0.0, +PI/2);

		let m_lleg = Craft.mesh( mh, mleg , mh,		cc, nc,			0.5, -0.6,	0.03,	0.75 );
			m_lleg.mesh.position.set(+0.1, 0.12, 0.0);
			m_lleg.mesh.rotation.set(-0.2, 0.0, -PI);

		let m_rleg = Craft.mesh( mh, mleg , mh,		cc, nc,			0.5, -0.6,	0.03,	0.75 );
			m_rleg.mesh.position.set(-0.1, 0.12, 0.0);
			m_rleg.mesh.rotation.set(-0.2, 0.0, -PI);		
		

		let m_lhand = Craft.mesh( mh*0.1, mh*0.6, mh*0.3,   10, 10,    1.0, 1.0,    0.0,    0.75 );
			m_lhand.mesh.position.set(0.0, -mh/5, 0.0);
		let m_rhand = Craft.mesh( mh*0.1, mh*0.6, mh*0.3,   10, 10,    1.0, 1.0,    0.0,    0.75 );
			m_rhand.mesh.position.set(0.0, -mh/5, 0.0);

		// arms
		Craft.bend(m_larm, +PI/2.6, 'Z', 2, 6);
		Craft.bend(m_rarm, +PI/2.6, 'Z', 2, 6);
		Craft.bend(m_larm, -PI/12, 'X', cc/2-cc/8, cc/2+cc/8);
		Craft.bend(m_rarm, +PI/12, 'X', cc/2-cc/8, cc/2+cc/8);

		m_body.data.last_bone.add(m_head.mesh);
		m_body.data.last_bone.add(m_larm.mesh);
		m_body.data.last_bone.add(m_rarm.mesh);
		m_larm.data.last_bone.add(m_lhand.mesh);
		m_rarm.data.last_bone.add(m_rhand.mesh);
		m_body.data.first_bone.add(m_lleg.mesh);
		m_body.data.first_bone.add(m_rleg.mesh);
		
		
		World.scene.add(m_body.mesh);
	}

	static test_scene_02() {	
		let cinc_00 = Craft.bob( 0.15, 0.25, 0.2,    32, 32,    1.0, 0.25,    0.0,    0.5 );
			cinc_00.mesh.position.y += 0.5;
			//cinc_00.mesh.position.x += 0.1;
			//Craft.bendS(cinc_00, Math.PI/2, 'X', -Math.PI/4);
			//Craft.bendS(cinc_00, 2, 1, 0,5, 'X', 1);
			//Craft.bendS(cinc_00, -3, 1, 0.4, 'X', 0.9);
			
			World.scene.add(cinc_00.mesh);
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
