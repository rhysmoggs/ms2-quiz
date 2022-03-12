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

const highscoresButton = document.getElementById('highscore-btn');
const highscoresDiv = document.getElementById('high-container');
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
    {
        question: "How many countries border Austria?",
        choice1: "2",
        choice2: "8",
        choice3: "1",
        choice4: "5",
        answer: 2,
    },
    {
        question: "What is the capital city of Canada?",
        choice1: "Quebec City",
        choice2: "Toronto",
        choice3: "Ottawa",
        choice4: "Vancouver",
        answer: 3,
    }
]

const SCORE_POINTS = 5000
const MAX_QUESTIONS = 4



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









