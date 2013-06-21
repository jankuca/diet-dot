var fs = require('fs'),
    template = fs.readFileSync(__dirname + '/templates/little.dot').toString(),
    templateDiet = template.replace(/{{/g, '[[').replace(/}}/g, ']]')
    data = require('./templates/little.json')

exports.compare = {
    "doT": function () {
        var doT = require('../doT.js')

        doT.compile(template)
    },
    "dietDot": function () {
        var dietDot = require('../diet-dot.js')

        dietDot(templateDiet)
    }
}

require('bench').runMain()