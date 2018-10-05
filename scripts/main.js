const makeTimesTable = require('./functions') 

let timesTable = []

const quizBox = document.querySelector('.quiz-box')
const families = document.querySelectorAll('.fact-family')

for (family of families) {
    family.addEventListener('click', (event) => {
        timesTable = makeTimesTable(Number(event.target.textContent[0]))
        console.log(timesTable)
        //if (family.textContent first two characters === 10) {
            //
        //}
        quizBox.textContent = timesTable[Math.floor(Math.random()*timesTable.length)];

    })

}