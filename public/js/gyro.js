class Gyro {
	
	static init(App) {
		
		Gyro.App = App;
		App.Gyro = Gyro;
		
		window.addEventListener("deviceorientation", Gyro.orientation, true);
		//console.log(window);
	}

	static orientation(event) {
		console.log(event.beta * Math.PI / 180);
		//Gyro.App.World.camera.root.rotation.y = event.gamma * Math.PI / 180;

		Gyro.App.World.camera.rotation.y = event.alpha * Math.PI / 180;
		//Gyro.App.World.camera.rotation.y = 90 -event.beta * Math.PI / 180;
		Gyro.App.World.camera.rotation.z = -event.gamma * Math.PI / 180;
		//Gyro.App.World.camera.target.rotation.z -= Mouse.dy/300;
	}

	static initSensor() {
		const options = { frequency: 60, coordinateSystem };
		console.log(JSON.stringify(options));
		sensor = relative ? new RelativeOrientationSensor(options) : new AbsoluteOrientationSensor(options);
		sensor.onreading = () => model.quaternion.fromArray(sensor.quaternion).inverse();
		sensor.onerror = (event) => {
		  if (event.error.name == 'NotReadableError') {
			console.log("Sensor is not available.");
		  }
		}
		sensor.start();
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