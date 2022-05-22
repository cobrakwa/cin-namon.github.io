// Insert dictionary here, then delete ls
const ls = ["P",'Y','T','H','O','N']; 

var correct;
let letters = document.querySelectorAll('.letter');

function check_answer(){
    letters.forEach(function(letter){
        letter.addEventListener('click', (e) => {
                chosen_letter = e.currentTarget.dataset.id;

                if (ls.includes(chosen_letter)) {
                    correct = true;
                }

                if (ls.includes(chosen_letter)==false){
                    correct = false;
                }
      
                if (correct == true){
                    window.alert("Correct");
                    display_correct_input();
                }
                
                if (correct == false){
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