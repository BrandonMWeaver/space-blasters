class Background extends Entity {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed);
		this.texture = new Image;
		this.texture.src = `${texturePath}.png`;
	}

	move() {
		super.move();
		if (this.y === this.height) {
			this.y = 0;
		}
	}

	update() {
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
		this.context.drawImage(this.texture, this.x, this.y - this.height, this.width, this.height);
	}
}
