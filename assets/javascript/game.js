console.log("hello world");
var cartoonsToGuess = [
    {cartoon:"DUCKTALES", hint:"characters were ducks"},
    {cartoon:"GI JOE", hint:"elite strike force battling COBRA"},
    {cartoon:"HEMAN", hint:"Had villian named Skeletor" },
    {cartoon:"GHOSTBUSTERS", hint:"paranormal investigators" },
    {cartoon:"ROBOTECH", hint:"anime in which humans battle aliens" },
    {cartoon:"THE SIMPSONS", hint:"DOH!" },
    {cartoon:"TEENAGEMUTANT NINJA TURTLES", hint:"reptile warriors" },
    {cartoon:"THUNDERCATS", hint:"feline warriors" },
    {cartoon:"TRANSFORMERS", hint:"lifeforms from Cybertron" },
    {cartoon:"VOLTRON", hint:"adapted from anime, protagonist was composed of 5 catlike robots" }
];

var currentCartoon = {cartoon:"", hint:""};
var currentWord = "";
var guessedWord = "";
var lettersGuessed = "";
var numWrongGuesses = 0;
var numWins = 0;
var numLosses = 0;
var numGuessesRemaining = 0;
var gameRunning = false;
var gameNumber = 0;
var keyCode = -1;


function startGame() {
    
    
    var currentCartoon = getNewCartoon(gameNumber);
    var aaa = document.getElementById("temp"); //TODO:delete
    aaa.textContent = currentCartoon.cartoon; //TODO:delete
    lettersGuessed = "";
    currentWord = currentCartoon.cartoon;

    guessedWord = "_".repeat(currentCartoon.cartoon.length);
    // replace "_" with " " in guessed word whever spaces should exist
    for(var i=0; i<=currentWord.length; i++){
        if(currentWord[i] === " "){
            guessedWord = guessedWord.replaceAt(i, " ");
        }                  
    }
    document.getElementById("displayedWord").textContent = guessedWord;
    document.getElementById("lettersGuessed").textContent = "";
}


function getNewCartoon(index){
    return(cartoonsToGuess[index]);
}

// hide start message
function isGameRunning(){
    if (!gameRunning){
        document.getElementById("startMessage").style.display="none";
        startGame();
        gameRunning=true;
        if(gameNumber<(cartoonsToGuess.length-1)){
            gameNumber++;
        }
        else{
            gameNumber = 0;
        }
    }
    else
    {
        checkKeyPressed();
        checkGameStatus();
    }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function checkKeyPressed(){
    // check if key alpha
    if(keyCode >= 65 && keyCode <= 90){
        // check if letter already guessed. Add to list if not.
        if(lettersGuessed.indexOf(keyPressed)==-1){
            // new letter, add to guessed letters and display.
            lettersGuessed += keyPressed;
            document.getElementById("lettersGuessed").textContent = lettersGuessed;
            // check that letter is in current word and not in displayed word
            if((currentWord.indexOf(keyPressed)>=0) && (guessedWord.indexOf(keyPressed)==-1))
            {
                // add all instances of letter to displayedWord;
                for(var i=0; i<=currentWord.length; i++){
                    if(currentWord[i] === keyPressed){
                        guessedWord = guessedWord.replaceAt(i, keyPressed);
                    }                  
                }
                // if letter in word update displayed word.
                document.getElementById("displayedWord").textContent = guessedWord;
            }

                
            // TODO: if word is complete increment wins and prompt user to press any key to continue
            // TODO: if letter is not in word decrement guesses remaining.
            // TODO: if 

            // TODO: if in current word update display
            // TODO:
        // letter already guess, do nothing.        
        }
    }  
}

function checkGameStatus(){
    if(guessedWord === currentWord){
        numWins++;
        document.getElementById("wins").textContent = numWins;
        gameRunning = false;
        document.getElementById("startMessage").style.display="";
    }
}

//TODO: Const Array of words to guess
//TODO: possibly array of object {quessWord, Hint}
//TODO: pick random word
//TODO: display word
//TODO: require user to press any key
//TODO: search for user key in word
//TODO: determine results  
//TODO: determine win/loss
//TODO: update display
//TODO:
//TODO:
//TODO:
//TODO:
var keyPressed = '';
document.onkeyup = function(event) {
    keyCode = event.keyCode;
    keyPressed = event.key.toUpperCase();
    isGameRunning();
}
