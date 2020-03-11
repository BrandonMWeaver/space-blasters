class Game {
	constructor(canvas) {
		this.canvas = canvas;
		this.canvas.width = 1280;
		this.canvas.height = 720;

		this.context = this.canvas.getContext("2d");

		const div = document.createElement("div");
		div.style.margin = "0 auto";
		div.style.textAlign = "center";
		div.append(this.canvas);
		document.body.append(div);

		this.frame = 0;
		this.score = 0;
		this.difficulty = 0;
	}

	start(callback) {
		this.frame = 0;
		this.score = 0;
		this.difficulty = 0;
		
		this.interval = setInterval(callback, 20);
	}

	stop() {
		clearInterval(this.interval);
	}

	resume(callback) {
		this.interval = setInterval(callback, 20);
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	intervalReached(n) {
		return this.frame / n % 1 == 0;
	}
}
