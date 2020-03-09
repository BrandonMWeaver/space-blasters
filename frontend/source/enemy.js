class Enemy extends Ship {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed, texturePath);
	}

	update() {
		this.context.save();
		this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
		this.context.rotate(180 * Math.PI / 180);
		this.context.drawImage(this.texture, this.width / -2, this.height / -2, this.width, this.height);
		this.context.restore();
		this.delegateState();
	}
}
