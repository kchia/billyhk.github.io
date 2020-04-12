//the following sequences will be compared to judge if the player is correct
let engineSequence = [];
let playerSequence = [];

//a flash is a move by the engine
//a turn is the current round of the game, that is how many flashes the engine will play
let flash;
let turn;

//engineTurn is used to determine when the engineTurn is over. if the engine has played the same number of flashes as the number of the current turn, then the engineTurn is over, and it is time for the the player to guess
let engineTurn;

//correct is used to determine what will happen after the player guesses
//if the player is not correct: game over
//if the player is correct but it's not the last turn: proceed with next turn
//if the player is correct and it is the last turn: win = true
let correct;

//intervalId is set to 0 because it will be updated in functions below
let intervalId = 0;

//on is set to false so we can still press the lights but nothing happens
let on = false;

//win is set default to false because it will later be used to trigger for the winGame function
let win = false;

const turnCounter = document.querySelector('.turn-counter');

const topLeft = document.querySelector('#topLeft');
const topRight = document.querySelector('#topRight');
const bottomRight = document.querySelector('#bottomRight');
const bottomLeft = document.querySelector('#bottomLeft');

//reset starts hidden
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');
resetButton.classList.toggle('hidden'); //the reset button starts hidden, it simply reloads the page
startButton.addEventListener('click', startGame);

function startGame() {
	playStartGameSound();

	//when you press the start button, it is replaced with a reset button
	startButton.classList.toggle('hidden');
	resetButton.classList.toggle('hidden');

	//engineTurn and correct start as true because the computer starts, and cannot be marked as incorrect
	engineTurn = true;
	correct = true;

	//a flash is an action made by the engine. it is reset to 0 at the beginning of each turn. the engine makes the same number of flashes as the number of the current turn
	flash = 0;
	turn = 1;

	//update the turn counter in the html
	turnCounter.innerHTML = 1;

	//the game always starts with empty arrays that will be filled with the result of the for loop below and the player's guesses
	engineSequence = [];
	playerSequence = [];

	//create an array of randomly assorted numbers from 1 to 4
	for (let i = 0; i < 12; i++) {
		engineSequence.push(Math.floor(Math.random() * 4) + 1);
	}

	//set the intervalId
	//call gameTurn, which allows the engine to start
	intervalId = setInterval(gameTurn, 1200);
}

function gameTurn() {
	//the engine hasn't played yet, so the flash will be less than turn; thus it will go on to else if...

	//if this condition is true then it's the player's turn. since on is true, the lights' event listeners will now be active
	if (flash == turn) {
		engineTurn = false;
		on = true;
		clearInterval(intervalId);
		clearAllLights();
	} else if (engineTurn) {
		//if the engine plays a flash, that flash will have the effect of a click
		//a flash is added with each engine click to make progress toward reaching the number of the turn
		setTimeout(() => {
			if (engineSequence[flash] == 1) clickTopLeft();
			else if (engineSequence[flash] == 2) clickTopRight();
			else if (engineSequence[flash] == 3) clickBottomRight();
			else clickBottomLeft();
			flash++;
		}, 180);
		clearAllLights();
	}
}

//the next four sequences affect the playerSequence
//with each click, the light is compared with the engineArray with a corresponding light. the are numbered 1 to 4 clockwise from top left
topLeft.addEventListener('click', (event) => {
	if (on) {
		clickTopLeft();
		playerSequence.push(1);
		checkCorrect();
		setTimeout(clearAllLights, 180);
	}
});
topRight.addEventListener('click', (event) => {
	if (on) {
		clickTopRight();
		playerSequence.push(2);
		checkCorrect();
		setTimeout(clearAllLights, 180);
	}
});
bottomRight.addEventListener('click', (event) => {
	if (on) {
		clickBottomRight();
		playerSequence.push(3);
		checkCorrect();
		setTimeout(clearAllLights, 180);
	}
});
bottomLeft.addEventListener('click', (event) => {
	if (on) {
		clickBottomLeft();
		playerSequence.push(4);
		checkCorrect();
		setTimeout(clearAllLights, 180);
	}
});

//the next four functions create the effect that the lights are being clicked either by the player or the engine

//flashes with sound-- for gameplay
function clickTopLeft() {
	console.log('clicked 1')

	topLeft.style.background = 'lightgreen';
	topLeft.style.border = '8px solid rgb(201, 174, 174)';

	playTopLeft();
}
function clickTopRight() {
	console.log('clicked 2')

	topRight.style.background = 'pink';
	topRight.style.border = '8px solid rgb(201, 174, 174)';

	playTopRight();
}
function clickBottomRight() {
	console.log('clicked 3')

	bottomRight.style.background = 'lightblue';
	bottomRight.style.border = '8px solid rgb(201, 174, 174)';

	playBottomRight();
}
function clickBottomLeft() {
	console.log('clicked 4');

	bottomLeft.style.background = 'lightyellow';
	bottomLeft.style.border = '8px solid rgb(201, 174, 174)';

	playBottomLeft();
}

//muted flashes-- for winGame()
function clickTopLeftMuted() {
	topLeft.style.background = 'lightgreen';
	topLeft.style.border = 'solid rgb(201, 174, 174)';
}
function clickTopRightMuted() {
	topRight.style.background = 'pink';
	topRight.style.border = 'solid rgb(201, 174, 174)';
}
function clickBottomRightMuted() {
	bottomRight.style.background = 'lightblue';
	bottomRight.style.border = 'solid rgb(201, 174, 174)';
}
function clickBottomLeftMuted() {
	bottomLeft.style.background = 'lightyellow';
	bottomLeft.style.border = 'solid rgb(201, 174, 174)';
}

//this function checks for correct and follows up with a function depending on the condition
function checkCorrect() {
	//if the last clicked light by the player does not equal that index in the engineSequence, then the choice is deemed incorrect, more to next if statement
	if (
		playerSequence[playerSequence.length - 1] !==
		engineSequence[playerSequence.length - 1]
	) {
		correct = false;
	}
	//if the player is incorrect, all lights flash, and the display shows game over and your score
	if (correct == false) {
		flashAllLights();
		setTimeout(() => {
			turnCounter.innerHTML = `GAME OVER. Your Score: ${turn}`;
			clearAllLights();
		}, 800);
		setTimeout(playGameOverSound, 800);
		on = false;
		//however, if you are correct, you are passed to the next turn
	} else if (turn == playerSequence.length && correct && !win && turn < 12) {
		turn++;
		turnCounter.innerHTML = turn;

		flash = 0;
		playerSequence = [];

		engineTurn = true;

		intervalId = setInterval(gameTurn, 800);

		//if you win all turns, winGame function is called
	} else if (playerSequence.length == 12 && correct) {
		winGame();
	}
}

//if you pass all turns of the game, the clicks are no longer pushed to an array (off position) and the display reads "win"
function winGame() {
	setTimeout(playWinGameSound, 800);

	on = false;
	win = true;

	intervalId = setInterval(flashAllLightsRandomly, 200);
	turnCounter.innerHTML = 'CONGRATULATIONS! YOU WIN!';

	function flashAllLightsRandomly() {
		let winSequence = [];
		for (let i = 0; i < 20; i++) {
			winSequence.push(Math.floor(Math.random() * 4) + 1);
			if (winSequence[i] == 1) {
				clickTopLeftMuted();
				topRight.style.background = 'red';
				bottomRight.style.background = 'blue';
				bottomLeft.style.background = 'yellow';
			} else if (winSequence[i] == 2) {
				clickTopRightMuted();
				topLeft.style.background = 'green';
				bottomRight.style.background = 'blue';
				bottomLeft.style.background = 'yellow';
			} else if (winSequence[i] == 3) {
				clickBottomRightMuted();
				topLeft.style.background = 'green';
				topRight.style.background = 'red';
				bottomLeft.style.background = 'yellow';
			} else if (winSequence[i] == 4) {
				clickBottomLeftMuted();
				topLeft.style.background = 'green';
				topRight.style.background = 'red';
				bottomRight.style.background = 'blue';
			}
		}
	}
}

//this triggers all lights to flash simultaneously
function flashAllLights() {
	topLeft.style.background = 'lightgreen';
	topRight.style.background = 'pink';
	bottomRight.style.background = 'lightblue';
	bottomLeft.style.background = 'lightyellow';
}

//this  turns all the lights back to their default color
function clearAllLights() {
	topLeft.style.background = 'green';
	topRight.style.background = 'red';
	bottomRight.style.background = 'blue';
	bottomLeft.style.background = 'yellow';

	topLeft.style.border = 'none';
	topRight.style.border = 'none';
	bottomRight.style.border = 'none';
	bottomLeft.style.border = 'none';
}

//these functions are called to play audio files that I composed using Logic Pro
function playStartGameSound() {
	const startGameSound = document.querySelector('.start-game-sound');
	startGameSound.play();
}
function playGameOverSound() {
	const gameOverSound = document.querySelector('.game-over-sound');
	gameOverSound.play();
}
function playWinGameSound() {
	let winGameSound = document.querySelector('.win-game-sound');
	winGameSound.play();
}
function playTopLeft() {
	const topLeftSound = document.querySelector('.top-left-sound');
	topLeftSound.play();
}
function playTopRight() {
	const topRightSound = document.querySelector('.top-right-sound');
	topRightSound.play();
}
function playBottomRight() {
	const bottomRightSound = document.querySelector('.bottom-right-sound');
	bottomRightSound.play();
}
function playBottomLeft() {
	const bottomLeftSound = document.querySelector('.bottom-left-sound');
	bottomLeftSound.play();
}

/*
too add
-pastel color scheme
-more space and rounded edges for the 4 elements
-more exciting game display
-put a footer with your info
*/
