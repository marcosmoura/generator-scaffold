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
            var _this = this;

            this.on('end', function() {
                this.installDependencies({
                    skipInstall: _this.options.skipInstall,
                    callback: function() {
                        var command = _this.spawnCommand('npm', ['install', 'glob']);

                        command.on('exit', function() {
                            _this.log(chalk.cyan(' \n \n All done and no errors! Enjoy! \n \n'));
                        });
                    }
                });
            });
        }

    });

})();
