class Enemy extends Ship {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed, texturePath);
	}

	update() {
		super.update();
		this.context.save();
		this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
		this.context.rotate(180 * Math.PI / 180);
		this.context.drawImage(this.texture, this.width / -2, this.height / -2, this.width, this.height);
		this.context.restore();
		this.delegateState();
	}

	fireIfAble() {
		if (this.fireInterval > 0) { this.fireInterval--; } else { this.canFire = true; }
		if (!this.isDestroyed() && this.canFire) {
			this.bullets.push(new Bullet(
				this.context,
				this.x + 18,
				this.y + 40,
				4,
				10,
				0,
				10,
				"./assets/bullet-2")
			);
			this.canFire = false;
			this.fireInterval = 150;
		}
	}
}
