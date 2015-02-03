(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        fs = require('fs'),
        path = require('path'),
        scaffold = {},
        mainPath = '',
        main = '';

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);

            scaffold = require('../../scaffold')(this);

            if (!this.config.get('hasAssemble')) {
                this.log(chalk.red('This sub generator won\'t work with a single file project. Aborting...'));

                process.exit();
            }
        },

        initializing: function() {
            scaffold.welcomeMessage('        Creating Page        ', 'This is a guide to create a new page for assemble template. It also include a less file.');
        },

        promptTask: function() {
            var done = this.async(),
                prompts = [{
                    name: 'projectName',
                    message: 'Page name:',
                    validate: function(input) {
                        scaffold.validatePrompt({
                            done: this.async(),
                            input: input,
                            message: 'Hey dude! You forgot to enter the page name!'
                        });
                    }
                }, {
                    name: 'projectDescription',
                    message: 'Page description:',
                    validate: function(input) {
                        scaffold.validatePrompt({
                            done: this.async(),
                            input: input,
                            message: 'Hey dude! You forgot to enter the project Description!'
                        });
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
        },

        html: function() {
            this.sourceRoot(path.join(__dirname, '../../templates/web'));

            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('dev/'+ this.pageSlug +'.html'),
                this
            );
        },

        css: function() {
            this.sourceRoot(path.join(__dirname, '../../templates/assets/less/pages'));

            this.fs.copy(
                this.templatePath('index.less'),
                this.destinationPath('dev/assets/less/pages/'+ this.pageSlug +'.less')
            );

            mainPath = this.destinationPath('dev/assets/less/main.less');

            main = this.fs.read(mainPath);
        },

        main: function() {
            fs.unlinkSync(mainPath);

            main += '@import \'pages/' + this.pageSlug +'\';\n';

            this.fs.write(mainPath, main);
        },

        js: function() {
            if (this.createJs) {
                this.sourceRoot(path.join(__dirname, '../../templates/assets/js'));

                this.fs.copy(
                    this.templatePath('main.js'),
                    this.destinationPath('dev/assets/js/pages/'+ this.pageSlug +'.js')
                );
            }
        },

        end: function() {
            this.log(chalk.yellow('\n \n All done! \n \n'));

            this.composeWith('scaffold:run');
        }

    });

})();
