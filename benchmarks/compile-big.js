var fs = require('fs'),
    template = fs.readFileSync(__dirname + '/templates/big.dot').toString(),
    templateDiet = template.replace(/{{/g, '<%').replace(/}}/g, '%>')
    data = require('./templates/big.json')

exports.compare = {
    "doT": function () {
        var doT = require('../doT.js')

        doT.compile(template)
    },
    "dietDot": function () {
        var dietDot = require('../diet-dot.js')

        new dietDot(templateDiet)
    }
}

require('bench').runMain()