import * as THREE from "./three.module.js"
import Material from "./material.js";
import { tmat } from "./material_v2.js";
import Vector from "./vector.js";
import { Cincture, CincturesObject } from "./cincture.js";
import { Cincture_V2, default_cincture_data } from "./cincture_v2.js";
import { rndf } from "./tools.js";

class Craft {

	static helper(width=0.5, height=0.5, length=0.5, color=0xff0000) {
		let material = Material.create("wire", color, false);
		return Craft.box(width, height, length, Vector.zero, Vector.zero, material, false);
	}

	static box(width, height, length, position, rotation, material, shadow) {
		var geometry = new THREE.BoxGeometry(width, height, length);
		var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(position.x, position.y, position.z);
			mesh.rotation.set(rotation.x, rotation.y, rotation.z);
			mesh.castShadow = shadow;
			mesh.reciveShadow = shadow;
		return mesh;
	}

	static sphere(radius, position, rotation, material, shadow, devisions) {
		var geometry = new THREE.SphereBufferGeometry(radius, devisions, devisions);
		var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(position.x, position.y, position.z);
			mesh.rotation.set(rotation.x, rotation.y, rotation.z);
			mesh.castShadow = shadow;
			mesh.reciveShadow = shadow;
		return mesh;
	}

	static cincture(d, scene, material, smooth = 0, shadow = false) {

		let cinctures_cnt = 10 * d;
		let spokes_cnt = 10 * d;
		let cinctures = [];

		let cinctures_base = 0.2 / d;
		let cinctures_deviation = 0.0;	
		let spokes_base = 0.5;
		let spokes_deviation = 0.0;

		for (let c=0; c < cinctures_cnt; c++) {
			let spokes = [];
			let k = Math.sin(Math.PI * c / (cinctures_cnt - 1));

			for (let s=0; s < spokes_cnt; s++) {
				let spoke = spokes_base + rndf(0, spokes_deviation);
				spoke *= k;
				spokes.push(spoke);
			}
			
			let offset_y = cinctures_base + rndf(0, cinctures_deviation);
			if (c < 1 ) offset_y = 0.0;
			offset_y *=  k;

			let rotation_x = 0.0;//0.5 * k / d; //(rndf(0.2, 0.5) * k) / d;
			cinctures.push(
				new Cincture(spokes, [0.0, offset_y, 0.0], [rotation_x, 0.0, 0.0])
			);
		}
		console.log(cinctures);

		return new CincturesObject(scene, material, cinctures, true, true, smooth, shadow);
	}

	static cincture_v2(d = 1) {
		
		let data = Object.assign( {}, default_cincture_data );
		
		data.offsets = [];
		data.rotates = [];
		data.nodes = [];

		console.log(data);

		let cinctures_cnt = 10 * d;
		let spokes_cnt = 10 * d;

		let cinctures_base = 0.2 / d;
		let cinctures_deviation = 0.1;	
		let spokes_base = 0.5;
		let spokes_deviation = 0.1;

		for (let c=0; c < cinctures_cnt; c++) {
			
			let k = Math.sin(Math.PI * c / (cinctures_cnt - 1));

			for (let s=0; s < spokes_cnt; s++) {
				let spoke = spokes_base + rndf(0, spokes_deviation);
				spoke *= k;
				data.nodes.push(spoke);
			}
			
			let offset_y = cinctures_base + rndf(0, cinctures_deviation);
			if (c < 1 ) offset_y = 0.0;
			offset_y *=  k;

			let rotation_x = 0.0; //0.5 * k / d; //(rndf(0.2, 0.5) * k) / d;
			
			data.offsets.push(0.0, offset_y, 0.0);
			data.rotates.push(rotation_x, 0.0, 0.0);
		}

		data.scale = 2;
		data.material = tmat('../img/uvgrid.jpg');
		data.smooth = { normals: 1, vertices: 0 };

        return new Cincture_V2(data);	
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
