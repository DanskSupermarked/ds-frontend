var expect = require('chai').expect;

describe('utils/string', function() {

    var string = require('../../scripts/utils/string');

    describe('#startsWith', function() {
        expect(string('this is a test').startsWith('this')).to.be.true;
        expect(string('this is a test').startsWith('self')).to.be.false;
    });

    describe('#stripTags', function() {
        expect(string('<body><a href="#" class="test">test</a></body>').stripTags()).to.equal('test');
    });
});
