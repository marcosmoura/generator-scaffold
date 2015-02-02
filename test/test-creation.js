/*global describe, beforeEach */

'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test;

describe('scaffold generator', function() {
    this.timeout(15000);

    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function(error) {
            if (error) {
                return done(error);
            }

            this.app = helpers.createGenerator('scaffold:app', ['../../app']);

            done();
        }.bind(this));
    });
});
