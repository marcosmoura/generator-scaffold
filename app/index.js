(function () {

    'use strict';

    var util = require('util'),
        path = require('path'),
        slug = require('slug'),
        fs = require('fs'),
        yeoman = require('yeoman-generator'),
        chalk = require('chalk');

    var ScaffoldGenerator = module.exports = function ScaffoldGenerator(args, options, config) {
        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function () {
            this.installDependencies({
                skipInstall: options['skip-install']
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    };

    util.inherits(ScaffoldGenerator, yeoman.generators.Base);

    ScaffoldGenerator.prototype.askFor = function askFor() {
        var cb = this.async();

        this.log(chalk.cyan('\t \t [ Welcome to Scaffold Generator ] \n \n'));
        this.log(chalk.green('I will guide you to generate your best workflow. Come with me... \n \n'));

        var prompts = [{
                name: 'projectName',
                message: 'What is the name of your project?'
            }, {
                name: 'projectDescription',
                message: 'What is the description?'
            }, {
                name: 'projectMember',
                message: 'Which members involved in the project?'
            }];

        this.prompt(prompts, function (props) {
            for(var item in props) {
                this[item] = props[item];
            }

            cb();
        }.bind(this));
    };

    ScaffoldGenerator.prototype.getScaffold = function getScaffold() {
        var cb = this.async();

        this.log(chalk.green('\n \n Downloading scaffold'));
        this.tarball('https://github.com/marcosmoura/scaffold/archive/master.zip', '.', cb);
    };

    ScaffoldGenerator.prototype.processPackage = function processPackage() {
        var pkgPath = path.join(this.env.cwd, 'package.json'),
            pkg = JSON.parse(this.readFileAsString(pkgPath));

        pkg.projectName = this.projectName;
        pkg.name = slug(this.projectName).toLowerCase();
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
    };

    ScaffoldGenerator.prototype.processGruntFile = function processGruntFile() {

    };

})();
