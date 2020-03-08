const game = new Game;
game.start(update);

const keyboard = new Keyboard;

const background = new Background(game.context, 0, 0, 1280, 720, 0, 1, "assets/background.png");

const player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/player.png");

function update() {
	game.clear();
	game.frame++;

	background.move();
	background.update();
	
	for (const bullet of player.bullets) {
		bullet.move();
		bullet.update();
	}
	
	player.respondTo(keyboard);
	player.move();
	player.update();
}
