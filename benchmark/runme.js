'use strict';

var dietDot = require('../diet-dot.js'),
    doT = require('./doT.js'),
    template = 'This is so {{=data.adjective}}',
    times = 999,
    precision = 6,
    benchmark = function (engine) {
        elapsed_time(engine, 1)

        for (var i = 0; i < times; i += 1) {
            compiledTemplate({adjective: 'awesome'})
        }
        elapsed_time(engine, 2)
    },
    records = [],
    results = '',
    start,
    compiledTemplate,
    elapsed_time

elapsed_time = function (engine, operation) {
    var elapsed = (process.hrtime(start)[1] / 1000000).toFixed(precision)

    //console.log(elapsed + " ms - " + (operation == 2 ? 'Used the compiled template ' + times + ' times' : 'Compiled template'))
    if (typeof records[engine] === 'undefined') {
        records[engine] = []
    }
    records[engine][operation] = elapsed
    start = process.hrtime()
}

console.log('Testing doT...')
start = process.hrtime()
compiledTemplate = doT.compile(template)
benchmark(1)

console.log('Testing diet dot...')
start = process.hrtime()
compiledTemplate = new dietDot(template)
benchmark(2)

console.log('Results:\n')

/*
Here's an example of how we want these results to come out:

========================================
Test: createTemplate x 1
========================================
Name      Time ms
doT       1.789892
diet dot  0.594768

========================================
Test: render x 999
========================================
Name      Time ms   Avg ms
doT       0.731378  0.000732
diet dot  0.048609  0.000048

========================================
Conclusion
========================================
Creating Templates:
    diet dot is x% faster

Rendering:
    diet dot is x% faster

*/

results += '========================================\n'
results += 'Test: createTemplate x 1\n'
results += '========================================\n'
results += 'Name      Time ms\n'
results += 'doT       ' + records[1][1] + '\n'
results += 'diet dot  ' + records[2][1] + '\n'
results += '\n'
results += '========================================\n'
results += 'Test: render x 999\n'
results += '========================================\n'
results += 'Name      Time ms   Avg ms\n'
results += 'doT       ' + records[1][2] + '  ' + (records[1][2] / times).toFixed(precision) + '\n'
results += 'diet dot  ' + records[2][2] + '  ' + (records[2][2] / times).toFixed(precision) + '\n'
results += '\n'
results += '========================================\n'
results += 'Conclusion\n'
results += '========================================\n'
results += 'Creating Templates:\n'
results += '    diet dot is ' + ( (records[1][1] / records[2][1]).toFixed(precision) * 100) + '% faster\n'
results += 'Rendering:\n'
results += '    diet dot is ' + ( (records[1][2] / records[2][2]) * 100 ).toFixed(precision) + '% faster\n'

console.log(results)