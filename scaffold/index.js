var chalk = require('chalk');

module.exports = function(yeoman) {

    'use strict';

    var scaffold = {};

    scaffold.welcomeMessage = function(title, message) {
        yeoman.log(chalk.cyan('\t \t  ___           __  __     _    _ '));
        yeoman.log(chalk.cyan('\t \t / __| __ __ _ / _|/ _|___| |__| |'));
        yeoman.log(chalk.cyan('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |'));
        yeoman.log(chalk.cyan('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n'));
        yeoman.log(chalk.cyan('\t \t [ ' + title + ' ] \n \n'));
        yeoman.log(chalk.green('' + message + ' \n \n'));
    };

    return scaffold;

};
