/**
 * Wrapper for loading google maps api v3 with promise.
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('lodash'), require('./load-assets'));
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.loadGoogleMapsAPI = factory(root.jQuery, root._, root.ds.utils.loadAssets);
    }
}(this, function($, _, loadAssets) {

    // Variables
    var deferred = $.Deferred();
    var settings = {
        callback: 'initGoogleMapsAPI' + new Date().getTime()
    };

    var loadGoogleMapsAPI = _.once(function() {

        console.time('Load Google Maps Javascript API');
        window[settings.callback] = function() {
            console.timeEnd('Load Google Maps Javascript API');
            deferred.resolve(window.google);
        };
        var protocol = (document.location.protocol === 'https:' ? 'https://' : 'http://');
        var src = protocol + 'maps.googleapis.com/maps/api/js?' + $.param(settings);
        loadAssets.js(src);
    });

    var exports = function() {
        loadGoogleMapsAPI();
        return deferred.promise();
    };

    exports.settings = function(options) {
        settings = _.assign(options, settings);
    };

    return exports;
}));
