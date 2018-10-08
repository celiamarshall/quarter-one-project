const functions = require('./functions') 

const quizBox = document.querySelector('.quiz-box')
const families = document.querySelectorAll('.fact-family')
const inputAnswer = document.querySelector('#answer')
let familyPickedBool = false
let timesTable = []


for (family of families) {
    family.addEventListener('click', (event) => {
        familyPickedBool = true
        inputAnswer.focus()
        indicator.textContent = ''
        if (event.target.textContent[1] === '0') {
            timesTable = functions.makeTimesTable(10)
        }
        else {
            timesTable = functions.makeTimesTable(Number(event.target.textContent[0]))
        }
        let randomIndex = Math.floor(Math.random()*timesTable.length)
        quizBox.textContent = timesTable[randomIndex]
        timesTable.splice(randomIndex, 1)
        //event.target.style.backgroundColor = "#BF0808"
    })
}

const form = document.querySelector('form')
const indicator = document.querySelector('.indicator')
const starsOnSite = document.querySelector('.star-number')
const trackerBox = document.querySelector('.tracker-box')
let starCount = Number(localStorage.getItem('stars'))
let waitingToType = false

if (starCount){
    starsOnSite.textContent = starCount
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    //if user has not started quiz, or they have just finished a quiz
    if (!quizBox.textContent || quizBox.textContent === 'Nice work!'){
        quizBox.textContent = ''
        inputAnswer.value = ''
        indicator.textContent = 'Pick a fact family!'
        indicator.style.color = 'black'
    }
    //if user sees a question, but did not enter answer
    else if (!inputAnswer.value){
        indicator.textContent = 'Oops! Type in your answer.'
        indicator.style.color = 'blue'
        waitingToType = true
    }
    else {
        const bool = functions.checkAnswer(quizBox.textContent, inputAnswer.value)
        inputAnswer.value = ''

        if (bool) {
            indicator.textContent = 'Correct!'
            indicator.style.color = 'green'
            waitingToType = false
            setTimeout(() => {
                indicator.textContent = ''
            }, 1000)

            if (starCount){
                starCount++
                localStorage.setItem('stars', starCount)
            }
            else {
                localStorage.setItem('stars', 1)
            }
            starsOnSite.textContent = starCount
        }

        else {
            indicator.textContent = 'Next time!'
            indicator.style.color = 'red'
            waitingToType = false
            setTimeout(() => {
                indicator.textContent = ''
            }, 1000)
        }
    }

    //if there are still questions to be asked in the timesTable array, but we are not waiting for the user to type in their answer
    if (timesTable.length > 0 && !waitingToType) {
        setTimeout(() => { 
            randomIndex = Math.floor(Math.random()*timesTable.length)
            quizBox.textContent = timesTable[randomIndex]
            timesTable.splice(randomIndex, 1)
        }, 1000)
    }

    //if a fact family has been picked and a user has entered input for all of the questions
    else if (familyPickedBool && !waitingToType){
        quizBox.textContent = 'Nice work!'
        indicator.textContent = ''
        familyPickedBool = false
    }
})

