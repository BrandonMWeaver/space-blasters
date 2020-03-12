class Display {
	constructor(context, x, y, font, color, textAlign) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.context.font = font;
		this.context.fillStyle = color;
		this.context.textBaseline = "top";

		this.textAlign = textAlign;
	}

	update() {
		this.context.textAlign = this.textAlign;
		this.context.fillText(this.text, this.x, this.y);
	}
}
