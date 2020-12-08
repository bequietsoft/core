import * as THREE from "./three.module.js"
import { mat } from "./material.js";
import { Cincture, default_cincture_data } from "./cincture.js";
//import { rndf } from "./rnd.js";

const default_material = mat(0xffffff, 'standard');
const default_size = {width: 0.5, height: 0.5, length: 0.5};
const v = {x: 0, y: 0, z: 0};

class Craft {

	static helper(size=default_size, color=0xff0000) {
		console.log(size);
		console.log(color);
		let material = mat(color, 'wire', false);
		let v = new THREE.Vector3(0, 0, 0);
		return Craft.box(size, v, v, material, false);
	}

	static box(
		size=default_size, 
		position=v, rotation=v, 
		material=default_material, 
		shadow=true) {
			//console.log(material);
		var geometry = new THREE.BoxGeometry(size.width, size.height, size.length);
		var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(position.x, position.y, position.z);
			mesh.rotation.set(rotation.x, rotation.y, rotation.z);
			mesh.castShadow = shadow;
			mesh.reciveShadow = shadow;
		return mesh;
	}

	static sphere(
		radius, devisions=8,
		position=v, rotation=v,
		material=default_material, 
		shadow=true) {
		var geometry = new THREE.SphereBufferGeometry(radius, devisions, devisions);
		var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(position.x, position.y, position.z);
			mesh.rotation.set(rotation.x, rotation.y, rotation.z);
			mesh.castShadow = shadow;
			mesh.reciveShadow = shadow;
		return mesh;
	}

	// static cincture_v1(d, scene, material, smooth = 0, shadow = false) {

	// 	let cinctures_cnt = 10 * d;
	// 	let spokes_cnt = 10 * d;
	// 	let cinctures = [];

	// 	let cinctures_base = 0.2 / d;
	// 	let cinctures_deviation = 0.0;	
	// 	let spokes_base = 0.5;
	// 	let spokes_deviation = 0.0;

	// 	for (let c=0; c < cinctures_cnt; c++) {
	// 		let spokes = [];
	// 		let k = Math.sin(Math.PI * c / (cinctures_cnt - 1));

	// 		for (let s=0; s < spokes_cnt; s++) {
	// 			let spoke = spokes_base + rndf(0, spokes_deviation);
	// 			spoke *= k;
	// 			spokes.push(spoke);
	// 		}
			
	// 		let offset_y = cinctures_base + rndf(0, cinctures_deviation);
	// 		if (c < 1 ) offset_y = 0.0;
	// 		offset_y *=  k;

	// 		let rotation_x = 0.0;//0.5 * k / d; //(rndf(0.2, 0.5) * k) / d;
	// 		cinctures.push(
	// 			new Cincture(spokes, [0.0, offset_y, 0.0], [rotation_x, 0.0, 0.0])
	// 		);
	// 	}
		
	// 	//console.log(cinctures);

	// 	return new CincturesObject(scene, material, cinctures, true, true, smooth, shadow);
	// }

	// static cincture_generator_01_old(d = 1, material) { 
		
	// 	let data = Object.assign( {}, default_cincture_data );
		
	// 	data.offsets = [];
	// 	data.rotates = [];
	// 	data.nodes = [];

	// 	//console.log(data);

	// 	let cinctures_cnt = 4 * d;
	// 	let spokes_cnt = 8 * d;

	// 	let cinctures_base = 0.4 / d;
	// 	let cinctures_deviation = 0.0;	
	// 	let spokes_base = 0.5;
	// 	let spokes_deviation = 0.0;
	// 	console.log('cinctures_cnt=' + cinctures_cnt);
		
	// 	for (let c=0; c < cinctures_cnt; c++) {
			
	// 		//let k = Math.sin(Math.PI * (c+1) / (cinctures_cnt));
	// 		let k = Math.sin(Math.PI * (c) / (cinctures_cnt-1));
	// 		for (let s=0; s < spokes_cnt; s++) {
	// 			let spoke = spokes_base + rndf(0, spokes_deviation);
	// 			spoke *= k;
	// 			data.nodes.push(spoke);
	// 		}
						
	// 		let offset_y = cinctures_base + rndf(0, cinctures_deviation);
	// 		//if (c < 0 ) offset_y = 0.0; 
	// 		offset_y *=  k;

	// 		let rotation_x = 0.0; //0.5 * k / d; //(rndf(0.2, 0.5) * k) / d;
			
	// 		data.offsets.push(0.0, offset_y, 0.0);
	// 		data.rotates.push(rotation_x, 0.0, 0.0);

	// 		console.log(
	// 			'c=' + c +
	// 			' spokes=' + (spokes_base * k).toFixed(2) + 
	// 			' offset=' + offset_y.toFixed(2) + 
	// 			' ' + k.toFixed(2) );
	// 	}

	// 	data.cap = { begin: false, end: false };
	// 	data.scale = 1;
	// 	data.material = material;
	// 	data.smooth = { normals: 0, vertices: 0 };

    //     return new Cincture_V2(data);	
	// }

	static cincture_generator_01(material=default_material) {
		
		let cinc = new Cincture();
			
			cinc.clear();

			cinc.data.material =  default_material;
			// cinc.data.subcincs = 4;
			// cinc.data.subnodes = 4;
			// cinc.data.helpers = 0.01;

			let cinctures_cnt = 2;
			let spokes_cnt = 4;
			let spoke_base = 0.35;
			
			for (let c=0; c < cinctures_cnt; c++) {
				
				for (let s=0; s < spokes_cnt; s++) cinc.data.nodes.push(spoke_base);

				//spoke_base += 0.1;

				if (c===0) 
					cinc.data.offsets.push(0.0, 0.0, 0.0);
				else 
					cinc.data.offsets.push(0.0, 0.5, 0.0);
				
				cinc.data.rotates.push(0.0, 0.0, 0.0);
			}

			cinc.build();

		return cinc;
	}

	// #region TODO

	// function plane(y, step, material, shadow = false) {
	// 	var geometry = new THREE.PlaneBufferGeometry(step * 10, step * 10, step, step);
	// 	var mesh = new THREE.Mesh(geometry, material);
	// 	mesh.rotation.x = - Math.PI / 2;
	// 	mesh.position.y = y;
	// 	mesh.receiveShadow = shadow;
	// 	return mesh;
	// }

	// function marker( position, color, size, div, visible ) {
	// 	let material = mat( 'basic', color );
	// 	let marker = sphere( size, position, V0, material, false, div );
	// 		marker.renderOrder = 999;
	// 		marker.visible = visible;
	// 		marker.onBeforeRender = function( renderer ) { renderer.clearDepth(); };
	// 	return marker;
	// }

	// #endregion TODO

}

export default Craft;
