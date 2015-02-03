(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        scaffold = {};

    module.exports = yeoman.generators.Base.extend({

        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);

            this.option('skip-welcome');

            scaffold = require('../../scaffold')(this);
        },

        initializing: function() {
            if (!this.options['skip-welcome']) {
                scaffold.welcomeMessage('     Install Dependencies    ', 'I will install all NPM and Bower dependencies. This may take a while. Go grab a coffee!');
            }
        },

        install: function() {
            this.installDependencies({ skipInstall: this.options.skipInstall });
        },

        end: function() {
            var _this = this,
                glob = this.spawnCommand('npm', ['install', 'glob']);

            glob.on('exit', function() {
                _this.log(chalk.cyan(' \n \n All done and no errors! Enjoy! \n \n'));

                this.composeWith('scaffold:run', {
                    options: {
                        'skip-welcome': true
                    }
                });
            });
        }

    });

})();
