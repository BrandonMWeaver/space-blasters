class Ship extends Entity {
	constructor(context, x, y, width, height, xSpeed, ySpeed, texturePath) {
		super(context, x, y, width, height, xSpeed, ySpeed);
		this.texturePath = texturePath;
		this.texture = new Image;
		this.texture.src = `${texturePath}.png`;
		this.bullets = [];
		this.canFire = true;
		this.fireInterval = 0;
		this.turboActive = false;
		this.integrity = 5;
	}

	collidedWith(object) {
		return this.perimeter.bottom < object.perimeter.top ||
		this.perimeter.top > object.perimeter.bottom ||
		this.perimeter.right < object.perimeter.left ||
		this.perimeter.left > object.perimeter.right ? false : true;
	}

	delegateState() {
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
	}
}
