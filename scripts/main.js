const functions = require('./functions') 

let timesTable = []

const quizBox = document.querySelector('.quiz-box')
const families = document.querySelectorAll('.fact-family')

for (family of families) {
    family.addEventListener('click', (event) => {
        indicator.textContent = ''
        if (event.target.textContent[1] === '0') {
            timesTable = functions.makeTimesTable(10)
        }
        else {
            timesTable = functions.makeTimesTable(Number(event.target.textContent[0]))
        }
        quizBox.textContent = timesTable[Math.floor(Math.random()*timesTable.length)];
    })
}

const form = document.querySelector('form')
const inputAnswer = document.querySelector('#answer')
const indicator = document.querySelector('.indicator')
const starsOnSite = document.querySelector('.star-number')
const trackerBox = document.querySelector('.tracker-box')
let starCount = Number(localStorage.getItem('stars'))

if (starCount){
    starsOnSite.textContent = starCount
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!quizBox.textContent){
        indicator.textContent = 'Pick a fact family!'
        indicator.style.color = 'black'
    }
    else if (!inputAnswer.value){
        indicator.textContent = 'Oops! Type in your answer.'
        indicator.style.color = 'blue'
    }
    else {
        const bool = functions.checkAnswer(quizBox.textContent, inputAnswer.value)
        inputAnswer.value = ''
        if (bool) {
            indicator.textContent = 'Correct!'
            indicator.style.color = 'green'
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
            indicator.textContent = 'Try Again!'
            indicator.style.color = 'red'
        }
    }
})

