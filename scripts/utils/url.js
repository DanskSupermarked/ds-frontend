/**
 * Utilities related to URL
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.url = factory();
    }
}(this, function() {

    var exports = {};

    /**
     * Get value of query from url.
     * @param         {string}        key        key
     * @return        {string}                    value
     */
    exports.getQuery = function(key) {
        var val = decodeURI(
            (new RegExp(key + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
        );
        if (val === 'null') {
            val = undefined;
        }
        return val;
    };

    return exports;

}));
