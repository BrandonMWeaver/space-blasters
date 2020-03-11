class Display {
	constructor(context, x, y, font, color) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.context.font = font;
		this.context.fillStyle = color;
		this.context.textBaseline = "top";
	}

	update() {
		this.context.fillText(this.text, this.x, this.y);
	}
}
