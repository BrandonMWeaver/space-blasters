class Bullet extends Entity {
	constructor(context, texturePath, x, y, width, height, xSpeed, ySpeed) {
		super(context, texturePath, x, y, width, height, xSpeed, ySpeed);
	}

	update() {
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
	}
}
