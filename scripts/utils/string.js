/**
 * Common string manipulation.
 *
 * Examples:
 * var string = require('ds-frontend/scripts/utils/string');
 * string('this is a test').startsWith('this'); // => true
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.string = factory();
    }
}(this, function() {
    return function(source) {
        return {
            /**
             * Does string start with
             * @param         {strng}        needle
             * @return        {bool}
             */
            startsWith: function(needle) {
                return (source.indexOf(needle) === 0);
            },

            /**
             * Strips html tags
             * @return        {string}
             */
            stripTags: function() {
                return source.replace(/(<([^>]+)>)/ig, '');
            }
        };
    };
}));
