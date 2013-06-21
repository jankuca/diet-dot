var fs = require('fs'),
    template = fs.readFileSync(__dirname + '/templates/big.dot').toString(),
    templateDiet = template.replace(/{{/g, '<%').replace(/}}/g, '%>')
    data = require('./templates/big.json')

exports.compare = {
    "doT": function () {
        var doT = require('../doT.js'),
            compilation

        compilation = doT.compile(template)
        compilation(data)
    },
    "dietDot": function () {
        var dietDot = require('../diet-dot.js'),
            compilation

        compilation = new dietDot(templateDiet)
        compilation(data)
    }
}

require('bench').runMain()