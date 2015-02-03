(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        scaffold = {};

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);

            scaffold = require('../../scaffold')(this);
        },

        initializing: function() {
            scaffold.welcomeMessage('       Running project      ', 'Starting development mode. I will start a server with BrowserSync support. :)');
        },

        install: function() {
            var done = this.async();

            this.spawnCommand('grunt', ['default']).on('exit', done);
        },

        end: function() {
            this.log(chalk.yellow('\n \n All done! Everything looks fine. Good job! \n \n'));
        }

    });

})();
