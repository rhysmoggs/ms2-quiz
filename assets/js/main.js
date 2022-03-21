// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them
// document.addEventListener("DOMContentLoaded", function() {
//     let buttons = document.getElementsByTagName("button");

//     for (let button of buttons){
//         button.addEventListener("click", function() {
//             if (this.getAttribute("data-type") === "start") {
//                 alert("You clicked Start!");
//             } else {
//                 let buttonType = this.getAttribute("data-type");
//                 alert(`You clicked ${buttonType}`);
//             }
//         });
//     }
// });

// list of variables
const logoReload = document.getElementById('logo');

const gameArea = document.getElementById('game-area');
const containerDiv = document.getElementById('container');

const startButton = document.getElementById('start-btn');

const howToButton = document.getElementById('how-to-btn');
const howToDiv = document.getElementById('how-container');

const contactButton = document.getElementById('contact-btn');
const contactDiv = document.getElementById('contact-container');

const highscoresButton = document.getElementById('highscore-btn');
const highscoresDiv = document.getElementById('high-container');
const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

const progressCounter = document.getElementById('progressCounter');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const plane = document.getElementById('plane');


/*undefined let variables*/
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//with help from mentor
let correctAnswers = 0;

let questions = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        // startGame();
    })
    .catch((err) => {
        console.error(err);
    });


const SCORE_POINTS = 2500;
const MAX_QUESTIONS = 10;

/*event listener set to the logo button that reloads the home page*/
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.assign('index.html');
}

/*start the game*/
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    containerDiv.classList.remove('hide');
    startButton.classList.add('hide');
    // gameArea.style.top = "65%";
    if (howToButton.style.display !== "block") {
        howToButton.style.display = "none";
        howToDiv.style.display = "none";
    } else {
        howToButton.style.display = "none";
    }
    contactButton.classList.add('hide');
    if (highscoresButton.style.display !== "block") {
        highscoresButton.style.display = "none";
        highscoresDiv.style.display = "none";
    } else {
        highscoresButton.style.display = "none";
    }
};

/*event listener set to the start button that runs the game*/
startButton.addEventListener("click", startGame);

/*generates next question, if max questions reached, redirects to end.html*/
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressCounter.innerText = `Question: ${questionCounter} / ${MAX_QUESTIONS}`;
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

/*check if the answer is correct/incorrect*/
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            correctAnswers = (correctAnswers + 1);
            
            console.log(correctAnswers);
            incrementScore(SCORE_POINTS);
            progressBarFull.style.width = `${correctAnswers * 10}%`;
            plane.style.left = "100%";
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 2000);
    });
});

/*increment score for each correct answer*/
incrementScore = num => {
    score +=num;
    scoreText.innerHTML = `<span id="span-score"> ${score} miles travelled</span>`;
};

/*list to add score to highscore list*/
highScoresList.innerHTML =
highScores.map(score => {
    return `<p class="high-score">${score.name} - ${score.score} miles travelled</p>`;
}).join("");


/*show or hide High Scores section*/
highscoresButton.onclick = function () {
    if (highscoresDiv.style.display !== "block") {
        highscoresDiv.style.display = "block";
        startButton.classList.add('hide');
        howToButton.classList.add('hide');
        contactButton.classList.add('hide');
        gameArea.style.top = "55%";
    } else {
        highscoresDiv.style.display = "none";
        startButton.classList.remove('hide');
        howToButton.classList.remove('hide');
        contactButton.classList.remove('hide');
        gameArea.style.top = "60%";
    }
};

/*show or hide How To Play section*/
howToButton.onclick = function () {
    if (howToDiv.style.display !== "block") {
        howToDiv.style.display = "block";
        startButton.classList.add('hide');
        contactButton.classList.add('hide');
        highscoresButton.classList.add('hide');
        gameArea.style.top = "55%";
    } else {
        howToDiv.style.display = "none";
        startButton.classList.remove('hide');
        contactButton.classList.remove('hide');
        highscoresButton.classList.remove('hide');
        gameArea.style.top = "60%";
    }
};

/*show or hide Contact section*/
contactButton.onclick = function () {
    if (contactDiv.style.display !== "block") {
        contactDiv.style.display = "block";
        startButton.classList.add('hide');
        howToButton.classList.add('hide');
        highscoresButton.classList.add('hide');
        gameArea.style.top = "55%";
    } else {
        contactDiv.style.display = "none";
        startButton.classList.remove('hide');
        howToButton.classList.remove('hide');
        highscoresButton.classList.remove('hide');
        gameArea.style.top = "60%";
    }
};