/**
 * Collection of stores (Store).
 */

// Dependencies
var Store = require('./store');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// Vars
var emitter = new EventEmitter();
var stores = [];

module.exports = emitter;

/**
 * Get all stores
 * @return        {array}
 */
module.exports.get = function() {
    return stores;
};

/**
 * Calculate distance in all stores and sort by the distance
 * @param         {object}        coords
 * @return        {void}
 */
module.exports.sortByGeo = function(coords) {
    _.forEach(stores, function(store) {
        store.setDistanceTo(coords);
    });
    stores = _.sortBy(stores, 'distance');
    emitter.emit('stores:sorted');
};

/**
 * Add a store to the collection
 * @param        {object}        data        Data as retrieved from the Dansk Supermarked API
 */
module.exports.add = function(data) {
    var store = new Store(data);

    if (!store.getCoords().latitude || !store.getCoords().longitude) {
        console.warn(store, 'not added to stores collection because geopositions is invalid.');
        return;
    }

    stores.push(store);

    emitter.emit('store:added', store);
};
