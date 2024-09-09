import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");

	playground.appendChild(div);
}

const fieldSize = 700 / 15;

let direction = "";

const snake: { x: number; y: number }[] = [];

let apple: { x: number; y: number } = { x: 0, y: 0 };

let speed = 2;

let intervalId = 0;

document.addEventListener("keydown", keyPress);

start();

function keyPress(event: KeyboardEvent) {
	const code = event.code;
	if (code === "ArrowUp" || code === "KeyW") {
		direction = "up";
		movement();
	} else if (code === "ArrowDown" || code === "KeyS") {
		direction = "down";
		movement();
	} else if (code === "ArrowLeft" || code === "KeyA") {
		direction = "left";
		movement();
	} else if (code === "ArrowRight" || code === "KeyD") {
		direction = "right";
		movement();
	}
}

function start() {
	snake.push({ x: 7 * fieldSize, y: 7 * fieldSize });
	const snakeGraphic = <HTMLDivElement>document.getElementById("snake");
	snakeGraphic.style.top = snake[0].y.toString() + "px";
	snakeGraphic.style.left = snake[0].x.toString() + "px";
	snakeGraphic.style.height = fieldSize.toString() + "px";
	snakeGraphic.style.width = fieldSize.toString() + "px";
	newFood();
	pace();
}

function newFood() {
	let randomX = Math.floor(Math.random() * (15 - 1) + 1);
	let randomY = Math.floor(Math.random() * (15 - 1) + 1);
	for (let position = 0; position < snake.length; position++) {
		if (randomX === snake[position].x && randomY === snake[position].y) {
			randomX = Math.floor(Math.random() * (15 - 1) + 1);
			randomY = Math.floor(Math.random() * (15 - 1) + 1);
		}
	}
	apple = { x: randomX * fieldSize, y: randomY * fieldSize };

	const food = <HTMLDivElement>document.getElementById("food");
	food.style.top = apple.y.toString() + "px";
	food.style.left = apple.x.toString() + "px";
}

function checkIfFood() {
	if (snake[0].x === apple.x && snake[0].y === apple.y) {
		clearInterval(intervalId);
		speed++;
		if (speed > 10) {
			speed = 10;
		}
		return true;
	}
}

function movement() {
	if (direction === "up") {
		snake.unshift({ x: snake[0].x, y: (snake[0].y -= fieldSize) });

		if (snake[0].y <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else if (checkIfFood()) {
			// grow();
			newFood();
		} else {
			snake.pop();
		}
	}

	if (direction === "down") {
		snake.unshift({ x: snake[0].x, y: (snake[0].y += fieldSize) });

		if (snake[0].y >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else if (checkIfFood()) {
			// grow();
			newFood();
		} else {
			snake.pop();
		}
	}
	if (direction === "left") {
		snake.unshift({ x: (snake[0].x -= fieldSize), y: snake[0].y });

		if (snake[0].x <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else if (checkIfFood()) {
			// grow();
			newFood();
		} else {
			snake.pop();
		}
	}
	if (direction === "right") {
		snake.unshift({ x: (snake[0].x += fieldSize), y: snake[0].y });

		if (snake[0].x >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else if (checkIfFood()) {
			// grow();
			newFood();
		} else {
			snake.pop();
		}
	}
}

// function grow() {
// 	snake.unshift({ x: apple.x, y: apple.y });
// }

function restart() {
	direction = "";
	snake.length = 0;
	apple = { x: 0, y: 0 };
	speed = 2;
	start();
}

function pace() {
	const tempo = 1000 / speed;
	intervalId = setInterval(movement, tempo);
}
