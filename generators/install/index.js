(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        scaffold = {};

    module.exports = yeoman.generators.Base.extend({

        constructor: function() {
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
            var yo = this,
                installGlob = yo.spawnCommand('npm', ['install', 'glob']);

            installGlob.on('exit', function() {
                scaffold.log(' \n \n All done and no errors! Enjoy! \n \n', 'cyan');

                yo.composeWith('scaffold:run', {
                    options: {
                        'skip-welcome': true
                    }
                });
            });
        }

    });

})();
