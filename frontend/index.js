const game = new Game;
game.start(update);

const keyboard = new Keyboard;

const background = new Background(game.context, 0, 0, 1280, 720, 0, 1, "assets/background");

const player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/player");

const enemies = [];

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

	if (game.intervalReached(250)) {
		enemies.push(new Enemy(game.context, Math.floor(Math.random() * 1160) + 40, -40, 40, 40, 0, 1, "assets/player"))
	}

	for (const enemy of enemies) {
		enemy.move();
		enemy.update();
	}
}
