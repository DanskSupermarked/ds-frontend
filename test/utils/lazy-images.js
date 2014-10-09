describe('ds.utils.lazyImages', function() {

    it('should load images async with data-src', function(done) {
        var $img = $('<img data-src="test/lazy-images-tester.jpg" class="lazy" style="height:1px;width:1;margin:0;padding:0;position:absolute;">');

        $img.on('load', function() {
            expect($img.attr('src')).to.equal('test/lazy-images-tester.jpg');
            $img.remove();
            done();
        });
        $img.prependTo('body');
        expect($img.attr('src')).to.be.undefined;
        ds.utils.lazyImages.refresh();
    });

    it('should load images async with data-srcset', function(done) {
        var $img = $('<img data-srcset="test/lazy-images-tester.jpg" class="lazy" style="height:1px;width:1;margin:0;padding:0;position:absolute;">');
        $img.prependTo('body');
        expect($img.attr('src')).to.be.undefined;
        var checkSrcSet = function() {
            setTimeout(function() {
                if ($img.attr('srcset')) {
                    expect($img.attr('srcset')).to.equal('test/lazy-images-tester.jpg');
                    $img.remove();
                    done();
                } else {
                    checkSrcSet();
                }
            }, 0);
        };
        checkSrcSet();
        ds.utils.lazyImages.refresh();
    });

});
