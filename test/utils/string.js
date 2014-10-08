describe('ds.utils.string([string])', function() {

    var string = window.ds.utils.string;

    describe('.startsWith([string])', function() {
        it('should be a success if string starts with', function() {
            expect(string('this is a test').startsWith('this')).to.be.true;
        });

        it('should be a failure if string does not start with', function() {
            expect(string('this is a test').startsWith('self')).to.be.false;
        });
    });

    describe('.stripTags()', function() {
        it('should strip tags from a strig', function() {
            expect(string('<body><a href="#" class="test">test</a></body>').stripTags()).to.equal('test');
        });
    });
});
