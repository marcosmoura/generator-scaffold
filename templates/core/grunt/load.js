var glob = require('glob');

module.exports = function (path) {
    var object = {},
        key;

    glob.sync('*', {cwd: path}).forEach(function (option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);
    });

    return object;
};
