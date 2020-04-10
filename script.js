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
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');

startButton.addEventListener('click', startGame);
resetButton.classList.toggle('hidden');
resetButton.addEventListener('click', resetGame);

function startGame() {
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
	for (let i = 0; i < 20; i++) {
		engineSequence.push(Math.floor(Math.random() * 4) + 1);
	}

	//set the intervalId
	intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
	//if the engine just played, then flash == turn
	//on must be true so when a flash is played it will update the array
	if (flash == turn) {
		on = true;
		engineTurn = false;
		clearInterval(intervalId);
		clearAll();
	} else if (engineTurn) {
		//if the engine plays a flash, that flash will have the effect of a click
		//a flash is added with each engine click to ensure that the engine plays the same number of flashes as the number of the round
		setTimeout(() => {
			if (engineSequence[flash] == 1) one();
			else if (engineSequence[flash] == 2) two();
			else if (engineSequence[flash] == 3) three();
			else four();
			flash++;
		}, 200);
		clearAll();
	}
}

//the next four functions create the effect that the engine is clicking on a light as it iterates through the array
function one() {
	topLeft.style.background = 'lightgreen';
	//play tone
}
function two() {
	topRight.style.background = 'pink';
	//play tone
}
function three() {
	bottomRight.style.background = 'lightblue';
	//play tone
}
function four() {
	bottomLeft.style.background = 'lightyellow';
	//play tone
}

//this functions turns all the lights to default color
function clearAll() {
	topLeft.style.background = 'green';
	topRight.style.background = 'red';
	bottomRight.style.background = 'blue';
	bottomLeft.style.background = 'yellow';
}

//this triggers all lights to flash simultaneously
function flashAll() {
	topLeft.style.background = 'lightgreen';
	topRight.style.background = 'pink';
	bottomRight.style.background = 'lightblue';
	bottomLeft.style.background = 'lightyellow';
}

//the next four sequences affect the playerSequence
//with each click, the light is checked the the engineArray with a corresponding light. the are numbered 1 to 4 clockwise from top left
topLeft.addEventListener('click', (event) => {
	if (on) {
		playerSequence.push(1);
		checkCorrect();
		one();
		if (!win) {
			setTimeout(() => {
				clearAll();
			}, 300);
		}
	}
});
topRight.addEventListener('click', (event) => {
	if (on) {
		playerSequence.push(2);
		checkCorrect();
		two();
		if (!win) {
			setTimeout(() => {
				clearAll();
			}, 300);
		}
	}
});
bottomRight.addEventListener('click', (event) => {
	if (on) {
		playerSequence.push(3);
		checkCorrect();
		three();
		if (!win) {
			setTimeout(() => {
				clearAll();
			}, 300);
		}
	}
});
bottomLeft.addEventListener('click', (event) => {
	if (on) {
		playerSequence.push(4);
		checkCorrect();
		four();
		if (!win) {
			setTimeout(() => {
				clearAll();
			}, 300);
		}
	}
});

//this function checks for correct and follows up with a function depending on the condition
function checkCorrect() {
	//if the player choice is not correct, it is incorrect
	if (
		playerSequence[playerSequence.length - 1] !==
		engineSequence[playerSequence.length - 1]
	) {
		correct = false;
	}
	//if the player is incorrect, all lights flash, and the display shows game over and your score
	if (!correct) {
		flashAll();
		setTimeout(() => {
			turnCounter.innerHTML = `GAME OVER. Your Score: ${turn}`;
			clearAll();
		}, 800);
		//play tone
		//however, if you are correct, you are passed to the next turn
	} else if (turn == playerSequence.length && correct && !win) {
		turn++;
		playerSequence = [];
		engineTurn = true;
		flash = 0;
		turnCounter.innerHTML = turn;
		intervalId = setInterval(gameTurn, 800);
		//if you win all turns, winGame function is called
	} else if (playerSequence.length == 20 && correct) {
		winGame();
	}
}

//if you pass all turns of the game, the clicks are no longer pushed to an array (off position) and the display reads "win"
function winGame() {
	flashAll();
	on = false;
	win = true;
	turnCounter.innerHTML = 'WIN';
	//play tone
}

//a reset button replaces the start button, the reset button brings the game back to default conditions
function resetGame() {
	startButton.classList.toggle('hidden');
	resetButton.classList.toggle('hidden');

	on = false;
	turnCounter.innerHTML = '';
	clearAll();
	clearInterval(intervalId);
	flash = 0;
}

/*
too add
-modal with directions
-sound files
-pastel color scheme
-more space and rounded edges for the 4 elements
-more exciting game display
-put a footer with your info
*/
