function makeTimesTable (num) {
    const factFamily = []
    for (i = 0; i <= 10; i++){
        factFamily.push(`${num} x ${i}`)
    }
    return factFamily
}

function checkAnswer (equation, answer){
    let correctAnswer = null
    if (equation[1] === '0' && equation[6] === '0'){
        correctAnswer = 100
    }
    else if (equation[1] === '0'){
        correctAnswer = 10 * equation[5]
    }
    else if (equation[5] === '0'){
        correctAnswer = equation[0] * 10
    }
    else {
        correctAnswer = equation[0] * equation[4]
    }

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