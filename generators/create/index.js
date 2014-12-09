(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        fs = require('fs'),
        path = require('path'),
        mainPath = '',
        main = '';

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);

            if (!this.config.get('hasAssemble')) {
                this.log(chalk.red('This sub generator won\'t work with a single file project. Aborting. \n'));

                return false;
            }
        },

        initializing: function() {
            if (this.config.get('hasAssemble')) {
                this.log(chalk.cyan('\t \t  ___           __  __     _    _ '));
                this.log(chalk.cyan('\t \t / __| __ __ _ / _|/ _|___| |__| |'));
                this.log(chalk.cyan('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |'));
                this.log(chalk.cyan('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n'));
                this.log(chalk.cyan('\t \t [         Creating Page         ] \n \n'));
                this.log(chalk.green('This is a guide to create a new page for assemble template. It also include a less file. \n \n'));
            }
        },

        promptTask: function() {
            if (this.config.get('hasAssemble')) {
                var done = this.async(),
                    prompts = [{
                        name: 'projectName',
                        message: 'Page name:',
                        validate: function(input) {
                            var done = this.async();

                            if (input.trim() === '') {
                                done('Hey dude! You forgot to enter the page name!');

                                return;
                            }

                            done(true);
                        }
                    }, {
                        name: 'projectDescription',
                        message: 'Page description:',
                        validate: function(input) {
                            var done = this.async();

                            if (input.trim() === '') {
                                done('Hey dude! You forgot to enter the project Description!');

                                return;
                            }

                            done(true);
                        }
                    }, {
                        type: 'confirm',
                        name: 'createJs',
                        message: 'Do you like to create a JS file for this page?',
                        default: 1
                    }];

                this.prompt(prompts, function(answers) {
                    for(var answer in answers) {
                        this[answer] = answers[answer];
                    }

                    this.pageSlug = this._.slugify(this.projectName);

                    this.log(chalk.yellow(' \nGood! Now I will create all files. Wait a sec. \n \n'));

                    done();
                }.bind(this));
            }
        },

        html: function() {
            if (this.config.get('hasAssemble')) {
                this.sourceRoot(path.join(__dirname, '../../templates/web'));

                this.fs.copyTpl(
                    this.templatePath('index.html'),
                    this.destinationPath('dev/'+ this.pageSlug +'.html'),
                    this
                );
            }
        },

        css: function() {
            if (this.config.get('hasAssemble')) {
                this.sourceRoot(path.join(__dirname, '../../templates/assets/less/pages'));

                this.fs.copy(
                    this.templatePath('index.less'),
                    this.destinationPath('dev/assets/less/pages/'+ this.pageSlug +'.less')
                );

                mainPath = this.destinationPath('dev/assets/less/main.less');

                main = this.fs.read(mainPath);
            }
        },

        main: function() {
            if (this.config.get('hasAssemble')) {
                fs.unlinkSync(mainPath);

                main += '@import \'pages/' + this.pageSlug +'.less\'\n';

                this.fs.write(mainPath, main);
            }
        },

        js: function() {
            if (this.config.get('hasAssemble')) {
                if (this.createJs) {
                    this.sourceRoot(path.join(__dirname, '../../templates/assets/js'));

                    this.fs.copy(
                        this.templatePath('main.js'),
                        this.destinationPath('dev/assets/js/pages/'+ this.pageSlug +'.js')
                    );
                }
            }
        },

        end: function() {
            if (this.config.get('hasAssemble')) {
                this.log(chalk.yellow('\n \n All done! \n \n'));
            }
        }

    });

})();
