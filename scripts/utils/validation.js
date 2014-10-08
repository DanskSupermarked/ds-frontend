/**
 * Set of validation methods that al return boolean
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.validation = factory();
    }
}(this, function() {

    var exports = {};

    /**
     * Is string a valid email
     * @param         {string}        input
     * @return        {bool}
     */
    exports.email = function(input) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(input);
    };

    /**
     * Check if an input is different from a value
     * @param         {string}        input
     * @param         {string}        needle
     * @return        {bool}
     */
    exports.not = function(input, needle) {
        return (input !== needle);
    };

    /**
     * Is value submitted
     * @param         {string}        input
     * @return        {bool}
     */
    exports.required = function(input) {
        return (input !== '');
    };

    /**
     * Is a phone number
     * @param         {string}        input
     * @return        {bool}
     */
    exports.phone = function(input) {
        var re = /^[\+]?[\d() -]+$/;
        return re.test(input);
    };

    return exports;

}));
