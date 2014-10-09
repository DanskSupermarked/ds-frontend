describe('ds.VERSION', function() {
    it('should give the latest version of the library', function(done) {
        $.getJSON('package.json', function(pkg) {
            expect(ds.VERSION).to.equal(pkg.version);
            done();
        });
    });
});
