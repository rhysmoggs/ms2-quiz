// list of variables
const logoReload = document.getElementById('logo');

const username = document.querySelector('#username');

const saveScoreBtn = document.querySelector('#saveScoreBtn');

const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const homeButton = document.getElementById('home-btn');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []



// maximum number of saved usernames and scores listed on High Scores list
const MAX_HIGH_SCORES = 5



// display user's final score on end screen
finalScore.innerText = mostRecentScore + ' Air Miles';



// 
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

//
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}

/*event listener set to the home button*/
homeButton.addEventListener("click", goHome);

/*goes to home page*/
function goHome() {
    window.location.assign('/');
}

/*event listener set to the logo button that reloads the home page*/
logoReload.addEventListener("click", reloadGame);

function reloadGame() {
    window.location.replace("../index.html");
}