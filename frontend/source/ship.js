class Ship extends Entity {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed);
		this.texture = new Image;
		this.texture.src = texturePath;
		this.integrity = 5;
		this.canFire = true;
	}
}
