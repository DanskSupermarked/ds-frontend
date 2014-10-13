/**
 * Lazy load images with class 'lazy'.
 */
(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.lazyImages = factory(root.jQuery);
    }
}(this, function($) {
    var exports = {};

    // Percent under bottom of screen images is loaded. A value of 0 will load
    // images when they are within visible area of window.
    var OFFSET_PERCENT = 1;

    var queued = false;
    var $lazyImages;
    var $document = $(document);
    var $window = $(window);

    var loadImgSrc = function($img) {
        if ($img.data('srcset')) {
            $img.attr('srcset', $img.data('srcset'));
        } else if ($img.data('src')) {
            $img.attr('src', $img.data('src'));
        }
    };

    var checkForLazyImages = function(delay) {

        if (isNaN(delay)) {
            delay = 50;
        }

        // Avoid continuous scroll events
        if (queued) {
            return;
        }
        queued = true;
        setTimeout(function() {

            // Get nodes to animate
            if (!$lazyImages) {
                $lazyImages = $('img.lazy');
            }

            // Remove lazy class if scroll position is reached
            var scrollBottom = $document.scrollTop() + ($window.height() * (1 + OFFSET_PERCENT));
            $lazyImages.each(function() {
                var $lazyImage = $(this);
                if (scrollBottom > $lazyImage.offset().top) {
                    loadImgSrc($lazyImage);
                    $lazyImage.removeClass('lazy');
                }
            });

            $lazyImages = $('img.lazy');

            // Remove scroll listener when there is no more nodes to animate
            if ($lazyImages.length === 0) {
                $window.off('scroll', checkForLazyImages);
                $window.off('resize', checkForLazyImages);
            }
            queued = false;
        }, delay);
    };

    $window.on('scroll', checkForLazyImages);
    $window.on('resize', checkForLazyImages);
    $(function() {
        checkForLazyImages(0);
    });

    /**
     * Refresh list of lazy loaded images. Used if images are placed in dom async with ajax.
     * @return        {void}
     */
    exports.refresh = function() {
        $lazyImages = $('img.lazy');
        checkForLazyImages(0);
    };

    return exports;
}));
