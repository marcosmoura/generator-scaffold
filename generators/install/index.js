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
            this.log(chalk.cyan('\t \t [      Install Dependencies     ] \n \n'));
            this.log(chalk.green('I will install all NPM and Bower dependencies. This may take a while. Go grab a coffee! \n \n'));
        },

        install: function() {
            this.installDependencies({ skipInstall: this.options.skipInstall });
        },

        end: function() {
            var _this = this,
                glob = this.spawnCommand('npm', ['install', 'glob']);

            glob.on('exit', function() {
                _this.log(chalk.cyan(' \n \n All done and no errors! Enjoy! \n \n'));

                _this.spawnCommand('grunt', ['default']);
            });
        }

    });

})();
