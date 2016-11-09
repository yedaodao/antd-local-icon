var less = require('less'),
    path = require('path');

var replacePrefix = ';\n@icon-url:"__var__";\n',
    replaceRegx = /;\n/,
    queryRegx = /\?.*url=([^&]+)/i;

module.exports = function (source) {
    var callback = this.async();
    if (queryRegx.test(this.query)) {
        var matches = queryRegx.exec(this.query);
        if (matches.length >= 2) {
            source = source.replace(replaceRegx, replacePrefix.replace('__var__', matches[1]));
        }
    }
    callback(null, source);
};
