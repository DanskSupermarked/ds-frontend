/**
 * Collection of stores (Store).
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(
            require('lodash'),
            require('events').EventEmitter,
            require('./store'));
    } else {
        root.ds = root.ds || {};
        root.ds.components = root.ds.components || {};
        root.ds.components.storeLocator = root.ds.components.storeLocator || {};
        root.ds.components.storeLocator.stores = factory(
            root._,
            root.EventEmitter,
            root.ds.components.storeLocator.Store);
    }
}(this, function(_, EventEmitter, Store) {

    // Vars
    var stores = [];

    var exports = new EventEmitter();

    /**
     * Get all stores
     * @return        {array}
     */
    exports.get = function() {
        return stores;
    };

    /**
     * Remove all stores
     * @return        {void}
     */
    exports.clear = function() {
        stores = [];
    };

    /**
     * Calculate distance in all stores and sort by the distance
     * @param         {object}        coords
     * @return        {void}
     */
    exports.sortByGeo = function(coords) {
        _.forEach(stores, function(store) {
            store.setDistanceTo(coords);
        });
        stores = _.sortBy(stores, 'distance');
        exports.emit('stores:sorted');
    };

    /**
     * Add a store to the collection
     * @param        {object}        data        Data as retrieved from the Dansk Supermarked API
     */
    var addStore = function(data) {
        var store = new Store(data);

        if (!store.getCoords().latitude || !store.getCoords().longitude) {
            console.warn(store, 'not added to stores collection because geopositions is invalid.');
            return;
        }

        stores.push(store);

        exports.emit('store:added', store);
    };

    /**
     * Add a store/stores to the collection
     * @param        {object|array}        data        Data as retrieved from the Dansk Supermarked API
     */
    exports.add = function(data) {
        if (_.isArray(data)) {
            _.forEach(data, addStore);
        } else {
            addStore(data);
        }
    };

    return exports;
}));
