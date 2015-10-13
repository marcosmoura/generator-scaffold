/*global describe, beforeEach */

import path from 'path';
import { test as helpers } from 'yeoman-generator';

describe('scaffold generator', () => {
    let self = this;

    this.timeout(15000);

    beforeEach((done) => {
        helpers.testDirectory(path.join(__dirname, 'temp'), (error) => {
            if (error) {
                return done(error);
            }

            self.app = helpers.createGenerator('scaffold:app', ['../../app']);

            done();
        });
    });
});
