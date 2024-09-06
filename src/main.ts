import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");

	playground.appendChild(div);
}

const fieldSize = 700 / 15;

let direction = "";
let intervalId = 0;

let lastPosition = {
	x: 7 * fieldSize,
	y: 7 * fieldSize,
};

let position = {
	x: 7 * fieldSize,
	y: 7 * fieldSize,
};

let randomX = Math.floor(Math.random() * (15 - 1) + 1);
let randomY = Math.floor(Math.random() * (15 - 1) + 1);

let positionFood = {
	x: randomX * fieldSize,
	y: randomY * fieldSize,
};

let foodCount = 0;
let speed = 500;

const snake = <HTMLDivElement>document.getElementById("snake");
snake.style.top = position.y.toString() + "px";
snake.style.left = position.x.toString() + "px";
snake.style.height = fieldSize.toString() + "px";
snake.style.width = fieldSize.toString() + "px";

const newSnake = document.createElement("div");
newSnake.id = "newSnake";
newSnake.style.top = lastPosition.y.toString() + "px";
newSnake.style.left = lastPosition.x.toString() + "px";
newSnake.style.height = fieldSize.toString() + "px";
newSnake.style.top = fieldSize.toString() + "px";

const movingSnake: HTMLDivElement[] = [];
movingSnake[foodCount] = snake;

const food = <HTMLDivElement>document.getElementById("food");
food.style.top = positionFood.y.toString() + "px";
food.style.left = positionFood.x.toString() + "px";

document.addEventListener("keydown", movement);

pace();

function movement(e: KeyboardEvent) {
	const code = e.code;
	if (code === "ArrowUp" || code === "KeyW") {
		//up
		changeDirection("up");
	} else if (code === "ArrowDown" || code === "KeyS") {
		//down
		changeDirection("down");
	} else if (code === "ArrowLeft" || code === "KeyA") {
		//left
		changeDirection("left");
	} else if (code === "ArrowRight" || code === "KeyD") {
		//right
		changeDirection("right");
	}
}

function changeDirection(action: string) {
	if (action === "up") {
		direction = "up";
		moveUp();
	}

	if (action === "down") {
		direction = "down";
		moveDown();
	}
	if (action === "left") {
		direction = "left";
		moveLeft();
	}
	if (action === "right") {
		direction = "right";
		moveRight();
	}
}
function restart() {
	position = {
		x: 7 * fieldSize,
		y: 7 * fieldSize,
	};
	lastPosition = {
		x: 7 * fieldSize,
		y: 7 * fieldSize,
	};
	movingSnake[foodCount].style.left = position.x.toString() + "px";
	movingSnake[foodCount].style.top = position.y.toString() + "px";
	foodCount = 0;
	randomX = Math.floor(Math.random() * (15 - 1) + 1);
	randomY = Math.floor(Math.random() * (15 - 1) + 1);
	positionFood = {
		x: randomX * fieldSize,
		y: randomY * fieldSize,
	};
	food.style.top = positionFood.y.toString() + "px";
	food.style.left = positionFood.x.toString() + "px";
	direction = "";
	speed = 500;
}

function checkIfFood() {
	if (
		Math.round(position.x) === Math.round(positionFood.x) &&
		Math.round(position.y) === Math.round(positionFood.y)
	) {
		foodCount++;
		randomX = Math.floor(Math.random() * (15 - 1) + 1);
		randomY = Math.floor(Math.random() * (15 - 1) + 1);
		positionFood = {
			x: randomX * fieldSize,
			y: randomY * fieldSize,
		};
		food.style.top = positionFood.y.toString() + "px";
		food.style.left = positionFood.x.toString() + "px";
		clearInterval(intervalId);
		speed = speed - 25;
		if (speed <= 50) {
			speed = 50;
		}
		pace();
		return true;
	}
}

function growBottom() {
	movingSnake[foodCount] = newSnake;
	console.log(newSnake);
	console.log(movingSnake);
}
function growTop() {
	movingSnake[foodCount] = newSnake;
	console.log(movingSnake);
}
function growLeft() {
	movingSnake[foodCount] = newSnake;
	console.log(movingSnake);
}
function growRight() {
	movingSnake[foodCount] = newSnake;
	console.log(movingSnake);
}

function moveUp() {
	lastPosition = { ...position };
	position.y -= fieldSize;
	console.log(lastPosition);
	console.log(position);
	if (position.y <= 0 - fieldSize) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else {
		movingSnake[foodCount].style.top = position.y.toString() + "px";
		if (checkIfFood()) {
			growBottom();
		}
	}
}

function moveDown() {
	lastPosition = { ...position };
	position.y += fieldSize;
	console.log(lastPosition);
	console.log(position);
	if (position.y >= 700 - fieldSize) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else {
		movingSnake[foodCount].style.top = position.y.toString() + "px";
		if (checkIfFood()) {
			growTop();
		}
	}
}

function moveRight() {
	lastPosition = { ...position };
	position.x += fieldSize;
	console.log(lastPosition);
	console.log(position);
	if (position.x >= 700 - fieldSize) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else {
		movingSnake[foodCount].style.left = position.x.toString() + "px";
		if (checkIfFood()) {
			growLeft();
		}
	}
}

function moveLeft() {
	lastPosition = { ...position };
	position.x -= fieldSize;
	console.log(lastPosition);
	console.log(position);
	if (position.x <= 0 - fieldSize) {
		alert("Das war ein Crash. GAME OVER");
		restart();
	} else {
		movingSnake[foodCount].style.left = position.x.toString() + "px";
		if (checkIfFood()) {
			growRight();
		}
	}
}

function move() {
	if (direction === "up") {
		moveUp();
	} else if (direction === "down") {
		moveDown();
	} else if (direction === "right") {
		moveRight();
	} else if (direction === "left") {
		moveLeft();
	}
}

function pace() {
	intervalId = setInterval(move, speed);
}
