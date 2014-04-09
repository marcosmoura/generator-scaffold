(function () {

    'use strict';

    var util = require('util'),
        path = require('path'),
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

    ScaffoldGenerator.prototype.projectfiles = function projectfiles() {
        this.copy('_editorconfig', '.editorconfig');
        this.copy('_jshintrc', '.jshintrc');
        this.copy('_bowerrc', '.bowerrc');
    };

    ScaffoldGenerator.prototype.copyScaffold = function copyScaffold() {
        var cb = this.async();

        this.log.writeln('Downloading version ' + this.version + ' of Ghost');
        this.tarball('https://github.com/marcosmoura/scaffold/archive/master.zip', '.', cb);
    };

})();
