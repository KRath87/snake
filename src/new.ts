import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");

	playground.appendChild(div);
}

const fieldSize = 700 / 15;

let direction = "";

const snake: { x: number; y: number }[] = [];

let apple: { x: number; y: number } = {
	x: Math.floor(Math.random() * 15),
	y: Math.floor(Math.random() * 15),
};

let speed = 500;

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
	movement();
}

function start() {
	snake.push({ x: getPosition(7), y: getPosition(7) });
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
		speed = speed - 0.5;
		if (speed > 10) {
			speed = 10;
		}
		pace();
		return true;
	}
}

function movement() {
	if (direction === "up") {
		snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
		console.log(snake);

		if (snake[0].y < 0) {
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

if (direction === "down") {
	snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
	console.log(snake);
	if (snake[0].y > 14) {
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
	snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
	console.log(snake);
	if (snake[0].x < 0) {
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
	snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
	console.log(snake);
	if (snake[0].x > 14) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else if (checkIfFood()) {
		// grow();

		newFood();
	} else {
		snake.pop();
	}
}

function restart() {
	direction = "";
	snake.length = 0;
	apple = {
		x: Math.floor(Math.random() * 15),
		y: Math.floor(Math.random() * 15),
	};
	speed = 2;
	start();
}

function pace() {
	intervalId = setInterval(() => {
		movement();
		render();
	}, speed);
}
function render() {
	const food = document.createElement("div");
	food.id = "food";
	playground.appendChild(food);

	food.style.left = getPosition(apple.x).toString() + "px";
	food.style.top = getPosition(apple.y).toString() + "px";
	// console.log(apple.y);
	// console.log(apple.x);

	for (let runs = 0; runs < snake.length; runs++) {
		const snakeBody = document.createElement("div");
		snakeBody.id = "snake";

		snakeBody.style.left = snake[runs].x.toString() + "px";
		snakeBody.style.top = snake[runs].y.toString() + "px";
		snakeBody.style.height = fieldSize.toString() + "px";
		snakeBody.style.width = fieldSize.toString() + "px";
		playground.appendChild(snakeBody);
	}
}

function getPosition(index: number) {
	return index * fieldSize + fieldSize / 2;
}
