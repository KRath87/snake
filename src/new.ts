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
	}
	for (let b = 0; b < 5; b++) {
		pearField.push({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});
	}
	brokenGround.push({
		x: -1,
		y: -1,
	});

	newFood();
	pace();
}

// function newFood() {
// 	let array = [];
// 	if (whichFood === "apple") {
// 		array = appleField;
// 	} else if (whichFood === "pear") {
// 		array = pearField;
// 	}
// 	let randomX = Math.floor(Math.random() * 15);
// 	let randomY = Math.floor(Math.random() * 15);
// 	for (let position = 0; position < snake.length; position++) {
// 		for (
// 			let holePosition = 0;
// 			holePosition < brokenGround.length;
// 			holePosition++
// 		) {
// 			if (
// 				(randomX === snake[position].x && randomY === snake[position].y) ||
// 				(randomX === brokenGround[holePosition].x &&
// 					randomY === brokenGround[holePosition].y)
// 			) {
// 				randomX = Math.floor(Math.random() * 15);
// 				randomY = Math.floor(Math.random() * 15);
// 			}
// 		}
// 	}
// 	array.unshift({ x: randomX, y: randomY });
// }

function newFood() {
	alreadyTakenFields();
	let array = [];

	let randomX = Math.floor(Math.random() * 15);
	let randomY = Math.floor(Math.random() * 15);

	if (whichFood === "apple") {
		array = appleField;
	} else if (whichFood === "pear") {
		array = pearField;
	}

	for (let position = 0; position < takenFields.length; position++) {
		if (
			randomX === takenFields[position].x &&
			randomY === takenFields[position].y
		) {
			randomX = Math.floor(Math.random() * 15);
			randomY = Math.floor(Math.random() * 15);
		}
	}

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
			pointWriter.innerHTML = "Punkte: " + points.toString();
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
			pointWriter.innerHTML = "Punkte: " + points.toString();
			pace();
			return true;
		}
	}
}

function checkIfCrash() {
	for (let body = 1; body < snake.length; body++) {
		if (snake[0].x === snake[body].x && snake[0].y === snake[body].y) {
			alert("Das war ein Crash. GAME OVER");
			checkHighscore();
			restart();
		}
	}
	for (let position = 0; position < brokenGround.length; position++) {
		if (
			snake[0].x === brokenGround[position].x &&
			snake[0].y === brokenGround[position].y
		) {
			alert("Das war ein Crash. GAME OVER");
			checkHighscore();
			restart();
		}
	}

	if (snake[0].y < 0) {
		alert("Das war ein Crash. GAME OVER");
		checkHighscore();
		restart();
	} else if (snake[0].y > 14) {
		alert("Das war ein Crash. GAME OVER");
		checkHighscore();
		restart();
	} else if (snake[0].x < 0) {
		alert("Das war ein Crash. GAME OVER");
		checkHighscore();
		restart();
	} else if (snake[0].x > 14) {
		alert("Das war ein Crash. GAME OVER");
		checkHighscore();
		restart();
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
	pointWriter.innerHTML = "Punkte: " + points.toString();
	direction = "right";
	lastDirection = "right";
	snake.splice(0);
	appleField.splice(0);
	pearField.splice(0);
	brokenGround.splice(0);
	speed = 2;
	whichFood = "";
	foodCount = 0;
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

function render() {
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
		brokenGround.push({
			x: Math.floor(Math.random() * 15),
			y: Math.floor(Math.random() * 15),
		});

		for (let position = 0; position < snake.length; position++) {
			for (let foodPos = 0; foodPos < 5; foodPos++) {
				if (
					(brokenGround[0].x === appleField[foodPos].x &&
						brokenGround[0].y === appleField[foodPos].y) ||
					(brokenGround[0].x === pearField[foodPos].x &&
						brokenGround[0].y === pearField[foodPos].y)
				)
					if (
						brokenGround[0].x === snake[position].x &&
						brokenGround[0].y === snake[position].y
					) {
						brokenGround[0].x = Math.floor(Math.random() * 15);
						brokenGround[0].y = Math.floor(Math.random() * 15);
					}
			}
		}

		foodCount++;
	}
}

function alreadyTakenFields() {
	let taken = 0;
	console.log(snake.length);
	console.log(snake);
	console.log(appleField.length);
	console.log(appleField);
	console.log(pearField.length);
	console.log(pearField);
	console.log(brokenGround.length);
	console.log(brokenGround);

	for (let a = 0; a < snake.length; a++) {
		takenFields.unshift({ x: snake[a].x, y: snake[a].y });
	}
	taken = snake.length;

	for (let b = 0; b < 5; b++) {
		takenFields.unshift({ x: appleField[b].x, y: appleField[b].y });
	}
	taken = snake.length + appleField.length;

	for (let c = 0; c < 5; c++) {
		takenFields.unshift({ x: pearField[c].x, y: pearField[c].y });
	}
	taken = snake.length + appleField.length + pearField.length;

	for (let d = 0; d < brokenGround.length; d++) {
		takenFields.unshift({ x: brokenGround[d].x, y: brokenGround[d].y });
	}

	taken =
		snake.length + appleField.length + pearField.length + brokenGround.length;

	console.log(taken);
	console.log(takenFields);
	console.log(takenFields.length);
	return takenFields;
}
