class Keyboard {
	constructor() {
		this.keys = [];
		this.initialize(this);
	}

	initialize(self) {
		window.addEventListener("keydown", event => {
			if (event.keyCode === 32) { event.preventDefault(); }
			self.keys[event.keyCode] = true;
		});
		window.addEventListener("keyup", event => {
			self.keys[event.keyCode] = false;
		});
	}
}
