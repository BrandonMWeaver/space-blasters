class Bullet extends Entity {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed);
		this.texture = new Image;
		this.texture.src = texturePath;
	}

	update() {
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
	}
}
