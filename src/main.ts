import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");

	playground.appendChild(div);
}

const fieldSize = 700 / 15;

let direction = "";

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

const snake = <HTMLDivElement>document.getElementById("snake");
snake.style.top = position.y.toString() + "px";
snake.style.left = position.x.toString() + "px";
snake.style.height = fieldSize.toString() + "px";
snake.style.width = fieldSize.toString() + "px";

const movingSnake: HTMLDivElement[] = [];
movingSnake[foodCount] = snake;

const food = <HTMLDivElement>document.getElementById("food");
food.style.top = positionFood.y.toString() + "px";
food.style.left = positionFood.x.toString() + "px";

// setInterval(start, 500);

document.addEventListener("keydown", movement);

setInterval(move, 500);
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

		return true;
	}
}

function growBottom() {
	movingSnake[foodCount] = snake;
	movingSnake[foodCount - 1] = snake;
	//
}
function growTop() {
	movingSnake[foodCount] = snake;

	//
}
function growLeft() {
	movingSnake[foodCount] = snake;
	//
}
function growRight() {
	movingSnake[foodCount] = snake;
	//
}

function moveUp() {
	position.y -= fieldSize;

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
	position.y += fieldSize;
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
	position.x += fieldSize;
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
	position.x -= fieldSize;
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
		position.y -= fieldSize;
		if (position.y <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			movingSnake[foodCount].style.top = position.y.toString() + "px";
			if (checkIfFood()) {
				growBottom();
			}
		}
	} else if (direction === "down") {
		position.y += fieldSize;
		if (position.y >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			movingSnake[foodCount].style.top = position.y.toString() + "px";
			if (checkIfFood()) {
				growTop();
			}
		}
	} else if (direction === "right") {
		position.x += fieldSize;
		if (position.x >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			movingSnake[foodCount].style.left = position.x.toString() + "px";
			if (checkIfFood()) {
				growLeft();
			}
		}
	} else if (direction === "left") {
		position.x -= fieldSize;
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
}
