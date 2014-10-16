/**
 * Geolocation utilities used by Dansk Supermarked
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.geo = factory(root.jQuery);
    }
}(this, function($) {

    var exports = {};

    var GEO_IP_URL = 'freegeoip.net/json/';

    // Get geoposition from geoip register
    var geoPosPolyfill = function(done) {
        var protocol = (document.location.protocol === 'https:' ? 'https://' : 'http://');
        $.getJSON(protocol + GEO_IP_URL, done);
    };

    /**
     * Get client geo position if browser supports it
     * @param         {bool}          useFreeGeoIp      Use freegeoip.net instead of native geolocation
     * @param         {number}        cachedTime        MS to cache geoposition result. Defaults to 60000 (10 mins)
     * @return        {promise}
     */
    exports.clientLocation = function(useFreeGeoIp, cachedTime) {
        var deferred = $.Deferred();

        if (useFreeGeoIp || !navigator || !navigator.geolocation) {
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

        // Calculate distance between two geopositions
        return radius * 2 * Math.asin(Math.min(1, Math.sqrt((Math.pow(Math.sin((diffRadian(geo1.latitude, geo2.latitude)) / 2.0), 2.0) + Math.cos(toRadian(geo1.latitude)) * Math.cos(toRadian(geo2.latitude)) * Math.pow(Math.sin((diffRadian(geo1.longitude, geo2.longitude)) / 2.0), 2.0)))));
    };

    /**
     * Convert kilometer to miles and round to decimals.
     * @param         {float}        km
     * @param         {[int=2]}        decimals
     * @return        {float}
     */
    exports.kmToMiles = function(km, decimals) {
        if (typeof decimals === 'undefined') {
            decimals = 2;
        } else {
            decimals = parseInt(decimals, 10);
        }
        return (parseFloat(km) * 0.621371192).toFixed(decimals);
    };

    return exports;
}));
