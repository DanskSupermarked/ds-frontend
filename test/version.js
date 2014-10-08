describe('ds.VERSION', function() {

    var version = window.ds.VERSION;

    it('should give the latest version of the library', function() {
        expect(version).to.equal('0.1.1');
    });

});
