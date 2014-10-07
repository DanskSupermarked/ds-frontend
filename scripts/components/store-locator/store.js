/**
 * A Store object used for the store locator.
 */

// Dependencies
var geo = require('../../utils/geo');

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

module.exports = Store;
