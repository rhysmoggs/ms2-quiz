// list of variables
const logoReload = document.getElementById('logo');

const username = document.querySelector('#username');

const saveScoreBtn = document.querySelector('#saveScoreBtn');

const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const homeButton = document.getElementById('home-btn');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


// maximum number of saved usernames and scores listed on High Scores list
const MAX_HIGH_SCORES = 5;

// display user's final score and message on end screen
if (mostRecentScore == 25000) {
    finalScore.innerHTML = `<span id="span-score"> ${mostRecentScore} miles travelled!<br><br>You successfully travelled the world!</span>`;
  } else {
    finalScore.innerHTML = `<span id="span-score"> ${mostRecentScore} miles travelled</span>`;
};

// event listener added to input field, which then enables Save button
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

/* saves high score to storage, organizes them and add only allows the highest 5 */
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};

/* event listener set to the home button */
homeButton.addEventListener("click", goHome);

/* goes to home page */
function goHome() {
    window.location.assign('index.html');
}

/* event listener set to the logo button that reloads the quiz main meenu */
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.assign('index.html');
};