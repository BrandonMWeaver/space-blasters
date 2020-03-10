const game = new Game;
game.start(update);

const keyboard = new Keyboard;

const background = new Background(game.context, 0, 0, 1280, 720, 0, 2, "assets/background");

const player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/space-ship-1");

const enemies = [];

function update() {
	if (gameOver()) {
		game.stop();
	}
	else {
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
	
		if (game.intervalReached(100)) {
			enemies.push(new Enemy(game.context, Math.floor(Math.random() * 1160) + 40, -40, 40, 40, 0, 1, "assets/space-ship-2"))
		}
	
		for (let i = enemies.length - 1; i >= 0; i--) {
			if (enemies[i].width === 0) {
				enemies.splice(i, 1);
			}
		}
	
		for (const enemy of enemies) {
			if (enemy.width !== 0) {
				enemy.move();
				enemy.update();
			}
		
			for (let i = player.bullets.length - 1; i >= 0; i--) {
				if (enemy.collidedWith(player.bullets[i]) && !enemy.isDestroyed()) {
					enemy.integrity--;
					player.bullets.splice(i, 1);
				}
			}
		}
	}
}

function gameOver() {
	for (const enemy of enemies) {
		if (enemy.y === background.height) {
			return true;
		}
	}
	return false;
}
