/*global describe, it */

import assert from 'assert';

describe('scaffold generator', () => {
    it('can be imported without blowing up', () => {
        let app = require('../app');

        assert(app !== undefined);
    });
});
