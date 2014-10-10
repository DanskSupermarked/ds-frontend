describe('ds.utils.string(source:{string})', function() {

    describe('.startsWith(needle:{string})', function() {
        it('should be a success if string starts with', function() {
            expect(ds.utils.string('this is a test').startsWith('this')).to.be.true;
        });

        it('should be a failure if string does not start with', function() {
            expect(ds.utils.string('this is a test').startsWith('self')).to.be.false;
        });
    });

    describe('.stripTags()', function() {
        it('should strip tags from a strig', function() {
            expect(ds.utils.string('<body><a href="#" class="test">test</a></body>').stripTags()).to.equal('test');
        });
    });
});
