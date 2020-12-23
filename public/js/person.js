import Craft from "./craft.js";

class Avatar {
	constructor(parent) {
		
		this.body = Craft.box({width: 0.15, height: 0.2, length: 0.1});
		this.body.position.y = 0.3;
		parent.add(this.body);

		this.head = Craft.box({width: 0.1, height: 0.1, length: 0.1});
		this.head.position.y = 0.2;
		this.body.add(this.head);

		this.larm = Craft.box({width: 0.05, height: 0.2, length: 0.05});
		this.larm.position.y = +0.2;
		this.larm.position.x = +0.075;
		//this.larm.rotation.z = Math.PI/2;
		this.body.add(this.larm);

		this.lleg = Craft.box({width: 0.05, height: 0.2, length: 0.05});
		this.lleg.position.y = -0.2;
		this.lleg.position.x = +0.05;
		this.body.add(this.lleg);

		this.rleg = Craft.box({width: 0.05, height: 0.2, length: 0.05});
		this.rleg.position.y = -0.2;
		this.rleg.position.x = -0.05;
		this.body.add(this.rleg);
	}

	set_pose_01() {
		this.body.rotation.y = -0.2;
		this.head.rotation.y = +0.2;
		this.lleg.rotation.x = -0.6;
		this.lleg.rotation.y = +0.1;
		this.rleg.rotation.x = +0.6;
		this.rleg.rotation.y = -0.1;
	}

	set_pose_02() {
		this.rleg.rotation.x = 0.0;
	}

	set_pose_03() {
		this.rleg.rotation.x = 0.1;
	}
}

export default Avatar;