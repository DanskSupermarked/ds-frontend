var expect = require('chai').expect;

describe('Test framework', function() {

    var testFramework = require('../scripts/_test-framework');

    it('should always work', function() {
        expect(testFramework).to.be.true;
    });

});
