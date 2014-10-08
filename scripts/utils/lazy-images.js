/**
 * Lazy load images with class 'lazy'.
 */

// Dependencies
var $ = require('jquery');

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
    } else if ($img.data('srcset')) {
        $img.attr('src', $img.data('src'));
    }
};

var checkForLazyImages = function() {

    // Avoid continuous scroll events
    if (queued) {
        return;
    }
    queued = true;
    window.setTimeout(function() {

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
    }, 50);
};

$window.on('scroll', checkForLazyImages);
$window.on('resize', checkForLazyImages);
$(checkForLazyImages);

/**
 * Refresh list of lazy loaded images. Used if images are placed in dom async with ajax.
 * @return        {void}
 */
module.exports.refresh = function() {
    $lazyImages = $('img.lazy');
    checkForLazyImages();
};
