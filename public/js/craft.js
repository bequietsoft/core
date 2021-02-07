import * as THREE from "./three.module.js"
import { mat } from "./material.js";
import { Cincture } from "./cincture.js";
//import { rndf } from "./rnd.js";

const default_material = mat(0xffffff, 'standard');
const default_size = {width: 0.5, height: 0.5, length: 0.5};
// const v = {x: 0, y: 0, z: 0};

class Craft {

	static helper(size=default_size, color=0xff0000) {
		// console.log(size);
		// console.log(color);
		let material = mat(color, 'wire', false);
		let helper = Craft.box(size, material);
			helper.castShadow = false;
			helper.reciveShadow = false;
		// let v = new THREE.Vector3(0, 0, 0);
		return helper;
	}

	static box(
		width = 0.5, height = 0.5, length=0.5,
		material=default_material
		// position=v, rotation=v, 
		// material=default_material, 
		// shadow=true
		) {
			//console.log(material);
		//if (material === default_material) material = Object.assign({}, default_material);
		var geometry = new THREE.BoxGeometry(width, height, length);
		var mesh = new THREE.Mesh(geometry, material);
			// mesh.position.set(position.x, position.y, position.z);
			// mesh.rotation.set(rotation.x, rotation.y, rotation.z);
			// mesh.castShadow = shadow;
			// mesh.reciveShadow = shadow;
		return mesh;
	}

	static sphere(
		radius=1,
		devisions=8,
		material=default_material
		// position=v, rotation=v,
		// material=default_material, 
		// shadow=true
		) {
		var geometry = new THREE.SphereBufferGeometry(radius, devisions, devisions);
		var mesh = new THREE.Mesh(geometry, material);
			// mesh.position.set(position.x, position.y, position.z);
			// mesh.rotation.set(rotation.x, rotation.y, rotation.z);
			// mesh.castShadow = shadow;
			// mesh.reciveShadow = shadow;
		return mesh;
	}

	static mesh(
			width = 0.5, height = 0.5, length=0.5,
			
			cinc_cnt = 8,
			nodes_cnt = 8,
			
			curve_k = 0.0,
			form_k = 0.0,

			cinc_base = 0.0,
			
			smooth_normals = 1,
			material = default_material
		) {
			let hw = width / 2;
			let hh = height / 2;
			let hl = length / 2;

			let cinc = new Cincture();
				cinc.clear();
				// cinc.data.width = width;
				// cinc.data.height = height;
				// cinc.data.length = length;
				// cinc.data.cinc_cnt = cinc_cnt;
				// cinc.data.nodes_cnt = nodes_cnt;
				// cinc.data.curve_k = curve_k;
				// cinc.data.form_k = form_k;
				// cinc.data.cinc_base = cinc_base;
				cinc.data.smooth.normals = smooth_normals;
				cinc.data.material =  material;
				//cinc.data.smooth.vertices = 1; // not realized yet
			
			//console.log('mesh', cinc.data.cinc_base);

			let steps = cinc_cnt - 1;
			let dy = height  / steps;

			for (let c=0; c < cinc_cnt; c++) {
				
				let offset = Math.abs( hh - c * dy );
				let cur_curve_k = curve_k * Math.sqrt( hh * hh - offset * offset ) / hh;
				let cur_form_k = 1 + form_k * c / steps;

				let da = Math.PI * 2 / nodes_cnt;

				let a = Math.pow(hw, 2);
				let b = Math.pow(hl, 2);
				
				for (let s=0; s < nodes_cnt; s++) {
					let k2 = Math.pow( Math.tan(s * da), 2 );
					let node = cinc_base + Math.sqrt((a * b * (1 + k2)) / (a * k2 + b)) * cur_curve_k * cur_form_k;
					cinc.data.nodes.push(node);
				}
				
				if (c > 0) 
					cinc.data.offsets.push(0.0, dy, 0.0);

					
				else
					cinc.data.offsets.push(0.0, 0.0, 0.0);

				cinc.data.rotates.push(0.0, 0.0, 0.0);
			}
			
			cinc.build();

		return cinc;
	}

	// Modificators
	static bendC(cinc, angle=0.0, axis='X', c_angle=0) {
		let len = cinc.data.skeleton.bones.length;
		//console.log('bendC',angle);
		cinc.data.skeleton.bones.forEach((bone, i) => {
				if ( i > 0 && i < cinc.data.skeleton.bones.length-1 ) {
					if (axis === 'X') bone.rotation.x += angle/(len-2);
					if (axis === 'Y') bone.rotation.y += angle/(len-2);
					if (axis === 'Z') bone.rotation.z += angle/(len-2);
				}
		});
		if (c_angle != 0.0) Craft.bend_compensation(cinc, axis, c_angle);
	}

	static bendS(cinc, angleA=0.0, angleB=0.0, k=0.5, axis='X', c_angle=0) {
		let len = cinc.data.skeleton.bones.length;
		//console.log('bendS',angleA, angleB);
		cinc.data.skeleton.bones.forEach((bone, i) => {
			if ( i > 0 && i < len-1 ) {
				let angle = angleA;
				if (i/len > k) angle = angleB;
				if (axis === 'X') bone.rotation.x += angle/(len-2);
				if (axis === 'Y') bone.rotation.y += angle/(len-2);
				if (axis === 'Z') bone.rotation.z += angle/(len-2);
			}
		});
		if (c_angle != 0.0) Craft.bend_compensation(cinc, axis, c_angle);
	}

	static bend_compensation(cinc, axis, angle) {
		//console.log('comp', angle);
		if (axis === 'X') cinc.data.bones[0].rotation.x += angle;
		if (axis === 'Y') cinc.data.bones[0].rotation.y += angle;
		if (axis === 'Z') cinc.data.bones[0].rotation.z += angle;
	}
	
	// static copy(cinc, axis='X'){
		
	// 	let cc = cinc.data;
	// 	console.log('copy', cc);
		
	// 	let result_cinc = Craft.mesh( 
	// 		cc.width, cc.height, cc.length,
	// 		cc.cinc_cnt, cc.nodes_cnt, 
	// 		cc.curve_k, cc.form_k, cc.spoke_base,
	// 		cinc.data.smooth.normals,
	// 		cinc.data.material
	// 	);
		
	// 	// result_cinc.mesh.rotation.x = cinc.mesh.rotation.x;
	// 	// result_cinc.mesh.rotation.y = cinc.mesh.rotation.y;
	// 	// result_cinc.mesh.rotation.z = cinc.mesh.rotation.z;
		
	// 	// result_cinc.mesh.position.x = cinc.mesh.position.x;
	// 	// result_cinc.mesh.position.y = cinc.mesh.position.y;
	// 	// result_cinc.mesh.position.z = cinc.mesh.position.z;
		
	// 	// if (axis === 'X') {
	// 	// 	result_cinc.mesh.position.x = -result_cinc.mesh.position.x; 
	// 	// 	//result_cinc.mesh.rotation.x += Math.PI - result_cinc.mesh.rotation.x;
	// 	// }

	// 	// if (axis === 'Z') {
	// 	// 	//result_cinc.mesh.position.z = -result_cinc.mesh.position.z; 
	// 	// 	result_cinc.mesh.rotation.z =-result_cinc.mesh.rotation.z;
	// 	// }

	// 	return result_cinc;
	// }

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
