# simon-game

Description:
This project is focused on developing a memory game in which a player competes with an automated engine.

![simon-win-game-sequence](images/simon- win-game-screenshot.png)

Technologies Used:
HTML
CSS
Javascript

Installation Instructions:
There are no special installation instructions. The app runs in the web browser (Google Chrome is recommended)

User Stories:
The player presses the start game button. A start game tone is played. The computer clicks one of four colored lights. The player mimics the action by clicking the same light. The turn counter above increases by 1. The computer clicks the light again but this time adds one more to the sequence. If the player mimics the sequence correctly, the turn counter is increased by one until reaching the last level. After beating the last level, a win game tone is played, the display reads “You Win”, and the lights flash randomly until the player presses the reset button.

![simon-webpage-sketch](images/simon-sketch.JPG)

Unsolved Problems and Major Hurdles Overcame:
The most difficult thing for me to solve was making the connection between creating the engine sequence (a for-loop that pushes values to an array) and successfully triggering the engine performance (a function). I realized that - after the creating the engine sequence (an array) - a function needed to determine whose turn it is (player or engine) with a conditional statement.

Another challenge was finding the right timing to ensure that each audio trigger fully sounds before moving on to the next action. This required lots of experimentation with the intervalId.

I also found myself adding conditions to better control the flow of gameplay. For example, to divide the gameplay between engine turn and player turn, I made a variable called ‘On’ and another called ‘engineTurn’. Both are assigned a boolean value. When On is false, engineTurn is true. This makes it so the player cannot interact with the game board during the engine’s turn. When On is true, engineTurn is false, and the player can click the lights and receive a response according to the result of a function called checkCorrect(). While this did work for the gameplay, it resulted in a limitation: I could not freely play with the lights since On is true only after the engineTurn is over. In my original idea, I thought of having a free mode where the player can freely play with the tones without affecting the game itself.

Other comments:
All sounds of the game were composed by me using Logic Pro. The process of writing the sounds was one of my favorite aspects of creating this game. I deliberately chose the chords for the lights to have some relationship with the start game sound so the user can feel like all the sounds are connected. This inadvertently developed a musical relationship among each of the four lights. The game over sound also has some relationship with the other sounds. The win game music was written to be a little longer than the other sounds to give the player a sense of finality and accomplishment. My particular approaches to writing the music itself are grounded in music theory principles that can be elaborated upon in a separate document upon request.
