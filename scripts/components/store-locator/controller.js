/**
 * Handles input from the user and updates the stores collection.
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(
            require('jquery'),
            require('lodash'),
            require('events').EventEmitter,
            require('./stores'),
            require('../../utils/load-google-maps-api'));
    } else {
        root.ds = root.ds || {};
        root.ds.components = root.ds.components || {};
        root.ds.components.storeLocator = root.ds.components.storeLocator || {};
        root.ds.components.storeLocator.controller = factory(
            root.jQuery,
            root._,
            root.EventEmitter,
            root.ds.components.storeLocator.stores,
            root.ds.utils.loadGoogleMapsAPI
        );
    }
}(this, function($, _, EventEmitter, stores, loadGoogle) {

    // Variables
    var storesLoaded = $.Deferred();
    var googleLoaded = $.Deferred();
    var searched = false;
    var settings = {};

    var exports = new EventEmitter();

    /**
     * Use google maps api to get an geopositon based on a query (e.g. 'aarhus')
     * @param         {string}        query
     * @return        {promise}
     */
    var queryToGeo = function(query) {
        var deferred = $.Deferred();
        $.when(googleLoaded).then(function(google) {
            var geocoder = new google.maps.Geocoder();
            var googleQuery = {
                address: query
            };
            if (settings.countryCode) {
                googleQuery.componentRestrictions = {
                    country: settings.countryCode.toUpperCase()
                };
            }
            geocoder.geocode(googleQuery, function(results, status) {
                if (status !== google.maps.GeocoderStatus.OK) {
                    deferred.reject();
                    return;
                }

                if (results.length <= 0) {
                    deferred.reject();
                    return;
                }

                deferred.resolve({
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                });
            });
        });
        return deferred.promise();
    };

    /**
     * Zoom map to a location. E.g. a country using country codes (UK, DK ect.)
     * @param         {string}        address
     * @return        {void}
     */
    exports.zoomTo = function(address) {
        $.when(googleLoaded).then(function(google) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: address
            }, function(results) {
                if (!searched) { // Cancel if there already has been made a search
                    exports.emit('map:bounds', results[0].geometry.viewport);
                }
            });
        });
    };

    /**
     * Search the map for a position
     * @param         {string|object}        query        I text search (string) or a geopositon search (object)
     * @return        {void}
     */
    exports.search = function(query) {
        $.when(storesLoaded).then(function() { // Make sure google js api and stores have been loaded

            // Geoposition object
            if (_.isObject(query)) {
                var coords = query;
                searched = true;
                exports.emit('search:succeeded', coords);
                stores.sortByGeo(coords);

                // Text search. E.g. 'Leeds'
            } else {
                queryToGeo(query).done(function(coords) {
                    searched = true;
                    exports.emit('search:succeeded', coords);
                    stores.sortByGeo(coords);
                }).fail(function() {
                    exports.emit('search:failed', query);
                });
            }
        });
    };

    /**
     * Inject settings
     * @param         {object}        options        key/value paris of settings
     * @return        {void}
     */
    exports.injectSettings = function(options) {
        settings = _.assign(settings, options);
    };

    /**
     * Start the controller: load google maps js api and stores data
     * @param         {object}          options
     * @param         {string}          options.dataUrl         URL to json data source
     * @param         {string}          options.countryCode     Country to search in. Use standard country code formats (eg. DK, GB)
     * @return        void
     */
    exports.init = _.once(function(options) {
        exports.injectSettings(options);

        if (!settings || !settings.dataUrl) {
            console.error('#.init() must have an options object including `dataUrl`');
            return;
        }
        loadGoogle().done(googleLoaded.resolve);
        $.getJSON(settings.dataUrl).done(function(data) {

            // Add all stores to collection
            _.forEach(data, stores.add);
            storesLoaded.resolve();
        }).fail(storesLoaded.reject);
    });

    return exports;

}));
