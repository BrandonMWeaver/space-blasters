class Entity {
	constructor(context, x = 0, y = 0, width = 0, height = 0, xSpeed = 0, ySpeed = 0) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
	}
	
	move() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}
	
	get perimeter() {
		return {
			left: this.x,
			right: this.x + this.width,
			top: this.y,
			bottom: this.y + this.height
		}
	}
}
