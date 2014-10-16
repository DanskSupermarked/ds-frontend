/**
 * Retrieve data attribute from body element.
 * E.g. used to retrieve Umbraco dictionary values.
 *
 * Example:
 * var data = require('ds-frontend/scripts/utils/data');
 * var emailValidationTxt = data('umbracoDictionary').get('Validation.Email.js');
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.data = factory(root.jQuery);
    }
}(this, function($) {

    // Cache data in local var
    var data = $('body').data();

    /**
     * First step in retrieving data
     * @param         {string}        type        Category for data. E.g. 'umbracoDictionary'
     * @return        {function}                  Next step in retrieving data
     */
    var exports = function(type) {
        var incaseType = type.toLowerCase();
        return {
            /*
*             * Get data from category
             * @param         {string}      item
             * @param         {bool}        returnUndefined        Set to true if it should return undefined if data does not exists. If not set it will set a warning in the console
             * @return        {string}                             Value
             */
            get: function(item, returnUndefined) {
                if (!data[incaseType] || !data[incaseType][item]) {
                    if (returnUndefined) {
                        return undefined;
                    } else {
                        console.warn(item + ' missing in ' + type);
                        return '{' + type + ': ' + item + '}';
                    }
                } else {
                    return data[incaseType][item];
                }
            }
        };
    };

    /**
     * Refresh cached data. Used if data is inserted async to body
     * @return        {void}
     */
    exports.refresh = function() {
        data = $('body').data();
    };

    return exports;
}));
