(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        path = require('path'),
        gift = require('gift'),
        lodashOptions = {
            evaluate: /<#([\s\S]+?)#>/g,
            interpolate: /<#=([\s\S]+?)#>/g
        },
        hasComponent = function(component, components) {
            return components && components.indexOf(component) !== -1;
        };

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);
        },

        initTask: function() {
            this.log(chalk.cyan('\t \t  ___           __  __     _    _ '));
            this.log(chalk.cyan('\t \t / __| __ __ _ / _|/ _|___| |__| |'));
            this.log(chalk.cyan('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |'));
            this.log(chalk.cyan('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_| \n'));
            this.log(chalk.cyan('\t \t [ Welcome to Scaffold Generator ] \n \n'));
            this.log(chalk.green('I will guide you to generate your best workflow. Come with me... \n \n'));
        },

        promptTask: function() {
            var done = this.async(),
                choices = ['Mobile Only', 'Web Only', 'Responsive', 'Single Page', 'Single Page Mobile', 'Single Page Responsive'],
                prompts = [{
                    name: 'projectName',
                    message: 'What is the name of your project?',
                    validate: function(input) {
                        var done = this.async();

                        if (input.trim() === '') {
                            done('Hey dude! You forgot to enter the project name!');

                            return;
                        }

                        done(true);
                    }
                }, {
                    name: 'projectDescription',
                    message: 'What is the description?',
                    validate: function(input) {
                        var done = this.async();

                        if (input.trim() === '') {
                            done('You forgot the description. Write here.');

                            return;
                        }

                        done(true);
                    }
                }, {
                    name: 'projectMember',
                    message: 'What are people going to work on this project? (Separated by commas)',
                    validate: function(input) {
                        var done = this.async();

                        if (input.trim() === '') {
                            done('Hey man. Who will work with you on this? Write separating the names with commas.');

                            return;
                        }

                        done(true);
                    }
                }, {
                    type: 'list',
                    name: 'projectType',
                    message: 'What kind of project?',
                    choices: choices,
                    default: 0
                }, {
                    type: 'checkbox',
                    name: 'components',
                    message: 'What components do you like to include?',
                    choices: [{
                        name: 'Modernizr',
                        value: 'addModernizr',
                        checked: true
                    }, {
                        name: 'jQuery',
                        value: 'addjQuery',
                        checked: false
                    }, {
                        name: 'Angular',
                        value: 'addAngular',
                        checked: false
                    }]
                }, {
                    type: 'checkbox',
                    name: 'angularPackages',
                    message: 'What additional modules of Angular you want to include?',
                    when: function (answers) {
                        return hasComponent('addAngular', answers.components);
                    },
                    choices: [{
                        name: 'angular-animate',
                        value: 'angularAnimate',
                        checked: false
                    }, {
                        name: 'angular-cookies',
                        value: 'angularCookies',
                        checked: false
                    }, {
                        name: 'angular-loader',
                        value: 'angularLoader',
                        checked: false
                    }, {
                        name: 'angular-resource',
                        value: 'angularResource',
                        checked: false
                    }, {
                        name: 'angular-sanitize',
                        value: 'angularSanitize',
                        checked: false
                    }, {
                        name: 'angular-touch',
                        value: 'angularTouch',
                        checked: false
                    }, {
                        name: 'ui.router',
                        value: 'uiRouter',
                        checked: false
                    }]
                }, {
                    type: 'confirm',
                    name: 'hasGit',
                    message: 'Do you like to configure and init a git repository?',
                    default: 0
                }, {
                    name: 'gitUrl',
                    message: 'What is the git repository of the project? (Paste repository URL)',
                    when: function (answers) {
                        return answers.hasGit;
                    },
                    validate: function(input) {
                        var done = this.async();

                        if (input.trim() === '') {
                            done('Hey. Paste that URL dude!');

                            return;
                        }

                        done(true);
                    }
                }];

            this.prompt(prompts, function(answers) {
                var components = answers.components;

                for(var answer in answers) {
                    this[answer] = answers[answer];
                }

                this.hasAssemble = true;
                this.isSinglePage = false;
                this.needFastclick = false;
                this.createJs = false;

                switch (this.projectType) {
                    case choices[0]:
                        this.projectType = 'mobile';
                        this.needFastclick = true;
                        break;
                    case choices[1]:
                        this.projectType = 'web';
                        break;
                    case choices[2]:
                        this.projectType = 'responsive';
                        this.needFastclick = true;
                        break;
                    case choices[3]:
                        this.projectType = 'singlepage';
                        this.isSinglePage = true;
                        this.hasAssemble = false;
                        break;
                    case choices[4]:
                        this.projectType = 'singlepage-mobile';
                        this.needFastclick = true;
                        this.isSinglePage = true;
                        this.hasAssemble = false;
                        break;
                    case choices[5]:
                        this.projectType = 'singlepage-responsive';
                        this.needFastclick = true;
                        this.isSinglePage = true;
                        this.hasAssemble = false;
                        break;
                }

                this.addModernizr = hasComponent('addModernizr', components);
                this.addjQuery = hasComponent('addjQuery', components);
                this.addAngular = hasComponent('addAngular', components);

                var globals = {
                    Modernizr: this.addModernizr,
                    jQuery: this.addjQuery || this.addAngular,
                    angular: this.addAngular
                };

                this.globals = JSON.stringify(globals, null, 4);

                this.projectSlug = this._.slugify(this.projectName.toLowerCase());

                this.config.set({
                    'hasAssemble': this.hasAssemble
                });

                this.log(chalk.yellow(' \nGood! Now I will create and install everything you need. Time to take a coffee! \n \n'));

                done();
            }.bind(this));
        },

        corePath: function () {
            this.sourceRoot(path.join(__dirname, '../../templates/core/'));
        },

        core: function() {
            this.fs.copy(
                this.templatePath('grunt/**/*'),
                this.destinationPath('grunt')
            );
        },

        coreFiles: function() {
            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('gitattributes'),
                this.destinationPath('.gitattributes')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('htmlhintrc'),
                this.destinationPath('.htmlhintrc')
            );
            this.fs.copy(
                this.templatePath('jsbeautifyrc'),
                this.destinationPath('.jsbeautifyrc')
            );
            this.fs.copyTpl(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc'),
                this
            );
            this.fs.copyTpl(
                this.templatePath('GruntFile.js'),
                this.destinationPath('GruntFile.js'),
                this,
                lodashOptions
            );
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this
            );
        },

        bower: function() {
            var bower = {
                projectName: this.projectName,
                version: '0.0.0',
                name: this._.slugify(this.projectName.toLowerCase()),
                dependencies: {
                    'jquery': '~2.1.3',
                    'fastclick': '~1.0.3',
                    'modernizr': '~2.8.3',
                    'normalize-css': '~3.0.2'
                }
            };

            if (this.addAngular) {
                var components = this.angularPackages;

                bower.dependencies.angular = '~1.3.11';

                if (hasComponent('angularAnimate', components)) {
                    bower.dependencies['angular-animate'] = 'latest';
                }

                if (hasComponent('angularCookies', components)) {
                    bower.dependencies['angular-cookies'] = 'latest';
                }

                if (hasComponent('angularLoader', components)) {
                    bower.dependencies['angular-loader'] = 'latest';
                }

                if (hasComponent('angularResource', components)) {
                    bower.dependencies['angular-resource'] = 'latest';
                }

                if (hasComponent('angularSanitize', components)) {
                    bower.dependencies['angular-sanitize'] = 'latest';
                }

                if (hasComponent('angularTouch', components)) {
                    bower.dependencies['angular-touch'] = 'latest';
                }

                if (hasComponent('uiRouter', components)) {
                    bower.dependencies['angular-ui-router'] = 'latest';
                }
            } else {
                this.fs.delete(
                    this.destinationPath('options/ngAnnotate.js')
                );
            }

            if (!this.needFastclick) {
                delete bower.dependencies.fastclick;
            }

            if (!this.addjQuery || !this.addAngular) {
                delete bower.dependencies.jquery;
            }

            this.fs.write(
                this.destinationPath('bower.json'),
                JSON.stringify(bower, null, 2)
            );
        },

        grunt: function() {
            this.fs.delete(
                this.destinationPath('tasks/build.js')
            );
            this.fs.delete(
                this.destinationPath('tasks/default.js')
            );
            this.fs.delete(
                this.destinationPath('options/watch.js')
            );

            this.fs.copyTpl(
                this.templatePath('grunt/tasks/build.js'),
                this.destinationPath('grunt/tasks/build.js'),
                this
            );

            this.fs.copyTpl(
                this.templatePath('grunt/tasks/default.js'),
                this.destinationPath('grunt/tasks/default.js'),
                this
            );

            this.fs.copyTpl(
                this.templatePath('grunt/options/watch.js'),
                this.destinationPath('grunt/options/watch.js'),
                this,
                lodashOptions
            );
        },

        assemble: function() {
            if (this.isSinglePage) {
                this.fs.delete(
                    this.destinationPath('grunt/options/assemble.js')
                );
            }
        },

        modernizr: function() {
            if (!this.addModernizr) {
                this.fs.delete(
                    this.destinationPath('grunt/options/modernizr.js')
                );
            }
        },

        devPath: function () {
            this.sourceRoot(path.join(__dirname, '../../templates/', this.projectType));
        },

        dev: function() {
            this.mkdir('dev');

            if (this.hasAssemble) {
                this.mkdir('dev/partials');
            }
        },

        assets: function() {
            this.fs.copy(
                this.templatePath('../assets/**/*'),
                this.destinationPath('dev/assets')
            );
            this.mkdir('dev/assets/img');
        },

        less: function() {
            this.fs.copy(
                this.templatePath('assets/less/**/*'),
                this.destinationPath('dev/assets/less')
            );
            this.mkdir('dev/assets/less/components');
        },

        html: function() {
            if (this.hasAssemble) {
                this.fs.copyTpl(
                    this.templatePath('templates/default.html'),
                    this.destinationPath('dev/templates/default.html'),
                    this
                );
            }

            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('dev/index.html'),
                this
            );
        },

        install: {
            setupGit: function() {
                if (this.hasGit) {
                    var repository,
                        done = this.async();

                    this.log(chalk.yellow('\n \nConfiguring git repository and commiting Scaffold'));

                    gift.init('.', function(err, repo) {
                        this.log(chalk.green('  Init GIT repository'));

                        repository = repo;

                        repository.add('--all', function() {
                            this.log(chalk.green('  Adding all files'));

                            repository.commit('Add Scaffold', function() {
                                this.log(chalk.green('  Commiting'));

                                this.spawnCommand('git', ['remote', 'add', 'origin', this.gitUrl]).on('exit', function () {
                                    this.log(chalk.green('  Add origin remote'));
                                }.bind(this));

                                this.spawnCommand('git', ['config', 'credential.helper', 'store']).on('exit', function () {
                                    this.log(chalk.green('  Configuring credentials'));

                                    repository.remote_push('origin', 'master', function() {
                                        this.log(chalk.green('  Push commits'));
                                        done();
                                    }.bind(this));
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }
            },

            install: function() {
                this.installDependencies({ skipInstall: this.options.skipInstall });
            }
        },

        end: function() {
            var _this = this,
                glob = this.spawnCommand('npm', ['install', 'glob']);

            glob.on('exit', function() {
                _this.log(chalk.cyan(' \n \n \n All done and no errors! Enjoy! \n \n \n'));

                _this.spawnCommand('grunt', ['default']);
            });
        }

    });

})();
