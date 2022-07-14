const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const foodPosition = {
	x: null,
	y: null,
}


	const snake = {
		size: 20,
		posX: canvasWidth / 2,
		posY: (canvasHeight - 20) / 2,
		body: [],
		movement: 'right',
		length: 4,
	}

	console.log()


	window.addEventListener('keypress', (ev)=> {
		const {key} = ev;

		switch(key) {
			case 'w':
				if (snake.movement !== 'down') snake.movement = 'up';
				break;
			case 'a':
				if (snake.movement !== 'right') snake.movement = 'left';
				break;
			case 'd':
				if (snake.movement !== 'left') snake.movement = 'right';
				break; 
			case 's': 
			  if (snake.movement !== 'up') snake.movement = 'down';
				break;
		}

	}) 


	let interval = setInterval(move, 50)


	function drawSnake() {
			if (snake.body.some(hasEatenItself)) {
				gameOver();
				return false
			}

			snake.body.push([snake.posX, snake.posY]);
			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.fillRect(snake.posX, snake.posY, snake.size, snake.size);
			ctx.closePath();

		if (snake.body.length > snake.length) {
			let itemToRemove = snake.body.shift();
			ctx.clearRect(itemToRemove[0], itemToRemove[1], snake.size, snake.size);
		}

	}

	function eatFood() {
		if (snake.posX === foodPosition.x && snake.posY === foodPosition.y) {
			snake.length += 1;

			drawFood();
		}
	}

	function drawFood() {
		foodPosition.x = generateRandomNum(0, canvasHeight, snake.size);
		foodPosition.y = generateRandomNum(0, canvasHeight, snake.size);

		if (snake.body.some(hasCoordinates)) {
			drawFood()
		} else {
			ctx.beginPath();
			ctx.fillStyle = 'green';
			ctx.fillRect(foodPosition.x, foodPosition.y, 20, 20);
			ctx.closePath();
		}

	}

	function hasEatenItself(elem) {
		return elem[0] === snake.posX && 
		elem[1] === snake.posY
	}

	function generateRandomNum(min,max,num){
    return Math.floor(Math.floor(Math.random()*(max-min+1)+min) / num) * num;
}

	function hasCoordinates(elem, i, arr) {
		return elem[0] === foodPosition.x && elem[1] === foodPosition.y
	}


	function move() {
		switch(snake.movement) {
			case 'up':
				if ((snake.posY + snake.size) > snake.size)	snake.posY -= snake.size;
				break;
			case 'left':
				if ((snake.posX + snake.size) > snake.size) snake.posX -= snake.size;
				break;
			case 'right':
				if ((snake.posX + snake.size) < canvasWidth) snake.posX += snake.size;
				break; 
			case 'down': 
				if ((snake.posY + snake.size) < canvasHeight) snake.posY += snake.size;
				break;
		}
			
			eatFood();
		
		drawSnake();
	}

	function gameOver() {
		//for (let i = 0; i < snake.body.length; i++) {
		//	ctx.clearRect(snake.body[i][0], snake.body[i][1], snake.size, snake.size);
		//}


		clearInterval(interval);
		const score = (snake.length - 4);
		snake.body = [];
		snake.length = 4;
		alert('Game is over. Your score is ' + score);
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		snake.posX = canvasWidth / 2;
		snake.posY = (canvasHeight - 20) / 2;
		interval = setInterval(move, 50);
		drawFood();
	}

	move();
	drawFood();





	//function test3() {
	//	const test = [1, 2, 3];
	//	const test555 = 5;
	//	test.map(anotherFunc)

	//}

	//function anotherFunc(elem) {
	//	//console.log(test555)
	//	console.log(this)
	//} 

	//test3();



