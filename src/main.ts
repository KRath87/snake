import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");

for (let i = 0; i < 225; i++) {
	const div = document.createElement("div");

	playground.appendChild(div);
}

const position = {
	x: 330,
	y: 330,
};

let snakeSize = { width: 30, height: 30 };

let snake = <HTMLDivElement>document.getElementById("snake");

const food = <HTMLDivElement>document.getElementById("food");

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
		position.y -= 20;
		snake.style.top = position.y.toString() + "px";
		if (position.y <= 0) {
			alert("Das war ein Crash. GAME OVER");
		}
	}
	if (action === "down") {
		position.y += 20;
		snake.style.top = position.y.toString() + "px";
		if (position.y >= 700) {
			alert("Das war ein Crash. GAME OVER");
		}
	}
	if (action === "left") {
		position.x -= 20;
		snake.style.left = position.x.toString() + "px";
		if (position.x <= 0) {
			alert("Das war ein Crash. GAME OVER");
		}
	}
	if (action === "right") {
		position.x += 20;
		snake.style.left = position.x.toString() + "px";
		if (position.x >= 700) {
			alert("Das war ein Crash. GAME OVER");
		}
	}
}
