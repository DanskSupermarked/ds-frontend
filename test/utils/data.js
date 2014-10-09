describe('ds.utils.data([string])', function() {

    var content = {
        key: 'content'
    };
    before(function() {
        $('body').data('category', content);
        ds.utils.data.refresh();
    });

    describe('.get([string])', function() {
        it('should return the content of an existing data', function() {
            expect(ds.utils.data('category').get('key')).to.equal(content.key);
        });
        it('should return an error string for non-existing data', function() {
            expect(ds.utils.data('category').get('missingkey')).to.equal('{category: missingkey}');
        });
    });

    describe('.get([string], true)', function() {
        it('should return undefined for non-existing data', function() {
            expect(ds.utils.data('category').get('missingkey', true)).to.be.undefined;
        });
    });
});
