

var correct;
let letters = document.querySelectorAll('.letter');
let guessed = [];
var indexes = [];
var lives = 6;
let lines = null;

//counter to track number of wrongs to draw hangman
var counter = 0;

async function sendApiRequest(){
    let response = await fetch(`https://opentdb.com/api.php?amount=30`);
    let data = await response.json();
    useApiData(data);
}

function useApiData(data){
    //Define response variables
    var category = data.results[0].category;
    var difficulty = data.results[0].difficulty[0].toUpperCase() + data.results[0].difficulty.slice(1);
    var question = data.results[0].question;
    var correctAnswer = data.results[0].correct_answer.toUpperCase();
    var split_answer = correctAnswer.split('');

    // Show answer in console
    console.log(split_answer);
    
    // Display category, difficulty and question
    document.querySelector('#category').innerHTML = `Category: ${category}`;
    document.querySelector('#difficulty').innerHTML = `Difficulty: ${difficulty}`;
    document.querySelector('#Question').innerHTML = `${question}`;

    //Draw lines + check for input
    createLines(correctAnswer);
    checkAnswer(correctAnswer);
}

function createLines(correct_answer){
    //LOGIC: At index of guessed alphabet in empty array, replace alphabet with __
    var lines = correct_answer.split('').map(alphabet => (guessed.indexOf(alphabet) >= 0 ? alphabet :" _ ")).join('');
    
    console.log(typeof(lines));
    lines.split('').forEach(function(line){
        console.log(line);
        console.log(correct_answer.split(''));
        correct_answer.split('').forEach(function(letter){
            if (letter === ' '){
                console.log("AHA!");
                lines.replace(line,'   ');
            }
            else{
                console.log("meh");
            }
        })
    }); 
    console.log(lines);
    document.querySelector('#answer_display').innerHTML = lines;   
}

function handleGuess(inputLetter, correct_answer){

    //LOGIC: If letter is not in supposed index in guessed, add it. Else, do nothing.
    guessed.indexOf(inputLetter) === -1 ? guessed.push(inputLetter) : null;
    
    document.getElementById(inputLetter).innerHTML = inputLetter;
    //get index of matched alphabet
    getIndex(correct_answer,inputLetter);
    
    //replace _ with alphabet at indexes
    createLines(correct_answer);
    console.log(guessed);
    var displayAnswer = document.querySelector('#answer_display').textContent;
  
    //check for win
    if (displayAnswer === correct_answer){
        document.querySelector(".update").textContent = "You've won!";
    }
}

function getIndex(correct_answer, inputLetter){
    indexes = [];
    for (var i=0; i<correct_answer.length; i++){{
        if (correct_answer[i]===inputLetter){
            indexes.push(i);    
        }
    }}
}

function checkAnswer(correct_answer){
    letters.forEach(function(letter){
        letter.addEventListener('click', (e) => {
                chosen_letter = e.currentTarget.dataset.id;

                //Gray chosen alphabet
                document.getElementById(chosen_letter).style.background = "gray";

                if (correct_answer.includes(chosen_letter)==true) {
                    correct = true;
                }

                if (correct_answer.includes(chosen_letter)==false){
                    correct = false;
                    counter++;
                }
      
                if (correct == true){
                    document.querySelector(".update").innerHTML = "<h2>Correct!</h2>";
                    handleGuess(chosen_letter,correct_answer);
                }
                
                if (correct == false){
                    hangnimation();
                    document.querySelector(".update").innerHTML = "<h2>Wrong!</h2>";
                    display_wrong_input();
                }
        });
    }); 
};


function display_wrong_input(){
    if (lives !== 0){
        lives--; 
    }

    document.querySelector("#lives").textContent = lives;

    if (document.querySelector("#lives").textContent==0){
        document.querySelector(".update").innerHTML = "<h1>You died!</h1>";
    }
}

//initial hangman drawing
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(25, 25);
ctx.lineTo(25,200);
ctx.stroke();
ctx.moveTo(25, 25);
ctx.lineTo(175, 25);
ctx.stroke();

function hang3() {
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 150);
    ctx.stroke();
};

function hang2() {
    ctx.beginPath();
    ctx.arc(100, 75, 25, 0, 2 * Math.PI);
    ctx.stroke();
};

function hang4() {
    ctx.moveTo(75, 110);
    ctx.lineTo(125, 110);
    ctx.stroke();
};

function hang5() {
    ctx.moveTo(100, 150);
    ctx.lineTo(75, 175);
    ctx.stroke();
};

function hang6() {
    ctx.moveTo(100, 150);
    ctx.lineTo(125, 175);
    ctx.stroke();
};

function hang1() {
    ctx.moveTo(100, 25);
    ctx.lineTo(100, 50);
    ctx.stroke();
};

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

//draws different strokes of the hangman depending on counter
function hangnimation() {
    if (counter == 1) {
        hang1();
    }
    if (counter == 2) {
        hang2();
    }
    if (counter == 3) {
        hang3();
    }
    if (counter == 4) {
        hang4();
    }
    if (counter == 5) {
        hang5();
    }
    if (counter == 6) {
        hang6();
    }
    if (counter == 0) {
        clearCanvas();
    }
};

document.querySelector('.reset-btn').addEventListener('click',newWord);

function newWord(){
    sendApiRequest();
    lives = 6;
    counter = 0;
    guessed = [];
    indexes = [];

    //Undo greying of keys
    var keys = document.querySelectorAll('.letter');
    keys.forEach(function(key){
        key.style.background = "#3672CC";
    });
    //remove status
    document.querySelector(".update").innerHTML = "";

    //restore 6 lives
    document.querySelector("#lives").textContent = 6;

    
}   

newWord();
