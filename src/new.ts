import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let boardSize = 0; boardSize < 225; boardSize++) {
	const div = document.createElement("div");
	div.classList.add("board");
	playground.appendChild(div);
}

const startButton = document.createElement("button");
startButton.classList.add("start");
playground.appendChild(startButton);
startButton.innerHTML = " Start";

const score = <HTMLDivElement>document.getElementById("score");

const pointWriter = document.createElement("div");
pointWriter.classList.add("points");
score.appendChild(pointWriter);
pointWriter.innerHTML = "Punkte: ";

const highscore = document.createElement("div");
highscore.classList.add("highscore");
score.appendChild(highscore);
highscore.innerHTML = "Highscore: ";

const fieldSize = 700 / 15;

let direction = "right";
let lastDirection = "right";

const snake: { x: number; y: number }[] = [];

const appleField: { x: number; y: number }[] = [];

const pearField: { x: number; y: number }[] = [];

const brokenGround: { x: number; y: number }[] = [];

const takenFields: { x: number; y: number }[] = [];

let whichFood = "";

let foodCount = 1;

let speed = 2;

let intervalId = 0;

let points = 0;
let lastScore = 0;

document.addEventListener("keydown", keyPress);

startButton.addEventListener("click", start);

function keyPress(event: KeyboardEvent) {
	const code = event.code;
	if (code === "ArrowUp" || code === "KeyW") {
		direction = "up";
	} else if (code === "ArrowDown" || code === "KeyS") {
		direction = "down";
	} else if (code === "ArrowLeft" || code === "KeyA") {
		direction = "left";
	} else if (code === "ArrowRight" || code === "KeyD") {
		direction = "right";
	}
}

function start() {
	startButton.style.visibility = "hidden";
	snake.push({ x: 7, y: 7 });
	for (let b = 0; b < 5; b++) {
		appleField.push({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});
		checkifTaken(appleField[b].x, appleField[b].y);
	}
	for (let b = 0; b < 5; b++) {
		pearField.push({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});
		checkifTaken(pearField[b].x, pearField[b].y);
	}
	brokenGround.push({
		x: -1,
		y: -1,
	});

	newFood();
	pace();
}

function newFood() {
	let array = [];
	if (whichFood === "apple") {
		array = appleField;
	} else if (whichFood === "pear") {
		array = pearField;
	}
	let randomX = Math.floor(Math.random() * 15);
	let randomY = Math.floor(Math.random() * 15);

	checkifTaken(randomX, randomY);

	array.unshift({ x: randomX, y: randomY });
}

function checkIfFood() {
	for (let a = 0; a < 5; a++) {
		if (snake[0].y === appleField[a].y && snake[0].x === appleField[a].x) {
			clearInterval(intervalId);
			speed = speed + 0.1;
			appleField.splice(a, 1);
			if (speed > 15) {
				speed = 15;
			}
			points += 5;
			foodCount++;
			whichFood = "apple";
			pace();
			return true;
		}
	}
	for (let a = 0; a < 5; a++) {
		if (snake[0].y === pearField[a].y && snake[0].x === pearField[a].x) {
			clearInterval(intervalId);
			speed = speed + 0.2;
			pearField.splice(a, 1);
			if (speed > 15) {
				speed = 15;
			}
			points += 10;
			foodCount++;
			whichFood = "pear";
			pace();
			return true;
		}
	}
}

function checkIfCrash() {
	for (let body = 1; body < snake.length; body++) {
		if (snake[0].x === snake[body].x && snake[0].y === snake[body].y) {
			alert("Das war ein Crash. GAME OVER");

			restart();
		}
	}
	for (let position = 0; position < brokenGround.length; position++) {
		if (
			snake[0].x === brokenGround[position].x &&
			snake[0].y === brokenGround[position].y
		) {
			alert("Das war ein Crash. GAME OVER");

			restart();
		}
	}

	if (snake[0].y < 0) {
		snake[0].y = 14;
		speed = speed + 0.2;
		if (speed > 15) {
			speed = 15;
		}
		foodCount = 10;
	} else if (snake[0].y > 14) {
		snake[0].y = 0;
		speed = speed + 0.2;
		if (speed > 15) {
			speed = 15;
		}
		foodCount = 10;
	} else if (snake[0].x < 0) {
		snake[0].x = 14;
		speed = speed + 0.2;
		if (speed > 15) {
			speed = 15;
		}
		foodCount = 10;
	} else if (snake[0].x > 14) {
		snake[0].x = 0;
		speed = speed + 0.2;
		if (speed > 15) {
			speed = 15;
		}
		foodCount = 10;
	}
}

function checkDirection() {
	if (lastDirection === "up" && direction === "down") {
		direction = "up";
	}
	if (lastDirection === "down" && direction === "up") {
		direction = "down";
	}
	if (lastDirection === "right" && direction === "left") {
		direction = "right";
	}
	if (lastDirection === "left" && direction === "right") {
		direction = "left";
	}
}
function movement() {
	checkDirection();
	if (direction === "up") {
		lastDirection = "up";
		snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
	} else if (direction === "down") {
		lastDirection = "down";
		snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
	} else if (direction === "left") {
		lastDirection = "left";
		snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
	} else if (direction === "right") {
		lastDirection = "right";
		snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
	}
	checkIfCrash();
	buildHole();
	if (checkIfFood()) {
		newFood();
	} else {
		snake.pop();
	}
}

function restart() {
	clearInterval(intervalId);
	points = 0;
	direction = "right";
	lastDirection = "right";
	snake.splice(0);
	appleField.splice(0);
	pearField.splice(0);
	brokenGround.splice(0);
	takenFields.splice(0);
	speed = 2;
	whichFood = "";
	foodCount = 1;
	snake.push({ x: 7, y: 7 });

	for (let b = 0; b < 5; b++) {
		appleField.push({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});
	}
	for (let b = 0; b < 5; b++) {
		pearField.push({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});
	}
	startButton.style.visibility = "visible";
}

function pace() {
	intervalId = setInterval(() => {
		movement();
		render();
	}, 1000 / speed);
}

function getPosition(index: number) {
	return index * fieldSize + fieldSize / 2;
}

function checkHighscore() {
	if (points > lastScore) {
		highscore.innerHTML = "Highscore: " + points.toString();
		lastScore = points;
	}
}

function buildHole() {
	if (foodCount % 10 === 0) {
		brokenGround.unshift({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});
		checkifTaken(brokenGround[0].x, brokenGround[0].y);

		if (brokenGround.length > 15) {
			brokenGround.splice(15);
		}
		foodCount++;
	}
}

function checkifTaken(x: number, y: number) {
	for (let z = 0; z < 3; z++) {
		for (let a = 0; a < snake.length; a++) {
			if (snake[a].x === x && snake[a].y === y) {
				x = Math.floor(Math.random() * 15);
				y = Math.floor(Math.random() * 15);
			}

			for (let b = 0; b < brokenGround.length; b++) {
				if (brokenGround[b].x === x && brokenGround[b].y === y) {
					x = Math.floor(Math.random() * 15);
					y = Math.floor(Math.random() * 15);
				}

				for (let c = 0; c < appleField.length; c++) {
					if (appleField[c].x === x && appleField[c].y === y) {
						x = Math.floor(Math.random() * 15);
						y = Math.floor(Math.random() * 15);
					}

					for (let d = 0; d < pearField.length; d++) {
						if (pearField[d].x === x && pearField[d].y === y) {
							x = Math.floor(Math.random() * 15);
							y = Math.floor(Math.random() * 15);
						}
					}
				}
			}
		}
	}
}

function render() {
	pointWriter.innerHTML = "Punkte: " + points.toString();
	checkHighscore();
	const oldThings = document.querySelectorAll(".snake,.apple,.pear,.hole");
	for (const thing of oldThings) {
		thing.remove();
	}

	for (let apples = 0; apples < 5; apples++) {
		const food = document.createElement("div");
		food.classList.add("apple");
		food.style.left = getPosition(appleField[apples].x).toString() + "px";
		food.style.top = getPosition(appleField[apples].y).toString() + "px";
		food.innerHTML = "🍎";

		playground.appendChild(food);
	}

	for (let pears = 0; pears < 5; pears++) {
		const moreFood = document.createElement("div");
		moreFood.classList.add("pear");
		moreFood.style.left = getPosition(pearField[pears].x).toString() + "px";
		moreFood.style.top = getPosition(pearField[pears].y).toString() + "px";
		moreFood.innerHTML = "🍐";
		playground.appendChild(moreFood);
	}

	for (let runs = 0; runs < snake.length; runs++) {
		const snakeBody = document.createElement("div");
		snakeBody.classList.add("snake");

		snakeBody.style.left = getPosition(snake[runs].x).toString() + "px";
		snakeBody.style.top = getPosition(snake[runs].y).toString() + "px";

		snakeBody.innerHTML = "💠";

		playground.appendChild(snakeBody);
	}

	for (let holes = 0; holes < brokenGround.length; holes++) {
		const pit = document.createElement("div");
		pit.classList.add("hole");
		pit.style.left = getPosition(brokenGround[holes].x).toString() + "px";
		pit.style.top = getPosition(brokenGround[holes].y).toString() + "px";

		pit.innerHTML = "💣";
		playground.appendChild(pit);
	}
}
