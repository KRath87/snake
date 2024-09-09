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

document.addEventListener("keydown", keyPress);

start();

function keyPress(event: KeyboardEvent) {
	const code = event.code;
	if (code === "ArrowUp" || code === "KeyW") {
		//up
		direction = "up";
		movement();
	} else if (code === "ArrowDown" || code === "KeyS") {
		//down
		direction = "down";
		movement();
	} else if (code === "ArrowLeft" || code === "KeyA") {
		//left
		direction = "left";
		movement();
	} else if (code === "ArrowRight" || code === "KeyD") {
		//right
		direction = "right";
		movement();
	}
}

function start() {
	snake.push({ x: 7 * fieldSize, y: 7 * fieldSize });
	apple = { x: Math.random() * (15 - 1) + 1, y: Math.random() * (15 - 1) + 1 };
	if (snake[0].x === apple.x && snake[0].y === apple.y) {
		apple = {
			x: 13 * fieldSize,
			y: Math.random() * (15 - 1) + 1,
		};
	}
}

function newFood() {
	const randomX = Math.floor(Math.random() * (15 - 1) + 1);
	const randomY = Math.floor(Math.random() * (15 - 1) + 1);

	apple = { x: randomX, y: randomY };

	speed++;
	if (speed > 10) {
		speed = 10;
	}
}

function checkIfFood() {
	if (snake[0].x === apple.x && snake[0].y === apple.y) {
		newFood();
		grow();
		return true;
	}
}

function movement() {
	// for (let e = 0; e < snake.length; e++) {
	if (direction === "up") {
		snake[0].y -= fieldSize;
		//
		if (snake[0].y <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			if (checkIfFood()) {
				grow();
			}
		}
	}

	if (direction === "down") {
		snake[0].y += fieldSize;
		//
		if (snake[0].y >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			if (checkIfFood()) {
				grow();
			}
		}
	}
	if (direction === "left") {
		snake[0].x -= fieldSize;
		//
		if (snake[0].x <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			if (checkIfFood()) {
				grow();
			}
		}
	}
	if (direction === "right") {
		snake[0].x += fieldSize;
		//
		if (snake[0].x >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			if (checkIfFood()) {
				grow();
			}
		}
	}
	// }
}

function grow() {
	if (direction === "up") {
		//
	}
	if (direction === "down") {
		//
	}
	if (direction === "right") {
		//
	}
	if (direction === "left") {
		//
	}
}

function restart() {
	//
}
