/**
 * Wrapper for loading google maps api v3 with promise.
 */

// Dependencies
var $ = require('jquery');
var _ = require('lodash');
var load = require('./load-assets');

// Variables
var deferred = $.Deferred();
var settings = {
    callback: '__initGoogleMapsAPI__'
};

var loadGoogleMapsAPI = _.once(function() {

    console.time('Load Google Maps Javascript API');
    window[settings.callback] = function() {
        console.timeEnd('Load Google Maps Javascript API');
        deferred.resolve(window.google);
    };

    var src = '//maps.googleapis.com/maps/api/js?' + $.param(settings);
    load.js(src);
});

module.exports = function() {
    loadGoogleMapsAPI();
    return deferred.promise();
};

module.exports.settings = function(options) {
    settings = _.assign(options, settings);
};
