class Ship extends Entity {
	constructor(context, texturePath, x, y, width, height, xSpeed, ySpeed) {
		super(context, texturePath, x, y, width, height, xSpeed, ySpeed);
		this.texturePath = texturePath;
		this.bullets = [];
		this.canFire = true;
		this.fireInterval = 0;
		this.turboActive = false;
		this.integrity = 5;
	}

	update() {
		if (this.isDestroyed() && this.width > 0) {
			this.x += 0.5;
			this.width -= 1;
		}
		if (this.isDestroyed() && this.height > 0) {
			this.y += 0.5;
			this.height -= 1;
		}
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
			case 1: variablePath = `${variablePath}-damage-4`; break;
			case 0: variablePath = `${variablePath}-damage-5`;
		}
		if (this.turboActive) { variablePath = `${variablePath}-turbo`; }
		this.texture.src = `${variablePath}.png`;
	}

	isFunctional() {
		return this.width > 0;
	}

	isDestroyed() {
		return this.integrity <= 0;
	}
}
