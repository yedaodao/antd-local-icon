var less = require('less'),
    path = require('path');

var cdnRegx = /https\:\/\/at\.alicdn\.com\/t\/font_/,
    parser = null;

module.exports = function (source) {
    var callback = this.async();
    less.parse(source, {
        paths: [path.dirname(this.resource)]
    }, function (err, tree) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log(tree);
        callback(null, source);
    });
};
