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
            this.log(chalk.cyan('\t \t [        Generating Build       ] \n \n'));
            this.log(chalk.green('Wait until build finish. I will create a zip file with all contents of your project.\n'));
            this.log(chalk.green('Choose below if this build means a new version and what type. \n \n'));
        },

        prompting: function() {
            var cb = this.async(),
                prompts = [{
                    type: 'confirm',
                    name: 'hasVersion',
                    message: 'This will increase a version of your project?',
                    default: 0
                }, {
                    type: 'list',
                    name: 'versionType',
                    message: 'What kind of version?',
                    choices: ['Just a fix (Ex: 0.0.1)', 'Minor Version (Ex: 0.1.0)', 'Major Version (Ex: 1.0.0)', 'Pre-release (Ex: 1.0.0-1)'],
                    default: 0,
                    when: function (answers) {
                        return answers.hasVersion;
                    }
                }];

            this.prompt(prompts, function(props) {
                for(var item in props) {
                    this[item] = props[item];
                }

                this.log(chalk.yellow(' \n Perfect! \n \n'));

                cb();
            }.bind(this));
        },

        writing: function() {
            if (this.hasVersion) {
                var done = this.async(),
                    version = 'patch';

                if (this.versionType === 'Minor Version (Ex: 0.1.0)') {
                    version = 'minor';
                } else if (this.versionType === 'Major Version (Ex: 1.0.0)') {
                    version = 'major';
                } else if (this.versionType === 'Pre-release (Ex: 1.0.0-1)') {
                    version = 'prerelease';
                }

                this.spawnCommand('grunt', ['bump:' + version]).on('exit', done);
            }
        },

        install: function() {
            var done = this.async();

            this.spawnCommand('grunt', ['build']).on('exit', done);
        },

        end: function() {
            this.log(chalk.yellow('\n \n All done! Everything looks fine. Good job! \n \n'));
        }

    });

})();
