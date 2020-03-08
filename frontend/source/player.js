class Player extends Ship {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed, texturePath);
	}

	update() {
		this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
	}
	
	respondTo(keyboard) {
		this.xSpeed = 0;
		this.ySpeed = 0;
		if (keyboard.keys[37] && this.x > 0) { this.xSpeed = -5; }
		if (keyboard.keys[39] && this.x < 1240) { this.xSpeed = 5; }
		if (keyboard.keys[38] && this.y > 0) { this.ySpeed = -5; }
		if (keyboard.keys[40] && this.y < 680) { this.ySpeed = 5; }
	}
}
