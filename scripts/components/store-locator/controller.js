/**
 * Handles input from the user and updates the stores collection.
 */

// Dependencies
var $ = require('jquery');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var stores = require('./stores');
var loadGoogle = require('../../utils/load-google-maps-api');

// Variables
var storesLoaded = $.Deferred();
var googleLoaded = $.Deferred();
var emitter = new EventEmitter();
var searched = false;
var settings;

module.exports = emitter;

/**
 * Filter a set of google maps search results, so only result within the given country is back.
 * @param         {array}        results        List of google maps search results
 * @return        {array}                       Filtered google maps search results
 */
var filterGoogleResultsOnContry = function(results) {
    if (!settings.countryCode) {
        return results;
    }
    return _.filter(results, function(result) {
        // Find country code component
        var countryComponent = _.find(result['address_components'], function(component) {
            return (component.types[0] === 'country');
        });

        if (!countryComponent) {
            return false;
        }
        return (countryComponent['short_name'].toLowerCase() === settings.countryCode.toLowerCase());
    });
};

/**
 * Use google maps api to get an geopositon based on a query (e.g. 'aarhus')
 * @param         {string}        query
 * @return        {promise}
 */
var queryToGeo = function(query) {
    var deferred = $.Deferred();
    $.when(googleLoaded).then(function(google) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: query
        }, function(results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                deferred.reject();
                return;
            }

            // Filter based on country
            results = filterGoogleResultsOnContry(results);

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
module.exports.zoomTo = function(address) {
    $.when(googleLoaded).then(function(google) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: address
        }, function(results) {
            if (!searched) { // Cancel if there already has been made a search
                emitter.emit('map:bounds', results[0].geometry.viewport);
            }
        });
    });
};

/**
 * Search the map for a position
 * @param         {string|object}        query        I text search (string) or a geopositon search (object)
 * @return        {void}
 */
module.exports.search = function(query) {
    $.when(storesLoaded).then(function() { // Make sure google js api and stores have been loaded

        // Geoposition object
        if (_.isObject(query)) {
            var coords = query;
            searched = true;
            emitter.emit('search:succeeded', coords);
            stores.sortByGeo(coords);

            // Text search. E.g. 'Leeds'
        } else {
            queryToGeo(query).done(function(coords) {
                searched = true;
                emitter.emit('search:succeeded', coords);
                stores.sortByGeo(coords);
            }).fail(function() {
                emitter.emit('search:failed', query);
            });
        }
    });
};

/**
 * Start the controller: load google maps js api and stores data
 * @param         {object}          options
 * @param         {string}          options.dataUrl         URL to json data source
 * @param         {string}          options.countryCode     Country to search in. Use standard country code formats (eg. DK, GB)
 * @return        void
 */
module.exports.init = _.once(function(options) {
    settings = options;

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
