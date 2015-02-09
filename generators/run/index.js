(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        scaffold = {};

    module.exports = yeoman.generators.Base.extend({

        constructor: function() {
            yeoman.generators.Base.apply(this, arguments);

            this.option('skip-welcome');

            this.argument('runType', {
                type: String,
                required: false
            });

            scaffold = require('../../scaffold')(this);
        },

        initializing: function() {
            if (!this.options['skip-welcome']) {
                scaffold.welcomeMessage('       Running project       ', 'Starting development mode. I will start a server with BrowserSync support. :)');
            }
        },

        install: function() {
            var done = this.async();

            if (typeof this.runType !== 'undefined' && this.runType.toLowerCase() === 'build') {
                this.spawnCommand('grunt', ['serve']).on('exit', done);

                return false;
            }

            this.spawnCommand('grunt', ['default']).on('exit', done);
        },

        end: function() {
            scaffold.log('\n \n All done! Everything looks fine. Good job! \n \n', 'yellow');
        }

    });

})();
