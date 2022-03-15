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
const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const endDiv = document.getElementById('end-container');

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


/*undefined let variables*/
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/*list of questions*/
let questions = [
    {
        question: 'What is the largest country in South America?',
        choice1: 'Paraguay',
        choice2: 'Colombia',
        choice3: 'Suriname',
        choice4: 'Brazil',
        answer: 4,
    },
    // {
    //     question: "How many countries border Austria?",
    //     choice1: "2",
    //     choice2: "8",
    //     choice3: "1",
    //     choice4: "5",
    //     answer: 2,
    // },
    // {
    //     question: "What is the capital city of Canada?",
    //     choice1: "Quebec City",
    //     choice2: "Toronto",
    //     choice3: "Ottawa",
    //     choice4: "Vancouver",
    //     answer: 3,
    // }
]

const SCORE_POINTS = 5000
const MAX_QUESTIONS = 4

/*event listener set to the logo button that reloads the home page*/
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.replace("../index.html");
}

/*start the game*/
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    containerDiv.classList.remove('hide');
    startButton.classList.add('hide');
    if (howToButton.style.display !== "block") {
        howToButton.style.display = "none";
        howToDiv.style.display = "none";
    } else {
        howToButton.style.display = "none";
    }; 
    contactButton.classList.add('hide');
    if (highscoresButton.style.display !== "block") {
        highscoresButton.style.display = "none";
        highscoresDiv.style.display = "none";
    } else {
        highscoresButton.style.display = "none";
    };
};

/*event listener set to the start button that runs the game*/
startButton.addEventListener("click", startGame);

/*generates next question, if max questions reached, redirects to end.html*/
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../end.html')
    }

    questionCounter++
    progressText.innerText = `Destination: ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

/*check if the answer is correct/incorrect call it checkAnswer instead?*/
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 2000)
    })
})

/*increment score for each correct answer*/
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

// working - list to add score to highscore list
// highScoresList.innerHTML =
// highScores.map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`
// }).join("")

//experimental
highScoresList.innerHTML =
highScores.map(score => {
    return `<p class="high-score">${score.name} - ${score.score} Air Miles</p>`
}).join("")


// https://sebhastian.com/javascript-show-hide-div-onclick-toggle/ then tweaked to serve my game
// const targetDiv = document.getElementById("third");
// const btn = document.getElementById("toggle");

//this function works. it expands and shows high scores, but keeps all other sections of page.
// highscoresButton.onclick = function () {
//     if (highscoresDiv.style.display !== "block") {
//         highscoresDiv.style.display = "block";
//     } else {
//         highscoresDiv.style.display = "none";
//     }
// };


//experimental attempt to hide all others and just show highscore
//improve js, maybe add hide all for reocurring stuff e.g. hide all start/howTo+contact
//might need to do the same for the How to Play button
highscoresButton.onclick = function () {
    if (highscoresDiv.style.display !== "block") {
        highscoresDiv.style.display = "block";
        startButton.classList.add('hide');
        howToButton.classList.add('hide');
        // howToDiv.classList.add('hide');
        contactButton.classList.add('hide');
        gameArea.style.top = "55%";
    } else {
        highscoresDiv.style.display = "none";
        startButton.classList.remove('hide');
        howToButton.classList.remove('hide');
        // howToDiv.classList.remove('hide');
        contactButton.classList.remove('hide');
        gameArea.style.top = "60%";
    }
};

// trying this way, https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
// function myFunction() {
//     var x = document.getElementById("high-container");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }



//for the how to play popup

//this function works. it expands and shows instructions on how to play, but keeps all other sections of page.
// howToButton.onclick = function () {
//     if (howToDiv.style.display !== "block") {
//         howToDiv.style.display = "block";
//     } else {
//         howToDiv.style.display = "none";
//     }
// };

//same thing but for Hot To Play section
howToButton.onclick = function () {
    if (howToDiv.style.display !== "block") {
        howToDiv.style.display = "block";
        startButton.classList.add('hide');
        contactButton.classList.add('hide');
        highscoresButton.classList.add('hide');
        // hideContent();
        // howToButton.classList.remove('hide');
        gameArea.style.top = "55%";
    } else {
        howToDiv.style.display = "none";
        startButton.classList.remove('hide');
        contactButton.classList.remove('hide');
        highscoresButton.classList.remove('hide');
        gameArea.style.top = "60%";
    }
};

//same thing but for Contact section
contactButton.onclick = function () {
    if (contactDiv.style.display !== "block") {
        contactDiv.style.display = "block";
        startButton.classList.add('hide');
        howToButton.classList.add('hide');
        highscoresButton.classList.add('hide');
        // hideContent();
        // howToButton.classList.remove('hide');
        gameArea.style.top = "55%";
    } else {
        contactDiv.style.display = "none";
        startButton.classList.remove('hide');
        howToButton.classList.remove('hide');
        highscoresButton.classList.remove('hide');
        gameArea.style.top = "60%";
    }
};








