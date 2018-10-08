const quizBox = document.querySelector('.quiz-box')
const inputAnswer = document.querySelector('#answer')
const trackerBox = document.querySelector('.tracker')
const indicator = document.querySelector('.indicator')
let familyPickedBool = false
let waitingToType = false
let timesTable = []
let correctCount = 0

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
        if (equation === '1 x 1') {
            newEquation.style.fontSize = '31px'
        } 
        else {
        newEquation.style.fontSize = '30px'
        }
        newEquation.style.marginRight = '25px'
        newEquation.style.marginBottom = '15px'
        newEquation.style.marginTop = '15px'
        newEquation.classList.add('tracker-equation')
        newEquation.textContent = equation
        trackerBox.appendChild(newEquation)
    }
    const all = document.createElement('p')
    all.style.fontSize = '30px'
    all.style.marginRight = '35px'
    all.style.marginBottom = '15px'
    all.style.marginTop = '15px'
    all.classList.add('all-tracker-equations')
    all.textContent = 'All!'
    trackerBox.appendChild(all)
}

function displayRandomQuestion(timesTable) {
    //generate a random index from the times table array
    let randomIndex = Math.floor(Math.random() * timesTable.length)
    quizBox.textContent = timesTable[randomIndex]
    //remove the question at that index because it has already been attempted
    timesTable.splice(randomIndex, 1)
    event.target.style.backgroundColor = "#BF0808"

}

function makeClickedTimesTable() {
    familyPickedBool = true
    inputAnswer.focus()
    indicator.textContent = ''
    //if the first number is 10
    if (event.target.textContent[1] === '0') {
        timesTable = makeAnyTimesTable(10)
    }
    else {
        timesTable = makeAnyTimesTable(Number(event.target.textContent[0]))
    }
    trackerBox.innerHTML = ''
    displayTimesTable(timesTable)
    displayRandomQuestion(timesTable)
}

function trackEquations(equation, answer, correctAnswer) {
    const trackerEquations = document.querySelectorAll('.tracker-equation')
    for (p of trackerEquations) {
        if (p.textContent === equation) {
            if (Number(answer) === correctAnswer) {
                p.style.color = 'green'
                correctCount++
            }
            else {
                p.style.color = 'red'
            }
        }
    }
}

function checkAnswer(equation, answer) {
    let correctAnswer = null
    if (equation[1] === '0' && equation[6] === '0') {
        correctAnswer = 100
    }
    else if (equation[1] === '0') {
        correctAnswer = 10 * equation[5]
    }
    else if (equation[5] === '0') {
        correctAnswer = equation[0] * 10
    }
    else {
        correctAnswer = equation[0] * equation[4]
    }

    trackEquations(equation, answer, correctAnswer)

    if (Number(answer) === correctAnswer) {
        return true
    }
    else {
        return false
    }
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
}

function feedbackForIndicator() {
    //if user has not started quiz, or they have just finished a quiz
    if (!quizBox.textContent || quizBox.textContent === 'Nice work!') {
        quizBox.textContent = ''
        inputAnswer.value = ''
        indicator.textContent = 'Pick a fact family!'
        indicator.style.color = 'black'
    }
    //if user sees a question, but did not enter answer, we are waiting for them to type, so we will not run nextQuestion
    else if (!inputAnswer.value) {
        indicator.textContent = 'Oops! Type in your answer.'
        indicator.style.color = 'blue'
        waitingToType = true
    }
    //if user has entered an answer
    else {
        const bool = checkAnswer(quizBox.textContent, inputAnswer.value)
        inputAnswer.value = ''

        //if the answer was correct
        if (bool) {
            indicator.textContent = 'Correct!'
            indicator.style.color = 'green'
            waitingToType = false

            setTimeout(() => {
                indicator.textContent = ''
            }, 1000)

            addNewStar()
        }

        //if the answer was incorrect
        else {
            indicator.textContent = 'Next time!'
            indicator.style.color = 'red'
            waitingToType = false
            setTimeout(() => {
                indicator.textContent = ''
            }, 1000)
        }
    }
}

function nextQuestion() {
    //if there are still questions to be asked in the timesTable array, but we are not waiting for the user to type in their answer
    if (timesTable.length > 0 && !waitingToType) {
        setTimeout(() => {
            randomIndex = Math.floor(Math.random() * timesTable.length)
            quizBox.textContent = timesTable[randomIndex]
            timesTable.splice(randomIndex, 1)
        }, 1000)
    }

    //if a fact family has been picked and a user has entered input for all of the questions
    else if (familyPickedBool && !waitingToType) {
        setTimeout(() => {
            quizBox.textContent = 'Nice work!'
            indicator.textContent = ''
            if (correctCount === 11) {
                document.querySelector('.all-tracker-equations').style.color = 'green'
            }
            familyPickedBool = false
        }, 1000)
    }

}

module.exports = {
    makeClickedTimesTable,
    feedbackForIndicator,
    nextQuestion,
}