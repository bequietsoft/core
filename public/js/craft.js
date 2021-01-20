import * as THREE from "./three.module.js"
import { mat } from "./material.js";
import { Cincture, default_cincture_data } from "./cincture.js";
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

	static cinc_one(
		//width = 0.5, height = 0.5, length=0.5, 
		size=default_size,
		cinctures_cnt = 8,
		spokes_cnt = 8,
		height_curve_k = 0.0,
		spoke_base = 0.0,
		material=default_material

		) {
			let hw = size.width / 2;
			let hh = size.height / 2;
			let hl = size.length / 2;

			let cinc = new Cincture();
				cinc.clear();
				cinc.data.material =  default_material;
				cinc.data.smooth.normals = 1;
				//cinc.data.smooth.vertices = 1; // not realized 

			let cincture_step = size.height / ( cinctures_cnt - 1 );

			//console.log(cincture_step, cincture_correction_step,  );
			// console.log('--------------------------------------');
			// console.log('width=' + size.width + ' height=' + size.height + ' length=' + size.length);
			// console.log('hw='+hw, 'hh='+hh, 'hl='+hl);
			// console.log('--------------------------------------');

			for (let c=0; c < cinctures_cnt; c++) {
				
				let dx = Math.abs(hh - c * cincture_step);
				let curve_k = height_curve_k * Math.sqrt( hh * hh - dx * dx ) / hh;

				let da = Math.PI * 2 / spokes_cnt;

				let a = Math.pow(hw, 2);
				let b = Math.pow(hl, 2);
				
				//console.log('cinc=' + c, a, b, curve_k, dx, hh, Math.sqrt( hh * hh - dx * dx ));
				for (let s=0; s < spokes_cnt; s++) {

					let k2 = Math.pow( Math.tan(s * da), 2 );
					let spoke = spoke_base + Math.sqrt( (a * b * ( 1 + k2 ) ) / ( a * k2 + b ) ) * curve_k;
					//console.log('cinc='+c, 'spoke=' + spoke);

					cinc.data.nodes.push(spoke);
				}
				
				cinc.data.offsets.push(0.0, cincture_step , 0.0);
				cinc.data.rotates.push(0.10, 0.0, 0.0);

				if (c === 0) cinc.data.offsets[1] = 0.0;
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
