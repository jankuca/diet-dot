var dietDot = require('../diet-dot.js'),
    template = 'This is so {{=it.adjective}}.',
    compiledTemplate = new dietDot(template)

console.log(compiledTemplate({adjective: 'awesome'}))
