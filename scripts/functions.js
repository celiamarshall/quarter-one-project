function makeTimesTable (num) {
    const factFamily = []
    for (i = 0; i <= 10; i++){
        factFamily.push(`${num} x ${i}`)
    }
    return factFamily
}

function checkAnswer (equation, answer){
    const correctAnswer = equation[0] * equation[4]
    if (Number(answer) === correctAnswer){
        return true
    }
    else {
        return false
    }
}

module.exports = {
    makeTimesTable,
    checkAnswer
}