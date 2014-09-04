(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        path = require('path'),
        fs = require('fs'),
        esformatter = require('esformatter'),
        esOptions = {
            indent: {
                value: '    '
            },
            lineBreak: {
                after: {
                    'ArrayExpressionComma' : 1
                }
            }
        },
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
                    choices: ['Mobile Only', 'Web Only', 'Responsive', 'Single Page', 'Single Page Mobile'],
                    default: 0
                }, {
                    type: 'confirm',
                    name: 'jquery',
                    message: 'Want to include jQuery?',
                    default: 0
                }, {
                    type: 'confirm',
                    name: 'configGit',
                    message: 'Do you like to configure and init a git repository?',
                    default: 0
                }, {
                    name: 'gitUrl',
                    message: 'What is the git repository of the project? (Paste repository URL)',
                    when: function (answers) {
                        return answers.configGit;
                    },
                    validate: function(input) {
                        var done = this.async();

                        if (input.trim() === '') {
                            done('Hey. Paste that URL dude!');

                            return;
                        }

                        done(true);
                    }
                }, {
                    name: 'gitUser',
                    message: 'What is your git username?',
                    when: function (answers) {
                        return answers.configGit;
                    },
                    validate: function(input) {
                        var done = this.async();

                        if (input.trim() === '') {
                            done('What is your username?');

                            return;
                        }

                        done(true);
                    }
                }];

            this.prompt(prompts, function(props) {
                for(var item in props) {
                    this[item] = props[item];
                }

                this.log(chalk.yellow(' \nGood! Now I will download everything you need. Time to take a coffee! \n \n'));

                cb();
            }.bind(this));
        },
        scaffoldCoreTask: function() {
            var done = this.async();

            this.log(chalk.yellow('\n \n Downloading core of scaffold'));
            this.remote('marcosmoura', 'scaffold', function(err, remote) {
                remote.directory('.', '.');

                done();
            });
        },
        scaffoldVersionTask: function() {
            var done = this.async(),
                repository = '',
                message = '';

            if (this.projectType === 'Mobile Only') {
                message = '\n \n Downloading Mobile version';
                repository = 'scaffold-mobile';
            } else if (this.projectType === 'Web Only') {
                message = '\n \n Downloading Web version';
                repository = 'scaffold-web';
            } else if (this.projectType === 'Responsive') {
                message = '\n \n Downloading Responsive version';
                repository = 'scaffold-responsive';
            } else if (this.projectType === 'Single Page') {
                message = '\n \n Downloading Single Page version';
                repository = 'scaffold-singlepage';
            } else if (this.projectType === 'Single Page Mobile') {
                message = '\n \n Downloading Single Page mobile version';
                repository = 'scaffold-singlepage-mobile';
            }

            this.log(chalk.yellow(message));
            this.remote('marcosmoura', repository, function(err, remote) {
                remote.directory('.', 'dev/');

                done();
            });
        },
        processPackageTask: function() {
            var pkgPath = path.join(this.env.cwd, 'package.json'),
                pkg = JSON.parse(this.readFileAsString(pkgPath));

            this.log(chalk.yellow('\n \n Creating the necessary files'));

            pkg.projectName = this.projectName;
            pkg.version = '0.0.0';
            pkg.name = this._.slugify(this.projectName.toLowerCase());
            pkg.description = this.projectDescription;
            pkg.developers = this.projectMember;
            pkg.repository.url = this.gitUrl;

            var dev = this.projectMember.split(','),
                devList = [];

            for(var member in dev) {
                devList.push({
                    'name': dev[member].trim()
                });
            }

            pkg.author = devList;

            fs.unlinkSync(pkgPath);

            this.write(pkgPath, JSON.stringify(pkg, null, 2));
        },
        processBowerTask: function() {
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

            if (!this.jquery) {
                delete bower.dependencies.jquery;
            }

            fs.unlinkSync(path.join(this.baseDestPath, 'bower.json'));

            this.dest.write('bower.json', JSON.stringify(bower, null, 2));
        },
        processGruntTask: function() {
            var gruntPath = path.join(this.env.cwd, 'grunt');

            if (this.projectType === 'Single Page' || this.projectType === 'Single Page Mobile') {
                var buildTask = path.join(gruntPath, 'tasks/build.js'),
                    build = this.readFileAsString(buildTask),
                    stagingTask = path.join(gruntPath, 'tasks/default.js'),
                    staging = this.readFileAsString(stagingTask),
                    watchOption = path.join(gruntPath, 'options/watch.js'),
                    watch = this.readFileAsString(watchOption);

                build = build.replace('\'assemble:build\',', '');
                build = build.replace('\'clean:build\',', '\'clean:build\', \'copy:buildHtml\',');
                fs.unlinkSync(buildTask);
                this.write(buildTask, esformatter.format(build, esOptions));

                staging = staging.replace('\'assemble:staging\',', '\'newer:copy:stagingHtml\',');
                fs.unlinkSync(stagingTask);
                this.write(stagingTask, esformatter.format(staging, esOptions));

                watch = watch.replace('\'newer:assemble:staging\',', '\'newer:copy:stagingHtml\',');
                fs.unlinkSync(watchOption);
                this.write(watchOption, esformatter.format(watch, esOptions));

                fs.unlinkSync(path.join(gruntPath, 'options/assemble.js'));
            }
        },
        removeGarbageTask: function() {
            var devPath = path.join(this.env.cwd, 'dev');

            this.log(chalk.yellow('\n \n Removing garbage and temporary files'));

            fs.unlinkSync(path.join(devPath, 'LICENSE'));
            fs.unlinkSync(path.join(devPath, 'README.md'));
        },
        setupGitTask: function() {
            if (this.configGit) {
                var repository;

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

                            _this.spawnCommand('grunt');
                        });
                    }
                });
            });
        }
    });

})();
