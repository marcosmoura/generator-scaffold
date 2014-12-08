(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        path = require('path'),
        fs = require('fs'),
        gift = require('gift');

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);

            this.baseDestPath = this.dest._base;
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
            var cb = this.async(),
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

                function hasComponent(component) {
                    return components && components.indexOf(component) !== -1;
                }

                for(var answer in answers) {
                    this[answer] = answers[answer];
                }

                this.hasAssemble = true;
                this.isSinglePage = false;

                switch (this.projectType) {
                    case choices[0]:
                        this.projectType = 'mobile';
                        break;
                    case choices[1]:
                        this.projectType = 'web';
                        break;
                    case choices[2]:
                        this.projectType = 'responsive';
                        break;
                    case choices[3]:
                        this.projectType = 'singlepage';
                        this.isSinglePage = true;
                        this.hasAssemble = false;
                        break;
                    case choices[4]:
                        this.projectType = 'singlepage-mobile';
                        this.isSinglePage = true;
                        this.hasAssemble = false;
                        break;
                    case choices[5]:
                        this.projectType = 'singlepage-responsive';
                        this.isSinglePage = true;
                        this.hasAssemble = false;
                        break;
                }

                this.addModernizr = hasComponent('addModernizr');
                this.addjQuery = hasComponent('addjQuery');

                this.projectSlug = this._.slugify(this.projectName.toLowerCase());

                this.log(chalk.yellow(' \nGood! Now I will download everything you need. Time to take a coffee! \n \n'));

                cb();
            }.bind(this));
        },

        corePath: function () {
            this.sourceRoot(path.join(__dirname, '../../templates/core/'));
        },

        core: function() {
            this.directory('grunt', 'grunt');
        },

        coreFiles: function() {
            this.copy('bowerrc', '.bowerrc');
            this.copy('editorconfig', '.editorconfig');
            this.copy('gitattributes', '.gitattributes');
            this.copy('gitignore', '.gitignore');
            this.copy('htmlhintrc', '.htmlhintrc');
            this.copy('jsbeautifyrc', '.jsbeautifyrc');
            this.copy('jshintrc', '.jshintrc');
            this.copy('GruntFile.js', 'GruntFile.js');
            this.template('_package.json', 'package.json');
        },

        bower: function() {
            var bower = {
                projectName: this.projectName,
                version: '0.0.0',
                name: this._.slugify(this.projectName.toLowerCase()),
                dependencies: {
                    'jquery': '~2.1.1',
                    'fastclick': '~1.0.2',
                    'modernizr': '~2.8.3',
                    'normalize-css': '~3.0.1'
                }
            };

            if (this.projectType === 'Web Only' || this.projectType === 'Single Page') {
                delete bower.dependencies.fastclick;
            }

            if (!this.addjQuery) {
                delete bower.dependencies.jquery;
            }

            this.dest.write('bower.json', JSON.stringify(bower, null, 2));
        },

        assemble: function() {
            var gruntPath = path.join(this.env.cwd, 'grunt/options');

            if (this.isSinglePage) {
                fs.unlinkSync(path.join(gruntPath, 'assemble.js'));
            }
        },

        grunt: function() {
            var gruntPath = path.join(this.env.cwd, 'grunt');

            fs.unlinkSync(path.join(gruntPath, 'tasks/build.js'));
            fs.unlinkSync(path.join(gruntPath, 'tasks/default.js'));
            fs.unlinkSync(path.join(gruntPath, 'options/watch.js'));

            this.template('grunt/tasks/build.js', 'grunt/tasks/build.js');
            this.template('grunt/tasks/default.js', 'grunt/tasks/default.js');
            this.template('grunt/options/watch.js', 'grunt/options/watch.js');
        },

        devPath: function () {
            this.sourceRoot(path.join(__dirname, '../../templates/', this.projectType));
        },

        dev: function() {
            this.mkdir('dev');
            this.mkdir('dev/partials');
        },

        assets: function() {
            this.directory('assets', 'dev/assets');
            this.mkdir('dev/assets/img');
            this.mkdir('dev/assets/less/components');
        },

        less: function() {
            this.directory('../less', 'dev/assets/less/lib');
        },

        html: function() {
            if (this.hasAssemble) {
                this.template('templates/default.html', 'dev/templates/default.html');
                this.template('index.html', 'dev/index.html');
            } else {
                this.template('index.html', 'dev/index.html');
            }
        },

        setupGitTask: function() {
            if (this.hasGit) {
                var repository,
                    done = this.async();

                this.log(chalk.yellow('\n \nConfiguring the git repository and commiting Scaffold'));

                gift.init('.', function(err, _repo) {
                    this.log(chalk.green('  Init GIT repository'));

                    repository = _repo;

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

        installTask: function() {
            var _this = this;

            this.on('end', function() {
                this.installDependencies({
                    skipInstall: _this.options.skipInstall,
                    callback: function() {
                        var command = _this.spawnCommand('npm', ['install', 'glob']);

                        command.on('exit', function() {
                            _this.log(chalk.cyan(' \n \n All done and no errors! Enjoy! \n \n'));

                            _this.spawnCommand('grunt', ['default']);
                        });
                    }
                });
            });
        }

    });

})();
