(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk');

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);
        },

        initializing: function() {
            this.log(chalk.cyan('\t \t  ___           __  __     _    _ '));
            this.log(chalk.cyan('\t \t / __| __ __ _ / _|/ _|___| |__| |'));
            this.log(chalk.cyan('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |'));
            this.log(chalk.cyan('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n'));
            this.log(chalk.cyan('\t \t [        Starting project       ] \n \n'));
            this.log(chalk.green('Starting development mode. I will start a server with BrowserSync support. :) \n \n'));
        },

        install: function() {
            var done = this.async();

            this.spawnCommand('grunt', ['default']).on('exit', done);
        },

        end: function() {
            this.log(chalk.yellow('\n \n All done! Everything looks fine. Good job! \n \n'));
        }

    });

})();
