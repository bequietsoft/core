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
		size=default_size, 
		material=default_material
		// position=v, rotation=v, 
		// material=default_material, 
		// shadow=true
		) {
			//console.log(material);
		var geometry = new THREE.BoxGeometry(size.width, size.height, size.length);
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

	static bob(
			width = 0.5, height = 0.5, length=0.5,
			angle_x = 0.0, angle_y = 0.0, angle_z = 0.0,
			cinctures_cnt = 8,
			spokes_cnt = 8,
			curve_k = 0.0,
			form_k = 0.0,
			spoke_base = 0.0,
			smooth_normals = 1,
			material = default_material
		) {
			let hw = width / 2;
			let hh = height / 2;
			let hl = length / 2;

			let cinc = new Cincture();
				cinc.clear();
				cinc.data.material =  material;
				cinc.data.smooth.normals = smooth_normals;
				//cinc.data.smooth.vertices = 1; // not realized yet

			let steps = cinctures_cnt - 1;
			let dy = height  / steps;
			let ax = angle_x / steps;
			let ay = angle_y / steps;
			let az = angle_z / steps;

			for (let c=0; c < cinctures_cnt; c++) {
				
				let offset = Math.abs( hh - c * dy );//c * steps );//
				let cur_curve_k = curve_k * Math.sqrt( hh * hh - offset * offset ) / hh;
				let cur_form_k = 1 + form_k * c / steps;

				let da = Math.PI * 2 / spokes_cnt;

				let a = Math.pow(hw, 2);
				let b = Math.pow(hl, 2);
				
				//console.log('cinc=' + c, a, b, cur_curve_k, hh, offset);
				for (let s=0; s < spokes_cnt; s++) {
					let k2 = Math.pow( Math.tan(s * da), 2 );
					let spoke = spoke_base + Math.sqrt( (a * b * ( 1 + k2 ) ) / ( a * k2 + b ) ) * cur_curve_k * cur_form_k;
					//console.log('cinc=' + c, 'spoke=' + spoke);
					cinc.data.nodes.push(spoke);
				}
				
				if (c > 0) {
					cinc.data.offsets.push(0.0, dy, 0.0);
					cinc.data.rotates.push(ax, ay, az);
				} else {
					cinc.data.offsets.push(0.0, 0.0 , 0.0);
					cinc.data.rotates.push(0.0, 0.0 , 0.0);
				}

			}
			
			cinc.build();

		return cinc;
	}

	// Modificators
	static bend(cinc, ax=0.0, ay=0.0, az=0.0) {
		let len = cinc.data.skeleton.bones.length;
		cinc.data.skeleton.bones.forEach((bone, i) => {
			if ( i > 0 && i <= (len-1) ) 
				bone.rotation.set(ax/(len-2), ay/(len-2), az/(len-2));
		});
		cinc.data.bones[0].rotation.x -= ax/2;
		cinc.data.bones[0].rotation.y -= ay/2;
		cinc.data.bones[0].rotation.z -= az/2;
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
