let turnCounter = 0;
let correct;
let engineTurn;
let engineSequence = [];
let guessSequence = [];
let win;

const bottomLeft = document.querySelector('#bottomLeft');
const topLeft = document.querySelector('#topLeft');
const bottomRight = document.querySelector('#bottomRight');
const topRight = document.querySelector('#topRight');

const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');
let maxLevelDisplay = document.querySelector('.max-level');
let userInput = document.querySelector('.user-input');
let submit = document.querySelector('.submit');
let gameDisplay = document.querySelector('.game-display');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
resetButton.classList.toggle('hidden');
submit.addEventListener('click', setMaxLevel);

bottomLeft.addEventListener('click', pressBottomLeft);
topLeft.addEventListener('click', pressTopLeft);
bottomRight.addEventListener('click', pressBottomRight);
topRight.addEventListener('click', pressTopRight);

function pressBottomLeft() {
	console.log('clicked');
	bottomLeft.style.background = 'lightyellow';
	setTimeout(function () {
		clearAll();
	}, 100);
	if (engineTurn) {
		if (pressedOne < turnCounter) {
			pressedOne++;
		} else {
			engineTurn = false;
		}
	}
	if (!engineTurn) {
		guessSequence.push(1);
		checkCorrect();
	}
	//play tone
}
function pressTopLeft() {
	console.log('clicked');
	topLeft.style.background = 'lightgreen';
	setTimeout(function () {
		clearAll();
	}, 100);
	if (engineTurn) {
		if (pressedOne < turnCounter) {
			pressedOne++;
		} else {
			engineTurn = false;
		}
	}
	if (!engineTurn) {
		guessSequence.push(2);
		checkCorrect();
	}
	//play tone
}
function pressTopRight() {
	console.log('clicked');
	topRight.style.background = 'pink';
	setTimeout(function () {
		clearAll();
	}, 100);
	if (engineTurn) {
		if (pressedOne < turnCounter) {
			pressedOne++;
		} else {
			engineTurn = false;
		}
	}
	if (!engineTurn) {
		guessSequence.push(3);
		checkCorrect();
	}
	//play tone
}
function pressBottomRight() {
	console.log('clicked');
	bottomRight.style.background = 'lightblue';
	setTimeout(function () {
		clearAll();
	}, 100);
	if (engineTurn) {
		if (pressedOne < turnCounter) {
			pressedOne++;
		} else {
			engineTurn = false;
		}
	}
	if (!engineTurn) {
		guessSequence.push(4);
		checkCorrect();
	}
	//play tone
}

function startGame() {
	console.log('New Game Started');
	//start button is replaced with a reset button
	startButton.classList.toggle('hidden');
	resetButton.classList.toggle('hidden');

	//game starts with win as false and correct as true to continue engine playback
	win = false;
	correct = true;

	//arrays are reset to 0 to begin building a new sequence
	engineSequence = [];
	guessSequence = [];

	//current level is reset to 1 but onePress is set to 0, this will allow us to keep track ot the number of press actions made by the engine
	turnCounter = 1;
	pressedOne = 1;

	//when beginning a new game, all lights flash at once & display shows current level;
	flashAll();
	gameDisplay.innerHTML = `Current Level: ${turnCounter}`;
	maxLevelDisplay.append(userInput.value || 20);

	//setTimout for the engine moves, with setInterval to determine the time between tones

	//the array is constructed randomly until the max level
	for (let i = 0; i < 20; i++) {
		engineSequence.push(Math.floor(Math.random() * 4) + 1);
		// turnCounter++;
		// pressedOne++;
	}
	//now we start the first turn
	engineTurn = true;
	move();
	// setTimeout(move, 600);
}

function move() {
	if (engineTurn) {
		console.log('check');
		setTimeout(trackPlayed, 200);
	}
	if (pressedOne == turnCounter) {
		//if the lights are done being pressed then the engineTurn is over
		clearInterval();
		engineTurn = false;
	}
	//if it's the engine's turn then the engine starts to press buttons according to the array at that stage in the for loop
}

//this makes it so the the engine moves are push into an array to be later compared with the guessSequence array
function trackPlayed() {
	if (engineSequence[pressedOne] == 1) {
		pressBottomLeft();
	}
	if (engineSequence[pressedOne] == 2) {
		pressTopLeft();
	}
	if (engineSequence[pressedOne] == 3) {
		pressTopRight();
	}
	if (engineSequence[pressedOne] == 4) {
		pressBottomRight();
	}
}

function checkCorrect() {
	if (
		guessSequence[guessSequence.length - 1] !==
		engineSequence[engineSequence.length - 1]
	) {
		correct = false;
		gameOver();
	} else if (guessSequence.length == 20 && correct) {
		win();
	} else if (correct == false) {
		flashAll(); //make a new function for gameOver()
		//update display to say GAME OVER
		// resetGame();
	} else if (move == guessSequence.length && correct && !win) {
		move++;
		guessSequence = [];
		engineTurn = true;
		pressedOne = 0;
	}
}

function resetGame() {
	resetButton.classList.toggle('hidden');
	startButton.classList.toggle('hidden');
	console.log('Game Reset');
	win = false;
	engineSequence = [];
	guessSequence = [];
	intervalId = 0;
	maxLevelDisplay.innerHTML = `Max Level: 20`;
	gameDisplay.innerHTML = '';
	clearAll();
	clearInterval();
}

function flashAll() {
	bottomLeft.style.background = 'lightyellow';
	bottomRight.style.background = 'lightblue';
	topLeft.style.background = 'lightgreen';
	topRight.style.background = 'pink';
	setTimeout(function () {
		clearAll();
	}, 1000);
}

function gameOver() {
	flashAll();
	console.log('GAME OVER');
}

function finalWin() {
	flashAll();
	win = true;
	console.log('win');
}

function clearAll() {
	bottomLeft.style.background = 'yellow';
	bottomRight.style.background = 'blue';
	topLeft.style.background = 'green';
	topRight.style.background = 'red';
}

function setMaxLevel(number) {
	event.preventDefault();
	maxLevelDisplay.innerHTML = `Max Level: ${userInput.value || 20}`;
}
/*
PSEUDOCODE


when we press the start button
    -it is replaced with a reset button
    -all four lights flash at once
    -after flash...
        --all colors are cleared
        --display updates to Current Level: 1

engine sequence is played
    -engineSequence.push(Math.floor(Math.random() * 4) + 1)

update display to show "Your Turn" then go back to current level: __

guess sequence
    -guessSequence.push()

compare the arrays after each button click

if incorrect
    -update display to GAME OVER
    -game over light sequence (counter clockwise slowly)
    -then reset()

if correct
    -update display to LEVEL PASSED
    -update display to new turnCounter.value
    -engine plays new array

if correct on max level (default 20)
        --if (turnCounter = maxLevel + 1) {win()}
    -display updates to YOU WIN
    -lights go fast in random sequence
    -then reset()






*/
