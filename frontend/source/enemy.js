class Enemy extends Ship {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed, texturePath);
	}

	update() {
		if (this.isDestroyed() && this.width > 0 && this.height > 0) {
			this.x += 0.5;
			this.y += 0.5;
			this.width -= 1;
			this.height -= 1;
		}
		this.context.save();
		this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
		this.context.rotate(180 * Math.PI / 180);
		this.context.drawImage(this.texture, this.width / -2, this.height / -2, this.width, this.height);
		this.context.restore();
		this.delegateState();
	}

	isDestroyed() {
		return this.integrity === 0;
	}
}
