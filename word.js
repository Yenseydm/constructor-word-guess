var Letter = require("./letter");

function Word(answer){
    this.objArr = [];

    for (var i = 0; i < answer.length; i++){
        var letter = new Letter (answer[i]);
        this.objArr.push(letter);
    }

    this.log = function(){
        answerLog = "";
        for (var i = 0; i < this.objArr.length; i++){
            answerLog += this.objArr[i] + " ";
        }
        console.log(answerLog + "\n");
    }
    this.userGuess = function (input){
        for (var i = 0; i < this.objArr.length; i++){
        this.objArr[i].guess(input);
        }
    }
}
module.exports = Word;