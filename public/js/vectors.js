import * as THREE from "./three.module.js";

export const PI = Math.PI;
export const wPI = 2 * Math.PI;
export const hPI = Math.PI / 2;

export var V0 = VV( 0 );
export var VPI = VV( PI );
export var VwPI = VV( wPI );
export var VhPI = VV( hPI );


// rotate 3d vector
export function RV( v, r ) {
    var rv = v.clone();
    rv.applyAxisAngle( new THREE.Vector3( 1, 0, 0), r.x );
    rv.applyAxisAngle( new THREE.Vector3( 0, 1, 0), r.y );
    rv.applyAxisAngle( new THREE.Vector3( 0, 0, 1), r.z );
    return rv;
}

export function V( x, y, z ) {
	return new THREE.Vector3( x, y, z );
}

export function VV( s ) {
	return new THREE.Vector3( s, s, s );
}

// div vectors
export function DV( a, b ) {
	return new THREE.Vector3( a.x - b.x, a.y - b.y, a.z - b.z );
}

// add vectors
export function AV( a, b ) {
	return new THREE.Vector3( a.x + b.x, a.y + b.y, a.z + b.z );
}

// normalize vector
export function NV( a ) {
	let l = Math.sqrt( a.x * a.x + a.y * a.y + a.z * a.z );
	return new THREE.Vector3( a.x / l, a.y / l, a.z / l );
}

// points dist 
export function DP( a, b ) {
	let d =  DV( a, b );
	return LV (d);
}

// vector lenght
export function LV( a ) {
	let l = Math.sqrt( a.x * a.x + a.y * a.y + a.z * a.z );
	return l;
}

// multiple vector
export function MV( a, k ) {
	return new THREE.Vector3( a.x * k, a.y * k, a.z * k );
}

// step vector a to b on k
export function SV( a, b, k ) {
	return AV( a, MV( DV( b, a ), k ) );
}

// vector to string 
export function V2S( c ) {
	return '[' + ft( c.x ) + ' ' + ft( c.y ) + ' ' + ft( c.z ) + ']';
}

// vectors array middle vector
export function GV( n ) {
	var r = new THREE.Vector3();
	var d = 1 / n.length;
	for ( let j = 0; j < n.length; j++ ) r = AV( r, n[ j ] );
	r = MV( r, d );
	return r;
}

// function GRP( root, obj ) {
// 	let path = [];
// 		while( obj != root ) {
// 			//log( obj, false );
// 			path.push( obj );
// 			obj = obj.parent;
// 		}

// 	let tr = V( root.rotation.x, root.rotation.y, root.rotation.z );
// 	let tp = V( root.position.x, root.position.y, root.position.z );
// 	for( let i = path.length - 1; i >= 0 ; i-- ) {
// 		tr.add( path[i].rotation );
// 		tp.add( RV (path[i].position, tr ) );
// 	}

// 	return { position: tp, rotation: tr };
// }


