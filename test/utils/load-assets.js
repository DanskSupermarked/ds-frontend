describe('ds.utils.loadAssets', function() {

    describe('.js([string])', function() {
        var script;

        after(function() {
            delete window.asyncLoadTester;
            $(script).remove();
        });

        it('should load a javasript asyncronously', function(done) {
            window.asyncLoadTester = done;
            script = ds.utils.loadAssets.js('test/async-js-load-tester.js');
        });
    });

    describe('.css([string])', function() {
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
            style = ds.utils.loadAssets.css('test/async-css-load-tester.css');
            var checkStyle = function() {
                setTimeout(function() {
                    if ($asycCssLoadTester.css('margin-top') === '10px') {
                        done();
                    } else {
                        checkStyle();
                    }
                }, 0);
            };
            checkStyle();
        });
    });

});
