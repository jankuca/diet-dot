'use strict';

// Want to check to see if it works? Just run this! It'll report any errors.
var dietDot = require('./diet-dot.js'),
    template1 = 'This [[= data.secondPart ]]',
    template2 = 'This is [[? data.awesome ]]awesome[[??]]not awesome[[?]]',
    template3 = 'This is [[~ data :value]][[= value ]], [[~]]and awesome.',
    failed = [],
    compiledTemplate1,
    compiledTemplate2,
    compiledTemplate3

// First see if we can make new dietDots without getting any errors thrown at us
try {
    compiledTemplate1 = new dietDot(template1)
    compiledTemplate2 = new dietDot(template2)
    compiledTemplate3 = new dietDot(template3)
}
catch (e) {
    console.log('\x1b[31mFAILED to create a new dietDot:\x1b[0m ' + e)
    process.exit()
}

// Now make more tests
if (compiledTemplate1({secondPart: 'works'}) !== 'This works') {
    failed.push('Using a compiled simple template (#1)')
}
if (compiledTemplate1({secondPart: 'has worked twice now'}) !== 'This has worked twice now') {
    failed.push('Using a compiled simple template a second time with different data (#2)')
}
if (compiledTemplate2({awesome: true}) !== 'This is awesome') {
    failed.push('Using a compiled if/elseif/else template (#3)')
}
if (compiledTemplate2({awesome: false}) !== 'This is not awesome') {
    failed.push('Using a compiled if/elseif/else template a second time with different data (#4)')
}
if (compiledTemplate3(['fast', 'cool', 'speedy', 'lightweight']) !== 'This is fast, cool, speedy, lightweight, and awesome.') {
    failed.push('Using a compiled array template (#5)')
}
if (compiledTemplate3([]) !== 'This is and awesome.') {
    failed.push('Using a compiled array template a second time with different data (#6)')
}

// Report any failures
if (failed.length >= 1) {
    console.log('\x1b[31mFAILED test!\x1b[0m Here are the places where we failed:')
    for (var fail in failed) {
        if (failed.hasOwnProperty(fail)) { 
            console.log(failed[fail])
        }
    }
}
else {
    console.log('\x1b[32mPassed all tests\x1b[0m')
}
