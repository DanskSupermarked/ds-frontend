describe('ds.utils.loadGoogleMapsAPI()', function() {
    this.timeout(20000);

    it('should load google maps api', function(done) {
        ds.utils.loadGoogleMapsAPI().done(function(google) {
            expect(google).to.be.an('object');
            done();
        });
    });

    it('should not make a http request second time google is requested', function(done) {
        var start = new Date().getTime();
        ds.utils.loadGoogleMapsAPI().done(function() {
            var elapsed = new Date().getTime() - start;
            expect(elapsed).to.be.lessThan(10);
            done();
        });
    });
});
