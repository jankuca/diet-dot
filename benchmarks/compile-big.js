var fs = require('fs'),
    template = fs.readFileSync(__dirname + '/templates/big.dot').toString(),
    templateDiet = template.replace(/{{/g, '[[').replace(/}}/g, ']]')
    data = require('./templates/big.json')

template += ''
templateDiet += ''

exports.compare = {
    "dietDot": function () {
        var dietDot = require('../diet-dot.js')

        dietDot(templateDiet)
    },
    "doT": function () {
        var doT = require('../doT.js')

        doT.compile(template)
    }
}

require('bench').runMain()