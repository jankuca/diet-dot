// Want to check to see if it works? Just run this! It'll report any errors.
var dietDot = require('./diet-dot.js'),
    template = 'This {{=data.secondPart}}',
    failed = [],
    compiledTemplate

// First see if we can make a new dietDot without getting an error
try {
    compiledTemplate = new dietDot(template)
}
catch (e) {
    console.log('\x1b[31mFAILED to create a new dietDot!\x1b[0m')
    process.exit()
}

// Now make more tests
if (compiledTemplate({secondPart: 'works'}) !== 'This works') {
    failed.push('Using the compiled the template')
}
if (compiledTemplate({secondPart: 'has worked twice now'}) !== 'This has worked twice now') {
    failed.push('Using the compiled template a second time with different data')
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
