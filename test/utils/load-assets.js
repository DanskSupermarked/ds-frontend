describe('ds.utils.loadAssets', function() {

    describe('.js(source:{string}, [callback:{function}])', function() {
        var script;

        after(function() {
            delete window.asyncLoadTester;
            $(script).remove();
        });

        it('should load a javasript asyncronously', function(done) {
            var called = false;
            window.asyncLoadTester = function() {
                called = true;
            };
            script = ds.utils.loadAssets.js('test/assets/ds.utils.load-assets.js.js', function() {
                expect(called).to.be.true;
                done();
            });
        });
    });

    describe('.css(href:{string})', function() {
        var style;
        var $asycCssLoadTester;

        before(function() {
            $asycCssLoadTester = $('<div id="async-css-load-tester">');
            $asycCssLoadTester.appendTo('body');
        });

        after(function() {
            $(style).remove();
            $asycCssLoadTester.remove();
        });

        it('should load css asyncronously', function(done) {
            ds.utils.loadAssets.css('test/assets/ds.utils.load-assets.css.css', function() {
                expect($asycCssLoadTester.css('margin-top')).to.equal('10px');
                done();
            });
        });
    });

});
