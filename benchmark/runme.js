var dietDot = require('../diet-dot.js'),
    doT = require('./doT.js'),
    template = 'This is so {{=it.adjective}}',
    times = 999,
    benchmark = function () {
        elapsed_time(1)

        for (var i = 0; i < times; i += 1) {
            compiledTemplate({adjective: 'awesome'})
        }
        elapsed_time(2)
    },
    start,
    compiledTemplate,
    elapsed_time

elapsed_time = function (note) {
    var precision = 6,
        elapsed = process.hrtime(start)[1] / 1000000

    console.log(elapsed.toFixed(precision) + " ms - " + (note == 2 ? 'Used the compiled template ' + times + ' times' : 'Compiled template'))
    start = process.hrtime()
}

console.log('Beginning benchmark')

console.log('\nFirst I\'ll test doT')

// Start testing doT
start = process.hrtime()
compiledTemplate = doT.compile(template)
benchmark()

console.log('\n\nNow I\'ll test diet dot')

// Start testing out dietDot
start = process.hrtime()
compiledTemplate = new dietDot(template)
benchmark()

console.log('\nTest completed')