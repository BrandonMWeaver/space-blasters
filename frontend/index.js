const game = new Game;
game.start(update);

const keyboard = new Keyboard;
const background = new Background(game.context, 0, 0, 1280, 720, 0, 2, "assets/background");
const score = new Display(game.context, 50, 50, "20px Consolas", "#fff");
const player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/space-ship-1");
const enemies = [];

function update() {
	if (gameOver()) {
		game.stop();
	}
	else {
		game.clear();
		game.frame++;

		if (game.intervalReached(50)) {
			game.score++;
		}

		background.move();
		background.update();

		score.text = `SCORE: ${game.score}`;
		score.update();

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
		
		if (game.intervalReached(100)) {
			enemies.push(new Enemy(game.context, Math.floor(Math.random() * 1160) + 40, -40, 40, 40, 0, 1, "assets/space-ship-2"))
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
					player.bullets.splice(i, 1);
				}
			}
		}
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
