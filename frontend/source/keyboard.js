class Keyboard {
	constructor() {
		this.keys = [];
		this.initialize(this);
	}

	initialize(self) {
		window.addEventListener("keydown", event => {
			self.keys[event.keyCode] = true;
		});
		window.addEventListener("keyup", event => {
			self.keys[event.keyCode] = false;
		});
	}
}
