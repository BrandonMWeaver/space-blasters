class Player extends Ship {
	constructor(context, texturePath, x, y, width, height, xSpeed, ySpeed) {
		super(context, texturePath, x, y, width, height, xSpeed, ySpeed);
	}

	update() {
		super.update();
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
		this.delegateState();
	}
	
	respondTo(keyboard) {
		this.xSpeed = 0;
		this.ySpeed = 0;
		if (!this.isDestroyed()) {
			if (this.fireInterval > 0) { this.fireInterval--; } else { this.canFire = true; }
			if (keyboard.keys[32] && this.canFire) {
				this.bullets.push(new Bullet(
					this.context,
					"./assets/bullet-1",
					this.x + 18,
					this.y,
					4,
					10,
					0,
					-30)
				);
				this.canFire = false;
				this.fireInterval = 5;
			}
			if (keyboard.keys[65] && this.x > 0) { this.xSpeed = -10; }
			if (keyboard.keys[68] && this.x < 1240) { this.xSpeed = 10; }
			if (keyboard.keys[87] && this.y > 0) {
				this.ySpeed = -5;
				this.turboActive = true;
			} else { this.turboActive = false; }
			if (keyboard.keys[83] && this.y < 680) { this.ySpeed = 5; }
		}
	}
}
