class Player extends Ship {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed, texturePath);
		this.texturePath = texturePath;
		this.fireInterval = 0;
		this.turboActive = false;
	}

	update() {
		let variablePath = this.texturePath;
		switch (this.integrity) {
			case 5: variablePath = variablePath; break;
			case 4: variablePath = `${variablePath}-damage-1`; break;
			case 3: variablePath = `${variablePath}-damage-2`; break;
			case 2: variablePath = `${variablePath}-damage-3`; break;
			case 1: variablePath = `${variablePath}-damage-4`;
		}
		if (this.turboActive) { variablePath = `${variablePath}-turbo`; }
		this.texture.src = `${variablePath}.png`;
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
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
				-20,
				"./assets/bullet")
			);
			this.canFire = false;
			this.fireInterval = 5;
		}
		if (keyboard.keys[37] && this.x > 0) { this.xSpeed = -5; }
		if (keyboard.keys[39] && this.x < 1240) { this.xSpeed = 5; }
		if (keyboard.keys[38] && this.y > 0) {
			this.ySpeed = -5;
			this.turboActive = true;
		} else { this.turboActive = false; }
		if (keyboard.keys[40] && this.y < 680) { this.ySpeed = 5; }
	}
}
