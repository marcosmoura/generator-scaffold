(function() {

    'use strict';

    var util = require('util'),
        path = require('path'),
        slug = require('slug'),
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
        fs = require('fs'),
        yeoman = require('yeoman-generator'),
        chalk = require('chalk');

    var ScaffoldGenerator = module.exports = function ScaffoldGenerator(args, options) {
        var _this = this;

        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function() {
            this.installDependencies({
                skipInstall: options.skipInstall,
                callback: function() {
                    var command = _this.spawnCommand('npm', ['install', 'glob']);

                    command.on('exit', function() {
                        _this.log(chalk.cyan(' \n \n All done and no errors! Enjoy! \n \n'));

                        _this.spawnCommand('grunt');
                    });
                }
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    };

    util.inherits(ScaffoldGenerator, yeoman.generators.Base);

    ScaffoldGenerator.prototype.init = function init() {
        var cb = this.async();

        this.log(chalk.cyan('\t \t  ___           __  __     _    _ '));
        this.log(chalk.cyan('\t \t / __| __ __ _ / _|/ _|___| |__| |'));
        this.log(chalk.cyan('\t \t \\__ \\/ _/ _` |  _|  _/ _ \\ / _` |'));
        this.log(chalk.cyan('\t \t |___/\\__\\__,_|_| |_| \\___/_\\__,_|'));

        this.log('\n');

        this.log(chalk.cyan('\t \t [ Welcome to Scaffold Generator ] \n \n'));
        this.log(chalk.green('I will guide you to generate your best workflow. Come with me... \n \n'));

        cb();
    };

    ScaffoldGenerator.prototype.askFor = function askFor() {
        var cb = this.async(),
            attempts = {
                name: 0,
                description: 0,
                members: 0
            },
            prompts = [{
                name: 'projectName',
                message: 'What is the name of your project?',
                validate: function(input) {
                    var done = this.async();

                    if (input.trim() === '') {
                        if (attempts.name === 0) {
                            attempts.name = 1;
                            done('Hey dude! You forgot to enter the project name!');
                        } else if (attempts.name === 1) {
                            attempts.name = 2;

                            done('Come on. Just write the name of the project.');
                        } else if (attempts.name === 2) {
                            attempts.name = 3;

                            done('Alright. No problem. I\'ll wait here.');
                        } else if (attempts.name === 3) {
                            attempts.name = 4;

                            done('Come on buddy! Write that name. NOW!');
                        } else {
                            done('Ok! :(');
                        }

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
                        if (attempts.name > 0) {
                            done('You also forgot the description.');
                        } else {
                            if (attempts.description === 0) {
                                attempts.description = 1;

                                done('You forgot the description. Write here.');
                            } else if (attempts.description === 1) {
                                done('You forgot the description again! Just write.');
                            }
                        }

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
                        if (attempts.name > 0 && attempts.description > 0) {
                            done('Forgot again? :/ Who will work with you on this? Write separating the names with commas.');
                        } else {
                            if (attempts.members === 0) {
                                attempts.members = 1;

                                done('Hey man. Who will work with you on this? Write separating the names with commas.');
                            } else if (attempts.members === 1) {
                                done('Type the name of who will work with you, separated by commas.');
                            }
                        }

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
            }];

        this.prompt(prompts, function(props) {
            for(var item in props) {
                this[item] = props[item];
            }

            this.log(chalk.yellow(' \n \n Good! Now I will download everything you need. Time to take a coffee! \n \n'));

            cb();
        }.bind(this));
    };

    ScaffoldGenerator.prototype.getScaffoldCore = function getScaffoldCore() {
        var cb = this.async();

        this.log(chalk.green('\n \n Downloading core of scaffold'));
        this.tarball('https://github.com/marcosmoura/scaffold/archive/v2.zip', '.', cb);
    };

    ScaffoldGenerator.prototype.processPackage = function processPackage() {
        var cb = this.async(),
            pkgPath = path.join(this.env.cwd, 'package.json'),
            pkg = JSON.parse(this.readFileAsString(pkgPath));

        pkg.projectName = this.projectName;
        pkg.name = slug(this.projectName.toLowerCase());
        pkg.description = this.projectDescription;
        pkg.developers = this.projectMember;

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

        cb();
    };

    ScaffoldGenerator.prototype.processBower = function processBower() {
        var cb = this.async(),
            bowerJson = path.join(this.env.cwd, 'bower.json'),
            bower = JSON.parse(this.readFileAsString(bowerJson));

        if (this.projectType === 'Web Only') {
            delete bower.dependencies.fastclick;
        }

        if (!this.jquery) {
            delete bower.dependencies.jquery;
        }

        fs.unlinkSync(bowerJson);

        this.write(bowerJson, JSON.stringify(bower, null, 2));

        cb();
    };

    ScaffoldGenerator.prototype.processGruntOptions = function processGruntOptions() {
        var cb = this.async(),
            gruntPath = path.join(this.env.cwd, 'grunt');

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

        cb();
    };

    ScaffoldGenerator.prototype.getScaffoldVersion = function getScaffoldVersion() {
        var cb = this.async();

        if (this.projectType === 'Mobile Only') {
            this.log(chalk.green('\n \n Downloading Mobile version'));
            this.tarball('https://github.com/marcosmoura/scaffold-mobile/archive/master.zip', 'dev/', cb);
        } else if (this.projectType === 'Web Only') {
            this.log(chalk.green('\n \n Downloading Web version'));
            this.tarball('https://github.com/marcosmoura/scaffold-web/archive/master.zip', 'dev/', cb);
        } else if (this.projectType === 'Responsive') {
            this.log(chalk.green('\n \n Downloading Responsive version'));
            this.tarball('https://github.com/marcosmoura/scaffold-responsive/archive/master.zip', 'dev/', cb);
        } else if (this.projectType === 'Single Page') {
            this.log(chalk.green('\n \n Downloading Single Page version'));
            this.tarball('https://github.com/marcosmoura/scaffold-singlepage/archive/master.zip', 'dev/', cb);
        } else if (this.projectType === 'Single Page Mobile') {
            this.log(chalk.green('\n \n Downloading Single Page mobile version'));
            this.tarball('https://github.com/marcosmoura/scaffold-singlepage-mobile/archive/master.zip', 'dev/', cb);
        }
    };

    ScaffoldGenerator.prototype.garbageRemoval = function garbageRemoval() {
        var cb = this.async(),
            devPath = path.join(this.env.cwd, 'dev');

        this.log(chalk.yellow('\n \n Removing garbage and temporary files'));

        fs.unlinkSync(path.join(devPath, 'LICENSE'));
        fs.unlinkSync(path.join(devPath, 'README.md'));

        this.log(chalk.green('\n \n Now I will install the dependencies. This may take a while. Time to go to the bathroom! \n \n '));

        cb();
    };

})();
