var path = require('path');
var generator = require('generate-password');

var randomGenerator = function (Size) {
    return generator.generate({
        length: Size,
        uppercase: true,
        numbers: true,
        exclude: true,
        excludeSimilarCharacters: true,
    });
}

module.exports.randomGenerator = randomGenerator;