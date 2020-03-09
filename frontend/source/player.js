class Player extends Ship {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed, texturePath);
	}

	update() {
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
		this.delegateState();
	}
	
	respondTo(keyboard) {
		this.xSpeed = 0;
		this.ySpeed = 0;
		if (this.fireInterval > 0) { this.fireInterval--; } else { this.canFire = true; }
		if (this.bullets.length > 20) { this.bullets.shift(); }
		if (keyboard.keys[32] && this.canFire) {
			this.bullets.push(new Bullet(
				this.context,
				this.x + 18,
				this.y,
				5,
				10,
				0,
				-30,
				"./assets/bullet")
			);
			this.canFire = false;
			this.fireInterval = 5;
		}
		if (keyboard.keys[37] && this.x > 0) { this.xSpeed = -10; }
		if (keyboard.keys[39] && this.x < 1240) { this.xSpeed = 10; }
		if (keyboard.keys[38] && this.y > 0) {
			this.ySpeed = -5;
			this.turboActive = true;
		} else { this.turboActive = false; }
		if (keyboard.keys[40] && this.y < 680) { this.ySpeed = 5; }
	}
}
