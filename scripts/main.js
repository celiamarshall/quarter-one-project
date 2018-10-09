const render = require('./render') 

const inputAnswer = document.querySelector('#answer')

const starsOnSite = document.querySelector('.star-number')
let starCount = Number(localStorage.getItem('stars'))
if (starCount){
    starsOnSite.textContent = starCount
}

const families = document.querySelectorAll('.fact-family')
for (family of families) {
    family.addEventListener('click', (event) => {

        render.makeClickedTimesTable()
    })
}

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    render.feedbackForIndicator()

    render.nextQuestion()
})

const numberButtons = document.querySelectorAll('.number-button')
for (button of numberButtons) {
    button.addEventListener('click', (event) => {
        inputAnswer.value += button.textContent
    })
}

