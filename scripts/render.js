const templates = require('./templates')

const quizBox = document.querySelector('.quiz-box')
const inputAnswer = document.querySelector('#answer')
const trackerBox = document.querySelector('.tracker')
const resultsBox = document.querySelector('.results')
const indicator = document.querySelector('.indicator')
const families = document.querySelectorAll('.fact-family')
let familyPickedBool = false
let waitingToType = false
let timesTable = []
let storageObject = {}

function makeClickedTimesTable() {
    familyPickedBool = true
    inputAnswer.focus()
    indicator.textContent = ''
    //if the first number is 10
    if (event.target.textContent[1] === '0') {
        timesTable = templates.makeAnyTimesTable(10)
    }
    else {
        timesTable = templates.makeAnyTimesTable(Number(event.target.textContent[0]))
    }
    //reset the side boxes when a new fact family is clicked
    trackerBox.innerHTML = ''
    resultsBox.innerHTML = ''
    //reset the storage object when a new fact family is clicked
    storageObject = {}
    templates.displayTimesTable(timesTable)
    templates.displayResultsTable(timesTable)
    templates.displayRandomQuestion(timesTable)
    //style the chosen fact family a lighter color
    for (family of families) {
        family.classList.remove('lighter')
    }
    event.target.classList.add('lighter')
}

function feedbackForIndicator() {
    //if user has not started quiz, or they have just finished a quiz
    if (!quizBox.textContent || quizBox.textContent === 'Nice work!') {
        quizBox.textContent = ''
        inputAnswer.value = ''
        //when a user has ended a quiz, but they submit again, style all the buttons back to maroon so that one does not appear selected
        for (family of families) {
            family.classList.remove('lighter')
        }
        trackerBox.innerHTML = ''
        resultsBox.innerHTML = ''
        indicator.textContent = 'Pick a fact family!'
        indicator.style.color = 'black'
    }
    //if user sees a question, but did not enter answer, we are waiting for them to type, so we will not run nextQuestion
    else if (!inputAnswer.value) {
        indicator.textContent = 'Oops! Type in your answer.'
        indicator.style.color = 'black'
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

            templates.addNewStar()
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

function checkAnswer(equation, answer) {
    let correctAnswer = null
    //check to see if equation is 10 x 10
    if (equation[1] === '0' && equation[6] === '0') {
        correctAnswer = 100
    }
    //check to see if equation is 10 x ...
    else if (equation[1] === '0') {
        correctAnswer = 10 * equation[5]
    }
    //check to see if equation is ... x 10
    else if (equation[5] === '0') {
        correctAnswer = equation[0] * 10
    }
    //otherwise, equation takes the format of '1 x 1'
    else {
        correctAnswer = equation[0] * equation[4]
    }

    templates.styleEquations(equation, answer, correctAnswer)

    if (Number(answer) === correctAnswer) {
        storageObject[equation] = 'correct'
        //use two characters from the equation to account for the 10 fact family (so single digits will be followed by a space)
        localStorage.setItem('results' + equation[0] + equation[1], JSON.stringify(storageObject))
        return true
    }
    else {
        storageObject[equation] = 'incorrect'
        localStorage.setItem('results' + equation[0] + equation[1], JSON.stringify(storageObject))
        return false
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

    //otherwise, if a fact family has been picked and a user has entered input for all of the questions
    else if (familyPickedBool && !waitingToType) {
        setTimeout(() => {
            quizBox.textContent = 'Nice work!'
            indicator.textContent = ''
            familyPickedBool = false
        }, 1000)
    }
}

module.exports = {
    makeClickedTimesTable,
    feedbackForIndicator,
    nextQuestion,
}