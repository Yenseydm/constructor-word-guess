var Word = require("./word");
var inquirer = require("inquirer");

var letterArr = "abcdefghijklmnopqrstuvwxyz";

var sweets = ["snickers", "kitkat", "reeses", "nerds", "hershey's", "skittles",
            "starburst", "tootsie", "starburst", "jollyranchers"];

var randomIndex = Math.floor(Math.random() * sweets.length);
var randomWord = sweets[randomIndex];

computer = new Word(randomWord);

var requireNewWord = false;
var wrongLetters = [];
var rightLetters = [];

var remainingGuess = 10;

function setUp(){

    if(requireNewWord){
        computer = new Word(randomWord);

        requireNewWord = false;
    }

    var completeWord = [];
    computer.objArr.forEach(completeCheck);

    if (completeWord.includes(false)){
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter!",
                    name: "userinput"
                }
            ])
            .then(function(input){

                if(!letterArr.includes(input.userinput) || input.userinput.length >1){
                    console.log("Try Againg");
                    setUp;
                }else{

                    if(wrongLetters.includes(input.userinput) ||rightLetters.includes(input.userinput) || input.userinput === "" ){
                        console.log("You already guessed that...");
                        setUp();
                    } else {
                        var wordCheckArray = [];

                        computer.userGuess(input.userinput);

                        computer.objArr.forEach(wordCheck);
                        if(wordCheckArray.join('') === wordComplete.join('')){

                            console.log("WRONG");
                            wrongLetters.push(input.userinput);
                            remainingGuess--;

                        }else{

                            console.log("CORRECT");

                            rightLetters.push(input.userinput);

                        }

                        computer.log();

                        console.log("Guesses remaining: " + remainingGuess);
                        console.log("Letters Guessed: " + wrongLetters.join(""));

                        if (remainingGuess > 0){
                            setUp();
                        }else {
                            console.log("GAME OVER");

                            restart();
                        }

                        function wordCheck(key){
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("WINNER WINNER CHICKEN DINNER");

        restart();

    }

    function completeCheck(key){
        completeWord.push(key.guessed);
    }
}

function restart(){
    console.log("LET's PLAY AGAIN!")
    requireNewWord = true;
    wrongLetters = [];
    rightLetters = [];
    remainingGuess = 10;
    setUp();
}

setUp();