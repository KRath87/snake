import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");
	div.classList.add("board");
	playground.appendChild(div);
}

const fieldSize = 700 / 15;

let direction = "right";
let lastDirection = "right";

const snake: { x: number; y: number }[] = [];

let apple: { x: number; y: number } = {
	x: Math.floor(Math.random() * 15),
	y: Math.floor(Math.random() * 15),
};

let speed = 2;

let intervalId = 0;

document.addEventListener("keydown", keyPress);

start();

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
	snake.push({ x: 7, y: 7 });
	newFood();
	pace();
}

function newFood() {
	let randomX = Math.floor(Math.random() * 15);
	let randomY = Math.floor(Math.random() * 15);
	for (let position = 0; position < snake.length; position++) {
		if (randomX === snake[position].x && randomY === snake[position].y) {
			randomX = Math.floor(Math.random() * 15);
			randomY = Math.floor(Math.random() * 15);
		}
	}
	apple = { x: randomX, y: randomY };
}

function checkIfFood() {
	if (snake[0].y === apple.y && snake[0].x === apple.x) {
		clearInterval(intervalId);
		speed = speed + 0.1;
		if (speed > 15) {
			speed = 15;
		}
		pace();
		return true;
	}
}

function checkIfCrash() {
	console.log(snake[0].y);
	for (let body = 1; body < snake.length; body++) {
		if (snake[0].x === snake[body].x && snake[0].y === snake[body].y) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		}
	}

	if (snake[0].y < 0) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else if (snake[0].y > 14) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else if (snake[0].x < 0) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else if (snake[0].x > 14) {
		alert("Das war ein Crash. GAME OVER");
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
		checkIfCrash();
	} else if (direction === "down") {
		lastDirection = "down";
		snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
		checkIfCrash();
	} else if (direction === "left") {
		lastDirection = "left";
		snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
		checkIfCrash();
	} else if (direction === "right") {
		lastDirection = "right";
		snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
		checkIfCrash();
	}
	if (checkIfFood()) {
		newFood();
	} else {
		snake.pop();
	}
}

function restart() {
	clearInterval(intervalId);
	direction = "right";
	lastDirection = "right";
	snake.splice(0);
	speed = 2;
	snake.push({ x: 7, y: 7 });

	start();
}

function pace() {
	intervalId = setInterval(() => {
		movement();
		render();
	}, 1000 / speed);
}
function render() {
	const oldThings = document.querySelectorAll(".snake,.food");
	for (const thing of oldThings) {
		thing.remove();
	}

	const food = document.createElement("div");
	food.classList.add("food");
	playground.appendChild(food);

	food.style.left = getPosition(apple.x).toString() + "px";
	food.style.top = getPosition(apple.y).toString() + "px";

	for (let runs = 0; runs < snake.length; runs++) {
		const snakeBody = document.createElement("div");
		snakeBody.classList.add("snake");

		snakeBody.style.left = getPosition(snake[runs].x).toString() + "px";
		snakeBody.style.top = getPosition(snake[runs].y).toString() + "px";
		snakeBody.style.height = fieldSize.toString() + "px";
		snakeBody.style.width = fieldSize.toString() + "px";
		playground.appendChild(snakeBody);
	}
}

function getPosition(index: number) {
	return index * fieldSize + fieldSize / 2;
}
