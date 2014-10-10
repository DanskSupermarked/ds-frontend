describe('ds.utils.responsiveClasses', function() {
    var style;

    before(function(done) {
        style = ds.utils.loadAssets.css('test/assets/ds.utils.responsive-classes.css', done);
    });

    after(function() {
        $(style).remove();
    });
    describe('.init()', function() {

        it('sould emit an event when is-media is set/changed', function(done) {
            ds.utils.responsiveClasses.on('media:changed', done);
            ds.utils.responsiveClasses.init();
        });

        it('should set a class on the html tag based on content in body:after', function() {
            ds.utils.responsiveClasses.init();
            expect($('html').attr('class')).to.contain('is-media-test');
        });

    });
});
