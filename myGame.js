//Array of 4 colors
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

//Array with the name userClickedPattern
var userClickedPattern = [];

//Keep track of whether if the game has started or not
// so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

// Detect when a keyboard key has been pressed,
// when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    // Once game has started change opening title to "Level 1"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //Create variable to store the id of the button that got clicked.
  var userChosenColor = $(this).attr("id");

  //Add the variable contents to the end of userClickedPattern
  userClickedPattern.push(userChosenColor);

  //On a button click, the corresponding sound should be played.
  playSound(userChosenColor);

  // On a button click, the cooresponding fade in and out is activated
  animatePress(userChosenColor);

  // After a user has clicked and chosen their answer,
  // passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});

// Function to take one input with the name currentLevel
function checkAnswer(currentLevel) {

    // If statement inside checkAnswer() to check if the most recent
    // user answer is the same as the game pattern. If so then log
    // "success", otherwise log "wrong"
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      // If the user got the most recent answer right then check that
      // they have finished their sequence with another if statement
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      // Play wrong.mp3 if the user got one of the answers wrong
      playSound("wrong");

      // Apply the .css "game-over" when the user gets one of the answers
      // wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // Change the h1 title to say "Game Over, Press Any Key to Restart"
      // if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      // Call startOver() if the user gets the sequence wrong.
      startOver();

    }

}

// Created function
function nextSequence() {

  // Once triggered reset to an empty array ready for the next level
  userClickedPattern = [];

  // Increase the level by 1 every time nextSequence() is called
  level++;

  // Update the h1 with this change in the value of level
  $("#level-title").text("Level " + level);

  // Random Number between 0 & 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Select color based on random number
  var randomChosenColor = buttonColors[randomNumber];

  // Align variable gamePattern with the random color
  gamePattern.push(randomChosenColor);

  // Use jQuery to select the button with the same id as the randomChosenColor
  // Use Google/Stackoverflow to animate a flash to the button selected
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play the sound for the button color selected
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();

  // Refactor the code in playSound() so that it will work for both
  // playing sound in nextSequence() and when the user clicks a button
  playSound(randomChosenColor);

}

// Fucntion to take a single input parameter called name.
function playSound(name) {

  // Take the code we used to play sound in the nextSequence() function
  // and add it to playSound()
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// Function to take a single input parameter called currentColor
function animatePress(currentColor) {

  //Add "pressed" class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //Remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

// Create a new function called startOver().
function startOver() {

  // Reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
