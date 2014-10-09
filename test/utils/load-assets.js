describe('ds.utils.loadAssets', function() {

    describe('.js([string])', function() {
        it('should load a javasript asyncronously', function(done) {
            window.asyncLoadTester = function() {
                delete window.asyncLoadTester;
                done();
            };
            ds.utils.loadAssets.js('test/async-js-load-tester.js');
        });
    });

    describe('.css([string])', function() {
        it('should load css asyncronously', function(done) {
            var $asycCssLoadTester = $('<div id="async-css-load-tester">');
            $asycCssLoadTester.appendTo('body');
            ds.utils.loadAssets.css('test/async-css-load-tester.css');
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
