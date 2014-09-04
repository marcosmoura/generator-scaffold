(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk');

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);
        },

        initTask: function() {
            this.log(chalk.cyan('\t \t  ___           __  __     _    _ '));
            this.log(chalk.cyan('\t \t / __| __ __ _ / _|/ _|___| |__| |'));
            this.log(chalk.cyan('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |'));
            this.log(chalk.cyan('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n'));
            this.log(chalk.cyan('\t \t [        Generating Build       ] \n \n'));
            this.log(chalk.green('Wait until build finish. I will create a zip file with all contents of your project.\n'));
            this.log(chalk.green('At the end of the process choose which type of version you are generating. \n \n'));
        },

        buildTask: function() {
            this.spawnCommand('grunt', ['build']);
        }

    });

})();
