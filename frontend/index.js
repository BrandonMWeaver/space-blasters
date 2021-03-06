const BASE_URL = "http://localhost:3000";

const canvas = document.createElement("canvas");
const div = document.querySelector(".game");

let currentPlayer;

let game;
let paused = false;

let keyboard;
let background;
let overlay;
let user;
let score;
let player;
let enemies;

let leaderboardScores = [];

fetch(`${BASE_URL}/scores`)
.then(response => response.json())
.then(objectArray => {
	const leaderboard = document.querySelector(".leaderboard");
	for (const object of objectArray) {
		buildScoreDiv(object, leaderboard);
		leaderboardScores.push(object);
	}
});

addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id === "create") {
		postTo("players");
	}

	if (event.target.id === "find") {
		postTo("sessions");
	}

	if (event.target.id === "reverse") {
		const reverseScores = [];

		let j = 0;
		let tempUsername;
		let tempScore;
		let userUsernames = [];
		let userScores = [];
		for (const element of document.querySelectorAll("p#score")) {
			if (j % 2 === 0) {
				tempUsername = element.innerHTML;
				userUsernames.push(tempUsername);
			}
			else {
				tempScore = element.innerHTML;
				userScores.push(tempScore);
			}
			j++;
		}

		usernamesLength = userUsernames.length
		for (let i = 0; i < usernamesLength; i++) {
			reverseScores.push({ player: { username: userUsernames[i] }, number: userScores[i] });
		}

		const leaderboard = document.querySelector(".leaderboard");
		while(leaderboard.firstChild) {
			leaderboard.firstChild.remove();
		}

		const h3 = document.createElement("h3");
		h3.innerHTML = "Leaderboard";
		leaderboard.append(h3);

		reverseScoresLength = reverseScores.length
		if (reverseScoresLength > 0) {
			for (let i = reverseScoresLength - 1; i >= 0; i--) {
				buildScoreDiv(reverseScores[i], leaderboard);
			}
		}
	}
});

function update() {
	if (gameOver()) {
		postScore();
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
			enemies.push(new Enemy(game.context, "assets/space-ship-2", Math.floor(Math.random() * 1160) + 40, -40, 40, 40, 0, 1));
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

	player = new Player(game.context, "assets/space-ship-1", 600, 660, 40, 40, 0, 0);
	enemies = [];

	paused = false;

	game.start(update);
}

function postTo(resource) {
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

	fetch(`${BASE_URL}/${resource}`, {
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
		if (document.querySelector("p#error")) {
			document.querySelector("p#error").remove();
		}

		if (object.id && object.username) {
			currentPlayer = { id: object.id, username: object.username };

			document.querySelector("form").remove();
			div.append(canvas);

			game = new Game(canvas);

			keyboard = new Keyboard;
			background = new Background(game.context, "assets/background", 0, 0, 1280, 720, 0, 0.2);
			overlay = new Background(game.context, "assets/overlay", 0, 0, 1280, 720, 0, 0.1);
			user = new Display(game.context, 1270, 10, "20px Orbitron", "#fff", "right")
			user.text = currentPlayer.username;
			score = new Display(game.context, 10, 10, "20px Orbitron", "#fff", "left");
			player = new Player(game.context, "assets/space-ship-1", 600, 660, 40, 40, 0, 0);
			enemies = [];

			addEventListenersForGame(game)
			game.start(update);
		}
		else {
			const p = document.createElement("p");
			p.id = "error";
			p.innerHTML = object.message;
			document.querySelector("form").append(p);
		}
	});
}

function postScore() {
	fetch(`${BASE_URL}/scores`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			number: game.score,
			id: currentPlayer.id
		})
	})
	.then(response => response.json())
	.then(object => {
		for (let i = 0; i < leaderboardScores.length - 10; i++) { leaderboardScores.pop(); }
		for (let i = 0; i < leaderboardScores.length; i++) {
			if (object.number > leaderboardScores[i].number) {
				leaderboardScores.splice(i, 0, object);
				if (leaderboardScores.length === 11) {
					leaderboardScores.pop();
				}
				break;
			}
		}
		if (leaderboardScores.length < 10 && !leaderboardScores.includes(object)) {
			leaderboardScores.push(object);
		}

		const leaderboard = document.querySelector(".leaderboard");
		while(leaderboard.firstChild) {
			leaderboard.firstChild.remove();
		}
		const h3 = document.createElement("h3");
		h3.innerHTML = "Leaderboard";
		leaderboard.append(h3);
		for (const record of leaderboardScores) {
			buildScoreDiv(record, leaderboard);
		}
	});
}

function buildScoreDiv(object, leaderboard) {
	const scoreDiv = document.createElement("div");
	scoreDiv.className = "score";

	const username = document.createElement("p");
	username.id = "score";
	username.innerHTML = object.player.username;
	const score = document.createElement("p");
	score.id = "score";
	score.innerHTML = object.number;

	scoreDiv.append(username);
	scoreDiv.append(score);

	leaderboard.append(scoreDiv);
}
