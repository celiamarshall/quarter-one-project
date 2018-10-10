const render = require('./render')

const inputAnswer = document.querySelector('#answer')

const starsOnSite = document.querySelector('.star-number')
let starCount = Number(localStorage.getItem('stars'))
if (starCount) {
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

    inputAnswer.focus()
})

const numberButtons = document.querySelectorAll('.number-button')
for (button of numberButtons) {
    button.addEventListener('click', (event) => {
        inputAnswer.value += event.target.textContent
        inputAnswer.focus()
    })
}

const deleteButton = document.querySelector('.delete-button')
deleteButton.addEventListener('click', (event) => {
    inputAnswer.value = inputAnswer.value.slice(0, inputAnswer.value.length - 1)
})

