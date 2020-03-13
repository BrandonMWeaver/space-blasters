class Background extends Entity {
	constructor(context, texturePath, x, y, width, height, xSpeed, ySpeed) {
		super(context, texturePath, x, y, width, height, xSpeed, ySpeed);
	}

	move() {
		super.move();
		if (this.y >= this.height) {
			this.y = 0;
		}
	}

	update() {
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
		this.context.drawImage(this.texture, this.x, this.y - this.height, this.width, this.height);
	}
}
