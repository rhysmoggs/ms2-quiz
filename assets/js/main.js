// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                alert("You clicked Start!");
            } else {
                let buttonType = this.getAttribute("data-type");
                alert(`You clicked ${buttonType}`);
            }
        });
    }
});

// list of variables
const gameDiv = document.getElementById('game');
const containerDiv = document.getElementById('container');
const startButton = document.getElementById('start-btn');
const howToButton = document.getElementById('how-to-btn');
const howToDiv = document.getElementById('how-container');
const contactButton = document.getElementById('contact-btn');
const contactDiv = document.getElementById('contact-container');


/*undefined let variables*/
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/*start the game*/
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    containerDiv.classList.remove('hide');
    startButton.classList.add('hide');
}