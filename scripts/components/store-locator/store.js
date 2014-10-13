/**
 * A Store object used for the store locator.
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('../../utils/geo'));
    } else {
        root.ds = root.ds || {};
        root.ds.components = root.ds.components || {};
        root.ds.components.storeLocator = root.ds.components.storeLocator || {};
        root.ds.components.storeLocator.Store = factory(root.ds.utils.geo);
    }
}(this, function(geo) {

    var exports = {};

    /**
     * Store class
     * @param        {object}        data        Data as retrived from the Dansk Supermarked API
     */
    function Store(data) {
        this.data = data;
        this.distance = null;
        this.marker = null;
    }

    /**
     * Return coordinates for store
     * @return        {object}
     */
    Store.prototype.getCoords = function() {
        return {
            latitude: this.data.coordinates[1],
            longitude: this.data.coordinates[0]
        };
    };

    /**
     * Distance from point to store
     * @param        {object}        coords
     */
    Store.prototype.setDistanceTo = function(coords) {
        this.distance = geo.distance(coords, this.getCoords());
    };

    exports = Store;

    return exports;
}));
