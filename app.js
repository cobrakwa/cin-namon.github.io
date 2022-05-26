// Insert dictionary here, then delete ls
const ls = ["P",'Y','T','H','O','N']; 

var correct;
let letters = document.querySelectorAll('.letter');

//counter to track number of wrongs to draw hangman
var counter = 0;

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
};

function check_answer(){
    letters.forEach(function(letter){
        letter.addEventListener('click', (e) => {
                chosen_letter = e.currentTarget.dataset.id;

                if (ls.includes(chosen_letter)) {
                    correct = true;
                }

                if (ls.includes(chosen_letter)==false){
                    correct = false;
                    counter = counter +1;
                }
      
                if (correct == true){
                    window.alert("Correct");
                    display_correct_input();
                }
                
                if (correct == false){
                    hangnimation();
                    window.alert("Wrong");
                    display_wrong_input();
                }
        });
    });  
};

// Show correct alphabets on lines, grey out incorrect ones
function display_correct_input(){
    // TODO: Add letter to display (to do once display __ __ __ objects are created)
}



function display_wrong_input(){
    wrong_alphabet = document.getElementById(chosen_letter);
    wrong_alphabet.style.background = "gray";
}

// RUN check_answer ONCE PAGE LOADS
window.addEventListener('DOMContentLoaded',check_answer);