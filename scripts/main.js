const render = require('./render')

const inputAnswer = document.querySelector('#answer')

const starsOnSite = document.querySelector('.star-number')
let starCount = Number(localStorage.getItem('stars'))
if (starCount) {
    starsOnSite.textContent = starCount
}

let timeLimit = null

const timeChoices = document.querySelectorAll('.time-choices')
for (timeChoice of timeChoices) {
    timeChoice.addEventListener('click', (event) => {
        render.cancelTimer()
        const elem = document.querySelector('.modal')
        const instance = M.Modal.getInstance(elem);
        instance.close()
        inputAnswer.focus()

        document.querySelector('.timer').textContent = timeLimit
        timeLimit = event.target.textContent[0] + event.target.textContent[1]
        if (timeLimit !== 'No') {
            render.startTimer(Number(timeLimit))

            document.querySelector('.timer').textContent = timeLimit
            document.querySelector('.timer-container').classList.remove('hidden')
        }
        else {
            document.querySelector('.timer-container').classList.add('hidden')
        }
    })
}

const families = document.querySelectorAll('.fact-family')
//const alert = document.querySelector('.alert')
for (family of families) {
    family.addEventListener('click', (event) => {

        render.makeClickedTimesTable()

        render.cancelTimer()

        if (timeLimit !== 'No' && timeLimit !== null) {
            console.log('hi')
            render.startTimer(Number(timeLimit))
        }

    })
}

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems);
  });

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

const keypadButton = document.querySelector('.keypad-button')
keypadButton.addEventListener('click', (event) => {
    for (button of numberButtons) {
        button.classList.toggle('hidden')
    }
    deleteButton.classList.toggle('hidden')
})
