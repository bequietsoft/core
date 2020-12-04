class Gyro {
	
	static init(root) {
		
		Gyro.root = root;
		root.Gyro = Gyro;

		Gyro.sensor = new Gyroscope();
		
		Gyro.sensor.start();
		Gyro.changed = false;
		// console.log(Gyro.sensor);
	}

	static update() {
		// if (Gyro.last_sensor_state.x != Gyro.sensor.x ||
		// 	Gyro.last_sensor_state.y != Gyro.sensor.y ||
		// 	Gyro.last_sensor_state.z != Gyro.sensor.z) {
		// 		Gyro.last_sensor_state = THREE.Vector3(sensor.x, sensor.y, sensor.z);
		// 		Gyro.changed = true;
		// 	}
	}
}

export default Gyro;