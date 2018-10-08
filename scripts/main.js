const functions = require('./functions') 

const starsOnSite = document.querySelector('.star-number')
let starCount = Number(localStorage.getItem('stars'))
if (starCount){
    starsOnSite.textContent = starCount
}

const families = document.querySelectorAll('.fact-family')
for (family of families) {
    family.addEventListener('click', (event) => {
        functions.makeClickedTimesTable()
    })
}



const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    functions.feedbackForIndicator()

    functions.nextQuestion()
})



