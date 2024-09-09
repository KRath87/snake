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

function keyPress(event: KeyboardEvent) {
	const code = event.code;
	if (code === "ArrowUp" || code === "KeyW") {
		//up
		direction = "up";
		movement("up");
	} else if (code === "ArrowDown" || code === "KeyS") {
		//down
		direction = "down";
		movement("down");
	} else if (code === "ArrowLeft" || code === "KeyA") {
		//left
		direction = "left";
		movement("left");
	} else if (code === "ArrowRight" || code === "KeyD") {
		//right
		direction = "right";
		movement("right");
	}
}

function start() {
	snake.push({ x: 7 * fieldSize, y: 7 * fieldSize });
	apple = { x: Math.random() * (15 - 1) + 1, y: Math.random() * (15 - 1) + 1 };
	if (snake[0].x === apple.x && snake[0].y === apple.y) {
		apple = {
			x: Math.random() * (15 - 1) + 1,
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
	}
}

function movement() {
	for (let e = 0; e < snake.length; e++) {
		if (direction === "up") {
			snake[0].y -= fieldSize;
			//
		}
		if (direction === "down") {
			snake[0].y += fieldSize;
			//
		}
		if (direction === "left") {
			snake[0].x -= fieldSize;
			//
		}
		if (direction === "right") {
			snake[0].x += fieldSize;
			//
		}
	}
}

function grow() {
	//
}
