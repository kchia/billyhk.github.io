//two arrays will be compared to determine if the player is correct
let engineSequence = [];
let playerSequence = [];

//a "flash" is a move by the engine
//a turn is the current round of the game, that is how many flashes the engine will play
let flash;
let turn;

//engineTurn is used to determine when the engineTurn is over
//if the engine has played the same number of flashes as the number of the current turn, then the engineTurn is over
let engineTurn;

//correct is used to determine what will happen after the player guesses
//if the player is not correct: game over
let correct;

//intervalId is set to 0 because it will be updated by certain functions
let intervalId = 0;

//on is set to false when the player does not need to interact with the game board(i.e. when it's the engine's turn, during win game and game over)
let on = false;

//win is set default to false because it will later be used to trigger for the winGame function
let win = false;

//turn counter is used as the game display. it shows the current turn, game over, and game win
const turnCounter = document.querySelector('.turn-counter');

//each light will need its own event handler
const topLeft = document.querySelector('#topLeft');
const topRight = document.querySelector('#topRight');
const bottomRight = document.querySelector('#bottomRight');
const bottomLeft = document.querySelector('#bottomLeft');

//reset button starts hidden
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

  //update the turn counter in the html to display the current level
  turnCounter.innerHTML = 1;

  //the game always starts with empty arrays that will be filled with the result of the for-loop and the player's guesses
  engineSequence = [];
  playerSequence = [];

  //create an array of randomly assorted numbers from 1 to 4
  // Hou comment: why is the limit hardcoded to 20?
  for (let i = 0; i < 20; i++) {
    engineSequence.push(Math.floor(Math.random() * 4) + 1);
  }

  //set the intervalId
  //call gameTurn, which allows the engine to start
  intervalId = setInterval(gameTurn, 1200);
}

function gameTurn() {
  //the engine hasn't played yet, so the flash will be less than turn; thus it will go on to if(engineTurn == true)...

  //if this condition is true then it's the player's turn. since on = true, the lights' event listeners will now be active
  // Hou comment: Make sure to use === rather than == throughout your code. Read: https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
  if (flash == turn) {
    engineTurn = false;
    on = true;
    clearAllLights();
    clearInterval(intervalId);
  } else if (engineTurn) {
    //if the engine plays a flash, that flash will have the effect of a click
    //a flash is added with each engine click to make progress toward reaching the number of the current turn
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
// Hou comment: since we are not using the event object inside
// the callback, we don't have to pass it into the callback
topLeft.addEventListener('click', () => {
  if (on) {
    //make it look/sound like clicked
    clickTopLeft();

    //push the clicked light into an array
    playerSequence.push(1);

    //check to see if that one was correct
    checkCorrect();

    //simulate mouseup by clearing all the lights
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

/**
Hou comment: Refactoring Suggestion for lines 102-140
topLeft.addEventListener('click', () => handleGameButtonClick(on, clickTopLeft, 1));
topRight.addEventListener('click', () => handleGameButtonClick(on, clickTopRight, 2));
bottomRight.addEventListener('click', () => handleGameButtonClick(on, clickBottomRight, 3));
bottomLeft.addEventListener('click', () => handleGameButtonClick(on, clickBottomLeft, 4));

function handleGameButtonClick(isOn, callback, sequenceNumber) {
	if (isOn) {
    callback();
    playerSequence.push(sequenceNumber);
    checkCorrect();
    setTimeout(clearAllLights, 180);
  }
}
*/

//the next four functions create the effect that the lights are being clicked either by the player or the engine

//flashes with sound-- for gameplay
function clickTopLeft() {
  topLeft.style.background = 'lightgreen';
  topLeft.style.border = '8px solid rgb(201, 174, 174)';

  playTopLeft();
}
function clickTopRight() {
  topRight.style.background = 'pink';
  topRight.style.border = '8px solid rgb(201, 174, 174)';

  playTopRight();
}
function clickBottomRight() {
  bottomRight.style.background = 'lightblue';
  bottomRight.style.border = '8px solid rgb(201, 174, 174)';

  playBottomRight();
}
function clickBottomLeft() {
  bottomLeft.style.background = 'lightyellow';
  bottomLeft.style.border = '8px solid rgb(201, 174, 174)';

  playBottomLeft();
}

/** 
Hou comment: Refactoring suggestion for lines 162-185

function animateGameButton(button, backgroundColor, borderStyle, soundCallback) {
	button.style.background = backgroundColor;
	button.style.border = borderStyle;
	soundCallback();
}
*/

//muted flashes-- for winGame()
// Hou comment: How would you refactor lines 199-214 based on examples above?
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
  //if the last clicked light by the player does not equal that index in the engineSequence, then the choice is considered incorrect, move to next if statement
  if (
    playerSequence[playerSequence.length - 1] !==
    engineSequence[playerSequence.length - 1]
  ) {
    correct = false;
  }
  //if the player is incorrect, all lights flash, and the display shows game over and your score
  if (!correct) {
    //to express game over, all lights flash, the player cannot interact with the board anymore (because !on), and the display shows a game over message
    flashAllLights();
    on = false;
    setTimeout(() => {
      turnCounter.innerHTML = `GAME OVER. Your Score: ${turn}`;
      clearAllLights();
    }, 800);
    setTimeout(playGameOverSound, 1200);

    //however, if you are correct, you are passed to the next level (turn)
    //this conditional statement makes the distinction between winning a round and winning the whole game
  } else if (turn == playerSequence.length && correct && turn < 12) {
    //if the player is correct, the turn counter increases by 1 to move on to the next round
    turn++;
    turnCounter.innerHTML = turn;

    //flash must be 0 so the engine knows how many lights to click in this turn
    flash = 0;

    //player's array must also be clear. it is refilled with each turn
    playerSequence = [];

    //it is now the engine's turn
    engineTurn = true;

    //call the gameTurn function just like in startGame()
    intervalId = setInterval(gameTurn, 800);

    //if you win all turns, winGame function is called
  } else if (playerSequence.length == 12 && correct) {
    win = true;
    winGame();
  }
}

//if you pass all turns of the game, the clicks are no longer pushed to an array (off position) and the display reads "win"
function winGame() {
  setTimeout(playWinGameSound, 800);

  //the player can no longer interact with the game board and lights endlessly flash in a random order
  on = false;

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

/**
Hou comment: You might want to store all of your style data inside an 
object for easy reference so you don't have to hardcode the
color values in others places. We can do something like:

const gameButtonStyles = {
	topLeft: {
		default: 'green',
		flash: 'lightgreen',
		defaultBorder: 'none',
		clickedBorder: '8px solid rgb(201, 174, 174)',
	},
	topRight: {
		default: 'red',
		flash: 'pink',
		defaultBorder: 'none',
		clickedBorder: '8px solid rgb(201, 174, 174)',
	},
	bottomLeft: {
		default: 'yellow',
		flash: 'lightyellow',
		defaultBorder: 'none',
		clickedBorder: '8px solid rgb(201, 174, 174)',
	},
	bottomRight: {
		default: 'blue',
		flash: 'lightblue',
		defaultBorder: 'none',
		clickedBorder: '8px solid rgb(201, 174, 174)',
	}
}

const gameButtons = [topLeft, topRight, bottomRight, bottomLeft];

function flashAllLights() {
	gameButtons.forEach((gameButton) => {
		gameButton.style.background = gameButtonStyles[gameButton].flash;
	});
}

function clearAllLights() {
	gameButtons.forEach((gameButton) => {
		gameButton.style.background = gameButtonStyles[gameButton].default;
		gameButton.style.border = gameButtonStyles[gameButton].defaultBorder;
	});
}
*/
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
