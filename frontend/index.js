let canvas = document.querySelector("canvas");
let game = new Game(canvas);

let paused = false;

let keyboard = new Keyboard;
let background = new Background(game.context, 0, 0, 1280, 720, 0, 0.2, "assets/background");
let overlay = new Background(game.context, 0, 0, 1280, 720, 0, 0.1, "assets/overlay");
let score = new Display(game.context, 10, 10, "20px Orbitron", "#fff");
let player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/space-ship-1");
let enemies = [];

game.start(update);

addEventListener("keydown", event => {
	if (event.keyCode === 13) {
		restartGame();
	}
});

addEventListener("keydown", event => {
	if (event.keyCode === 80) {
		if (paused) {
			game.resume(update);
		}
		else {
			game.stop();
		}
		paused = !paused;
	}
});

function update() {
	if (gameOver()) {
		game.stop();
	}
	else {
		game.clear();
		game.frame++;

		if (game.intervalReached(5000) && game.difficulty < 5) {
			game.difficulty++;
		}

		if (game.intervalReached(50)) {
			game.score++;
		}

		background.move();
		background.update();
		overlay.move();
		overlay.update();

		player.respondTo(keyboard);
		player.move();
		player.update();

		for (let i = player.bullets.length - 1; i >= 0; i--) {
			player.bullets[i].move();
			player.bullets[i].update();
			if (player.bullets[i].y <= -40) {
				player.bullets.splice(i, 1);
			}
		}

		if (game.intervalReached(100 - 10 * game.difficulty)) {
			enemies.push(new Enemy(game.context, Math.floor(Math.random() * 1160) + 40, -40, 40, 40, 0, 1, "assets/space-ship-2"));
		}

		for (let i = enemies.length - 1; i >= 0; i--) {
			if (!enemies[i].isFunctional()) {
				enemies.splice(i, 1);
			}
		}

		for (const enemy of enemies) {
			for (let i = enemy.bullets.length - 1; i >= 0; i--) {
				enemy.bullets[i].move();
				enemy.bullets[i].update();
				if (player.collidedWith(enemy.bullets[i])) {
					player.integrity--;
					enemy.bullets.splice(i, 1);
				}
				else if (enemy.bullets[i].y >= background.height) {
					enemy.bullets.splice(i, 1);
				}
			}
			if (enemy.isFunctional()) {
				enemy.move();
				enemy.update();
				enemy.fireIfAble();
			}
			for (let i = player.bullets.length - 1; i >= 0; i--) {
				if (!enemy.isDestroyed() && enemy.collidedWith(player.bullets[i])) {
					enemy.integrity--;
					game.score++;
					player.bullets.splice(i, 1);
				}
			}
		}

		score.text = `SCORE: ${game.score}`;
		score.update();
	}
}

function gameOver() {
	if (!player.isFunctional()) { return true; }
	for (const enemy of enemies) {
		if (enemy.y >= background.height) {
			return true;
		}
	}
	return false;
}

function restartGame() {
	game.stop();
	game.clear();

	keyboard = new Keyboard;
	background = new Background(game.context, 0, 0, 1280, 720, 0, 0.2, "assets/background");
	overlay = new Background(game.context, 0, 0, 1280, 720, 0, 0.1, "assets/overlay");
	score = new Display(game.context, 10, 10, "20px Orbitron", "#fff");
	player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/space-ship-1");
	enemies = [];

	paused = false;

	game.start(update);
}
