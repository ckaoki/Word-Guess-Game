var cartoonsToGuess = [
    {cartoon:"SMURFS", hint:"little blue creatures", image:"smurfs.jpg"},
    {cartoon:"DUCKTALES", hint:"characters were ducks", image:"ducktales.jpg"},
    {cartoon:"GI JOE", hint:"elite strike force battling COBRA", image:"GIJoe.jpg"},
    {cartoon:"HEMAN", hint:"Had villian named Skeletor", image:"heman.jpg"},
    {cartoon:"GHOSTBUSTERS", hint:"paranormal investigators", image:"ghostbusters.jpg"},
    {cartoon:"ROBOTECH", hint:"anime in which humans battle aliens", image:"robotech.jpg"},
    {cartoon:"THE SIMPSONS", hint:"DOH!", image:"simpsons.jpg"},
    {cartoon:"TEENAGEMUTANT NINJA TURTLES", hint:"reptile warriors", image:"turtles.jpeg"},
    {cartoon:"THUNDERCATS", hint:"feline warriors", image:"thundercats.jpg"},
    {cartoon:"TRANSFORMERS", hint:"lifeforms from Cybertron", image:"transformers.jpg"},
    {cartoon:"VOLTRON", hint:"adapted from anime, protagonist was composed of 5 catlike robots", image:"voltron.jpg"}
];

var currentCartoon = {cartoon:"", hint:""};
var currentWord = "";
var guessedWord = "";
var lettersGuessed = "";
var numWrongGuesses = 0;
var numWins = 0;
var numLosses = 0;
var numGuessesRemaining = 10;
var gameRunning = false;
var gameNumber = 0;
var keyCode = -1;
var keyPressed = '';

// function to replace character at index specified
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

// get new cartoon from array
function getNewCartoon(index){
    return(cartoonsToGuess[index]);
}

// main game logic
function playGame(){
    if (gameRunning){
        checkKeyPressed();
        checkGameStatus();
    }
    else{ // not running start new game
        document.getElementById("startMessage").style.display="none";
        startGame();
        gameRunning=true;
        // generate number of next word to guess
        if(gameNumber<(cartoonsToGuess.length-1)){
            gameNumber++;
        }
        else{
            gameNumber = 0;
        }
    }
}

// start game
function startGame() {    
    currentCartoon = getNewCartoon(gameNumber);
    numGuessesRemaining = 10;
    lettersGuessed = "";
    currentWord = currentCartoon.cartoon;
    guessedWord = "_".repeat(currentCartoon.cartoon.length);

    // replace "_" with " " in guessed word whever spaces should exist
    for(var i=0; i<=currentWord.length; i++){
        if(currentWord[i] === " "){
            guessedWord = guessedWord.replaceAt(i, " ");
        }                  
    }

    // update page
    document.getElementById("displayedWord").textContent = guessedWord;
    document.getElementById("guessesRemaining").textContent=numGuessesRemaining;
    document.getElementById("lettersGuessed").textContent = "_";
    document.getElementById("cartoonImage").setAttribute("src", "assets/images/"+currentCartoon.image);
}

// check if word has been guessed 
function checkGameStatus(){
    if(numGuessesRemaining > 0){
        if(guessedWord === currentWord){
            gameRunning = false;
            document.getElementById("wins").textContent = ++numWins;
            document.getElementById("startMessage").style.display="";
        }
    }
    else{ // game over
        console.log("remain " +numGuessesRemaining);
        document.getElementById("startMessage").style.display="";
        gameRunning = false;
    }
}

// check if key pressed is valid and in current word. 
// heavy lifting done here.
function checkKeyPressed(){
    // check if key alpha
    if(keyCode >= 65 && keyCode <= 90){
        // check if letter already guessed. Add to list if not.
        if(lettersGuessed.indexOf(keyPressed)==-1){
            // new letter, add to guessed letters and display.
            lettersGuessed += keyPressed;
            document.getElementById("lettersGuessed").textContent = lettersGuessed;
            // letter is in current word and not in guessed letters
            if((currentWord.indexOf(keyPressed)>=0) && (guessedWord.indexOf(keyPressed)==-1))
            {
                // add all instances of letter to guessed word;
                for(var i=0; i<=currentWord.length; i++){
                    if(currentWord[i] === keyPressed){
                        guessedWord = guessedWord.replaceAt(i, keyPressed);
                    }                  
                }
                // update displayed word.
                document.getElementById("displayedWord").textContent = guessedWord;
            }
            // letter is not in current word or letters guessed, decrement guesses remaining.
            // update page.
            else if((currentWord.indexOf(keyPressed)==-1) && (guessedWord.indexOf(keyPressed)==-1)){
                numGuessesRemaining--;
                document.getElementById("guessesRemaining").textContent=numGuessesRemaining;
            }
            // letter already guessed, do nothing.        
        }
    }  
}

// user keystroke monitoring
document.onkeyup = function(event) {
    keyCode = event.keyCode;
    keyPressed = event.key.toUpperCase();
    playGame();
}
