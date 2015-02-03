var chalk = require('chalk');

module.exports = function(yeoman) {

    'use strict';

    var scaffold = {};

    scaffold.welcomeMessage = function(title, message) {
        scaffold.log('\t \t  ___           __  __     _    _ ', 'cyan');
        scaffold.log('\t \t / __| __ __ _ / _|/ _|___| |__| |', 'cyan');
        scaffold.log('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |', 'cyan');
        scaffold.log('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n', 'cyan');
        scaffold.log('\t \t [ ' + title + ' ] \n \n', 'cyan');
        scaffold.log(message + ' \n \n', 'green');
    };

    scaffold.validatePrompt = function(validate) {
        var done = validate.done;

        if (validate.input.trim() === '') {
            done(validate.message);

            return;
        }

        done(true);
    };

    scaffold.log = function(log, color) {
        var logger = chalk[color];

        yeoman.log(logger(log));
    };

    return scaffold;

};
