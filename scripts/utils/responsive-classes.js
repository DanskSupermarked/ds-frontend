/**
 * Add classes to html when reaching breakpoints.
 * This is dependent of the media.less tool.
 *
 * Eg. <html class="is-media-md">
 *
 * Available javascript methods:
 * #.init() // Start module
 *
 * #.isXs() // (bool) is md mode
 * #.isSm() // (bool) is sm mode
 * #.isMd() // (bool) is md mode
 * #.isLg() // (bool) is lg mode
 *
 * #.isGtXs() // (bool) is sm, md or lg mode
 * #.isGtSm() // (bool) is md or lg mode
 *
 * #.isLtLg() // (bool) is xs, sm or md mode
 * #.isLtSm() // (bool) is xs or sm mode
 *
 * #.on('media:changed', function() {}); // Event fired whenever the mode changes
 *
 * Use in javascript:
 *
 * var respClasses = require('../utils/responsive-classes');
 * respClasses.on('media:changed', function() {
 *    if (respClasses.isLtLg()) {
 *        // Do some magic
 *    }
 * });
 *
 * if (respClasses.isMd()) {
 *    // Magic for md mode
 * }
 *
 * if (respClasses.isGtXs()) {
 *    // Magic for all modes above xs
 * }
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        exports = factory(require('jquery'), require('lodash'), require('events').EventEmitter);
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.responsiveClasses = factory(root.jQuery, root._, root.EventEmitter);
    }
}(this, function($, _, EventEmitter) {

    // Variables
    var responsiveMode;
    var $html = $('html');
    var delay;
    var exports = new EventEmitter();

    // Read content from body:after. Content is set via css.
    var getMode = function() {
        if (window.getComputedStyle) {
            return window.getComputedStyle(document.body, ':after').getPropertyValue('content')
                .replace(/\'/g, '')
                .replace(/\"/g, ''); // Firefox fix
        } else {
            return 'is-media-xs';
        }
    };

    // Set class on html and emit event
    var setMode = function() {
        var newMode = getMode();
        if (newMode === responsiveMode) {
            return;
        }
        if (responsiveMode) {
            _.forEach(responsiveMode.split(' '), function(mode) {
                $html.removeClass(mode);
            });
        }
        responsiveMode = newMode;
        _.forEach(responsiveMode.split(' '), function(mode) {
            $html.addClass(mode);
        });
        exports.emit('media:changed');
    };

    // Avoid constant repaint when resizing
    var delayedSetMode = function() {
        if (delay) {
            window.clearTimeout(delay);
        }
        delay = window.setTimeout(function() {
            setMode();
        }, 20);
    };

    // Init
    exports.init = _.once(function() {
        setMode();
        $(window)
            .resize(delayedSetMode)
            .bind('orientationchange', delayedSetMode);
    });

    var isXs = exports.isXs = function() {
        return _.contains(responsiveMode, 'is-media-xs');
    };

    exports.isXsLg = function() {
        return _.contains(responsiveMode, 'is-media-xs-lg');
    };

    var isSm = exports.isSm = function() {
        return _.contains(responsiveMode, 'is-media-sm');
    };

    var isMd = exports.isMd = function() {
        return _.contains(responsiveMode, 'is-media-md');
    };

    var isLg = exports.isLg = function() {
        return _.contains(responsiveMode, 'is-media-lg');
    };

    exports.isGtXs = function() {
        return !isXs();
    };

    exports.isGtSm = function() {
        return (isMd() || isLg());
    };

    exports.isLtLg = function() {
        return !isLg();
    };

    exports.isLtMd = function() {
        return (isSm() || isXs());
    };

    return exports;
}));
