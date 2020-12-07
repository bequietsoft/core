import * as THREE from "./three.module.js"

function rotateVector(v, r) {
    var rv = v.clone();
    rv.applyAxisAngle( new THREE.Vector3( 1, 0, 0), r.x );
    rv.applyAxisAngle( new THREE.Vector3( 0, 1, 0), r.y );
    rv.applyAxisAngle( new THREE.Vector3( 0, 0, 1), r.z );
    return rv;
}

function addFaceToGeometry(geometry, v0, v1, v2) {
	var vl = geometry.vertices.length;
	geometry.vertices.push(v0);
	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.faces.push(new THREE.Face3(vl, vl+1, vl+2));
}

//
export class Cincture {

    constructor(spokes = [0.1, 0.1, 0.1, 0.1], offset = [0.0, 0.1, 0.0], rotation = [0.0, 0.0, 0.0] ) {
        this.rotation = new THREE.Vector3( rotation[0], rotation[1], rotation[2] );
		this.offset = new THREE.Vector3( offset[0], offset[1], offset[2] );
        this.spokes = spokes;
    }

}

//
export class CincturesObject {

    constructor(scene, material, cinctures = [], start_cap = true, end_cap = true, smooth = 0, shadow = false) {

		this.object = undefined;
		this.scene = scene;
		this.material = material;
		this.cinctures = cinctures;
        this.start_cap = start_cap;
        this.end_cap = end_cap;
		this.points = [];
		this.smooth = smooth;
		this.shadow = shadow;
		this.update_counter = 0;

		this.update();

		//return this;
    }

	update() {

		var position;
		var rotation;

		// remove old object from scene and geometry from memory
		if (this.object != undefined) {
			position = this.object.position.clone();
			rotation = this.object.rotation.clone();
			this.scene.remove( this.object );
			this.geometry.dispose();
			if (this.smooth) this.smooth_geometry.dispose();
			//console.log("UPDATE " + this.update_counter);
		}
		this.geometry = new THREE.Geometry();

		// build new geometry
		this.build();

		// smooth
		if (this.smooth) {
			this.smooth_geometry = this.geometry.clone();
			this.smooth_geometry.mergeVertices();
			var modifier = new THREE.SubdivisionModifier( smooth );
			modifier.modify( this.smooth_geometry );
			this.object = new THREE.Mesh( this.smooth_geometry, this.material );
		}
		else {
			this.object = new THREE.Mesh( this.geometry, this.material );
		}

		// shadow
		if (this.shadow) {
			this.object.castShadow = this.shadow;
			this.object.receiveShadow = this.shadow;
		}

		if (position !== undefined) this.object.position.set( position.x, position.y, position.z );
		if (rotation !== undefined) this.object.rotation.set( rotation.x, rotation.y, rotation.z );

		// add object to scene
		this.scene.add( this.object );
		this.update_counter++;
	}
    
    build() {

    	// collect temp points
        var points = [];
		var total_rotation = new THREE.Vector3(0, 0, 0);
        var total_position = new THREE.Vector3(0, 0, 0);
        
        for(var ci = 0; ci < this.cinctures.length; ci++) {

            var cincture = this.cinctures[ci];
            var nodes = cincture.spokes;
            var angle_step = Math.PI * 2 / nodes.length;

			total_rotation.add(cincture.rotation);
			total_position.add(rotateVector(cincture.offset, total_rotation));

            for(var ni = 0; ni < nodes.length; ni++) {

                var angle0 = angle_step * ni;
                var angle1 = 0;
                var node0 = nodes[ni];
                var node1 = nodes[0];

                if (ni != nodes.length - 1) {
                    node1 = nodes[ni + 1];
                    angle1 = angle_step * (ni + 1);
                }

			    var v0 = new THREE.Vector3(0, 0, 0);
                var v1 = new THREE.Vector3(node0 * Math.cos(angle0), 0, node0 * Math.sin(angle0) );
                var v2 = new THREE.Vector3(node1 * Math.cos(angle1), 0, node1 * Math.sin(angle1) );

                v0 = rotateVector(v0, total_rotation);
                v1 = rotateVector(v1, total_rotation);
                v2 = rotateVector(v2, total_rotation);

                v0.add(total_position);
                v1.add(total_position);
                v2.add(total_position);

                points.push(v0);
                points.push(v1);
                points.push(v2);
                points.push(v0);
                points.push(v1);
                points.push(v2);

            }
        }

        // create faces
		//dbg.log("!1 " + this.geometry.faces.length + " " + this.geometry.vertices.length);

        var fpi = 0;
        var len = this.cinctures[0].spokes.length * 6;
        for(var ci = 0; ci < this.cinctures.length; ci++) {
            for(var ni = 0; ni < this.cinctures[ci].spokes.length; ni++) {

                    var v0 = points[fpi + 0];
                    var v1 = points[fpi + 1];
                    var v2 = points[fpi + 2];
                    var v3 = points[fpi + 3];
                    var v4 = points[fpi + 4];
                    var v5 = points[fpi + 5];

                    if (this.start_cap == true && ci == 0)
                        addFaceToGeometry(this.geometry, v0, v1, v2);

                    if (ci > 0)
                        addFaceToGeometry(this.geometry, points[fpi - len + 4], v1, v2);

                    if (ci < this.cinctures.length - 1)
                        addFaceToGeometry(this.geometry, v1, points[fpi + len + 2], v2);

                    if (this.end_cap == true && ci == this.cinctures.length -1)
                        addFaceToGeometry(this.geometry, v5, v4, v3);

                    fpi += 6;
            }
        }
		//dbg.log("!2 " + this.geometry.faces.length + " " + this.geometry.vertices.length);

		//this.geometry.mergeVertices();
		this.geometry.computeFaceNormals();
		this.geometry.computeVertexNormals();
    }

}
