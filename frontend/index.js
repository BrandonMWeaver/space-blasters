const canvas = document.createElement("canvas");
const div = document.querySelector(".game");

let currentUser;

let game;
let paused = false;

let keyboard;
let background;
let overlay;
let user;
let score;
let player;
let enemies;

addEventListener("click", event => {
	event.preventDefault();
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

	if (event.target.id === "create") {
		fetch("http://localhost:3000/players", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				username,
				password
			})
		})
		.then(response => response.json())
		.then(object => {
			if (object.id && object.username) {
				if (document.querySelector("p#error")) {
					document.querySelector("p#error").remove();
				}
				
				currentUser = { id: object.id, username: object.username };

				document.querySelector("form").remove();
				div.append(canvas);

				game = new Game(canvas);

				keyboard = new Keyboard;
				background = new Background(game.context, 0, 0, 1280, 720, 0, 0.2, "assets/background");
				overlay = new Background(game.context, 0, 0, 1280, 720, 0, 0.1, "assets/overlay");
				user = new Display(game.context, 1270, 10, "20px Orbitron", "#fff", "right")
				user.text = currentUser.username;
				score = new Display(game.context, 10, 10, "20px Orbitron", "#fff", "left");
				player = new Player(game.context, 600, 660, 40, 40, 0, 0, "assets/space-ship-1");
				enemies = [];

				addEventListenersForGame(game)
				game.start(update);
			}
			else {
				const p = document.createElement("p");
				p.id = "error";
				p.innerHTML = object.message;
				document.body.append(p);
			}
		});
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

		user.update();

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

function addEventListenersForGame(game) {
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
