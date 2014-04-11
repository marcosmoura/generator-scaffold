(function () {

    'use strict';

    var util = require('util'),
        path = require('path'),
        slug = require('slug'),
        fs = require('fs'),
        yeoman = require('yeoman-generator'),
        chalk = require('chalk');

    var ScaffoldGenerator = module.exports = function ScaffoldGenerator(args, options) {
        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function () {
            this.installDependencies({
                skipInstall: options['skip-install']
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    };

    util.inherits(ScaffoldGenerator, yeoman.generators.Base);

    ScaffoldGenerator.prototype.init = function init () {
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

    ScaffoldGenerator.prototype.askFor = function askFor () {
        var cb = this.async();

        var projectNamePrompt = [{
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: function(input) {
                var done = this.async();

                if (input.trim() === '') {
                    done('You need to provide a name for your project');

                    return;
                }

                done(true);
            }
        }];

        this.prompt(projectNamePrompt, function (props) {
            this.projectName = props.projectName;

            cb();
        }.bind(this));

        var projectDescriptionPrompt = [{
            name: 'projectDescription',
            message: 'What is the description?',
            validate: function(input) {
                var done = this.async();

                if (input.trim() === '') {
                    done('You need to provide a description');

                    return;
                }

                done(true);
            }
        }];

        this.prompt(projectDescriptionPrompt, function (props) {
            this.projectDescription = props.projectDescription;

            cb();
        }.bind(this));

        var projectMemberPrompt = [{
            name: 'projectMember',
            message: 'Which members involved in the project?',
            validate: function(input) {
                var done = this.async();

                if (input.trim() === '') {
                    done('You need to provide which members');

                    return;
                }

                done(true);
            }
        }];

        this.prompt(projectMemberPrompt, function (props) {
            this.projectMember = props.projectMember;

            cb();
        }.bind(this));

        var projectTypePrompt = [{
            type: 'list',
            name: 'projectType',
            message: 'What kind of project?',
            choices: ['Web Only', 'Mobile Only', 'Responsive', 'Wordpress'],
            default: 0
        }];

        this.prompt(projectTypePrompt, function (props) {
            this.projectType = props.projectType;

            cb();
        }.bind(this));
    };

    ScaffoldGenerator.prototype.getScaffoldCore = function getScaffoldCore () {
        var cb = this.async();

        this.log(chalk.green('\n \n Downloading core of scaffold'));
        this.tarball('https://github.com/marcosmoura/scaffold/archive/v2.zip', '.', cb);
    };

    ScaffoldGenerator.prototype.processPackage = function processPackage () {
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

        fs.unlink(pkgPath);

        this.write(pkgPath, JSON.stringify(pkg, null, 2));

        cb();
    };

    ScaffoldGenerator.prototype.processGruntFile = function processGruntFile () {
        var cb = this.async();
        //var tasksPath = path.join(this.env.cwd, 'grunt/options');

        if (this.projectType === 'Mobile Only') {
            this.log(chalk.green('\n \n Downloading mobile version'));
            this.tarball('https://github.com/marcosmoura/scaffold-mobile/archive/master.zip', 'dev/', cb);
        } else if (this.projectType === 'Web Only') {
            this.log(chalk.green('\n \n Downloading web version'));
            this.tarball('https://github.com/marcosmoura/scaffold-web/archive/master.zip', 'dev/', cb);
        } else if (this.projectType === 'Responsive') {
            this.log(chalk.green('\n \n Downloading responsive version'));
            this.tarball('https://github.com/marcosmoura/scaffold-mobile/archive/master.zip', 'dev/', cb);
        }
    };

    ScaffoldGenerator.prototype.garbageRemoval = function garbageRemoval () {
        var cb = this.async(),
            devPath = path.join(this.env.cwd, 'dev');

        fs.unlink(path.join(devPath, 'LICENSE'));
        fs.unlink(path.join(devPath, 'README.md'));

        cb();
    };

})();
