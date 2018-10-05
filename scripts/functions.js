function makeTimesTable (num) {
    const factFamily = []
    for (i = 0; i <= 10; i++){
        factFamily.push(`${num} x ${i}`)
    }
    return factFamily
}

module.exports = makeTimesTable