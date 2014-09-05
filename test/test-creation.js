/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('scaffold generator', function () {
  this.timeout(15000);

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('scaffold:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });
});
