// @ts-nocheck

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

	if (checkIfCrash()) {
		restart();
	} else if (checkIfFood()) {
		newFood();
	} else {
		snake.pop();
	}

	checkIfCrash();
	if (checkIfFood()) {
		newFood();
	} else {
		snake.pop();
	}
}

function movement() {
	checkDirection();
	if (direction === "up") {
		lastDirection = "up";
		snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
		checkIfCrash();
		if (checkIfFood()) {
			newFood();
		} else {
			snake.pop();
		}
	}
	if (direction === "down") {
		lastDirection = "down";
		snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
		checkIfCrash();
		if (checkIfFood()) {
			newFood();
		} else {
			snake.pop();
		}
	}
	if (direction === "left") {
		lastDirection = "left";
		snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
		checkIfCrash();
		if (checkIfFood()) {
			newFood();
		} else {
			snake.pop();
		}
	}
	if (direction === "right") {
		lastDirection = "right";
		snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
		checkIfCrash();
		if (checkIfFood()) {
			newFood();
		} else {
			snake.pop();
		}
	}
}
