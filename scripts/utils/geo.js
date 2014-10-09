/**
 * Geolocation utilities used by Dansk Supermarked
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        exports = factory(require('jquery'), require('./load-assets'));
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.allowConsole = factory(root, root.jQuery, root.ds.utils.loadAssets);
    }
}(this, function(root, $, loadAssets) {

    var exports = {};

    var GEO_IP_CALLBACK = 'geo-ip-callback';
    var GEO_IP_URL = '//freegeoip.net/json/';

    // Get geoposition from geoip register
    var geoPosPolyfill = function(success) {
        root[GEO_IP_CALLBACK] = success;
        loadAssets.js(GEO_IP_URL + '?callback=' + GEO_IP_CALLBACK);
    };

    /**
     * Get client geo position if browser supports it
     * @param         {number}        cachedTime        MS to cache geoposito result. Defaults to 60000 (10 mins)
     * @return        {promise}
     */
    exports.clientLocation = function(cachedTime) {
        var deferred = $.Deferred();

        if (!navigator || !navigator.geolocation) {
            geoPosPolyfill(deferred.resolve);
            // Reject if no response within 5 secs
            setTimeout(function() {
                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            }, 5000);
        } else {
            navigator.geolocation.getCurrentPosition(function(position) {
                deferred.resolve(position.coords);
            }, function() {
                deferred.reject();
            }, {
                maximumAge: cachedTime || 1000 * 60 * 10 // Default cache set to 10 minutes
            });
        }

        return deferred.promise();
    };

    /**
     * Get distance between two geopositions
     * @param         {object}        geo1        {latitude: float, longitude: float}
     * @param         {object}        geo2        {latitude: float, longitude: float}
     * @return        {number}                    km
     */
    exports.distance = function(geo1, geo2) {
        var radius = 6367.0;

        var toRadian = function(v) {
            return v * (Math.PI / 180);
        };

        var diffRadian = function(v1, v2) {
            return toRadian(v2) - toRadian(v1);
        };

        // Calculate distance bewteen two geopositions
        return radius * 2 * Math.asin(Math.min(1, Math.sqrt((Math.pow(Math.sin((diffRadian(geo1.latitude, geo2.latitude)) / 2.0), 2.0) + Math.cos(toRadian(geo1.latitude)) * Math.cos(toRadian(geo2.latitude)) * Math.pow(Math.sin((diffRadian(geo1.longitude, geo2.longitude)) / 2.0), 2.0)))));
    };

    /**
     * Convert kilometer to miles and round to decimals.
     * @param         {float}        km
     * @param         {[int=2]}        decimals
     * @return        {float}
     */
    exports.kmToMiles = function(km, decimals) {
        return (parseFloat(km) * 0.621371192).toFixed(decimals || 2);
    };

    return exports;
}));
