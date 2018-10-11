const trackerBox = document.querySelector('.tracker')
const resultsBox = document.querySelector('.results')
const quizBox = document.querySelector('.quiz-box')

function makeAnyTimesTable(num) {
    const factFamily = []
    for (i = 0; i <= 10; i++) {
        factFamily.push(`${num} x ${i}`)
    }
    return factFamily
}

function displayTimesTable(timesTable) {
    for (equation of timesTable) {
        const newEquation = document.createElement('p')
        newEquation.classList.add('tracker-equation')
        newEquation.textContent = equation
        trackerBox.appendChild(newEquation)
    }
}

let localAnswerChecks = { values: '' }
function displayResultsTable(timesTable) {
    for (equation of timesTable) {
        const newEquation = document.createElement('p')
        newEquation.classList.add('results-equation')
        newEquation.textContent = equation
        //get saved answer checks (i.e. correct or incorrect) from local storage for the particular fact family 
        localAnswerChecks.values = localStorage.getItem('results' + equation[0] + equation[1])
        //if there are save answer checks, if there is a particular answer check for the equation, style it green for correct and red for incorrect
        if (localAnswerChecks.values) {
            const answerChecks = JSON.parse(localAnswerChecks.values)
            if (answerChecks[equation] === 'correct') {
                newEquation.style.color = 'green'
            }
            else if (answerChecks[equation] === 'incorrect') {
                newEquation.style.color = 'red'
            }
        }
        resultsBox.appendChild(newEquation)
    }
}

function displayRandomQuestion(timesTable) {
    //generate a random index from the times table array
    let randomIndex = Math.floor(Math.random() * timesTable.length)
    quizBox.textContent = timesTable[randomIndex]
    //remove the question at that index because it has already been attempted
    timesTable.splice(randomIndex, 1)
}

function addNewStar() {
    const starsOnSite = document.querySelector('.star-number')
    let starCount = Number(localStorage.getItem('stars'))

    if (starCount) {
        starCount++
        localStorage.setItem('stars', starCount)
    }
    else {
        localStorage.setItem('stars', 1)
    }
    starsOnSite.textContent = starCount
    starsOnSite.style.color = 'gold'
    setTimeout(() => {
        starsOnSite.style.color = 'black'
    }, 700)
}

function styleEquations(equation, answer, correctAnswer) {
    const trackerEquations = document.querySelectorAll('.tracker-equation')
    for (p of trackerEquations) {
        if (p.textContent === equation) {
            if (Number(answer) === correctAnswer) {
                p.style.color = 'green'
            }
            else {
                p.style.color = 'red'
            }
        }
    }
}


module.exports = {
    makeAnyTimesTable,
    displayTimesTable,
    displayResultsTable,
    displayRandomQuestion,
    addNewStar,
    styleEquations,
    localAnswerChecks
}