import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");

	playground.appendChild(div);
}

const fieldSize = 700 / 15;

let position = {
	x: 7 * fieldSize,
	y: 7 * fieldSize,
};

let randomX = Math.floor(Math.random() * (15 - 1) + 1);
let randomY = Math.floor(Math.random() * (15 - 1) + 1);
console.log(randomX);
console.log(randomY);

let positionFood = {
	x: randomX * fieldSize,
	y: randomY * fieldSize,
};

let foodCount = 0;

let snakeSize = { width: fieldSize, height: fieldSize };

let snake = <HTMLDivElement>document.getElementById("snake");

const food = <HTMLDivElement>document.getElementById("food");

food.style.top = positionFood.y.toString() + "px";
food.style.left = positionFood.x.toString() + "px";
document.addEventListener("keydown", movement);

function movement(e: KeyboardEvent) {
	const code = e.code;
	console.log(e.code);
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
		position.y -= fieldSize;
		if (position.y <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			snake.style.top = position.y.toString() + "px";
			checkIfFood();
		}
	}

	if (action === "down") {
		position.y += fieldSize;
		if (position.y >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			snake.style.top = position.y.toString() + "px";
			checkIfFood();
		}
	}
	if (action === "left") {
		position.x -= fieldSize;
		if (position.x <= 0 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			snake.style.left = position.x.toString() + "px";
			checkIfFood();
		}
	}
	if (action === "right") {
		position.x += fieldSize;
		if (position.x >= 700 - fieldSize) {
			alert("Das war ein Crash. GAME OVER");
			restart();
		} else {
			snake.style.left = position.x.toString() + "px";
			checkIfFood();
		}
	}
}
function restart() {
	position = {
		x: 7 * fieldSize,
		y: 7 * fieldSize,
	};
	snake.style.left = position.x.toString() + "px";
	snake.style.top = position.y.toString() + "px";
}

function checkIfFood() {
	if (position === positionFood) {
		foodCount++;
		food.style.top = positionFood.y.toString() + "px";
		food.style.left = positionFood.x.toString() + "px";
	}
}
