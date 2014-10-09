/**
 * Prevent console errors in IE
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('lodash'));
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.allowConsole = factory(root._);
    }
}(this, function(_) {
    var exports = {};
    var nativeConsole = console;
    exports.mock = function() {
        console = {};
        var functions = 'log error info debug warn trace dir dirxml group groupEnd time timeEnd assert profile'.split(' ');
        var noop = function() {};
        _.forEach(functions, function(fnc) {
            console[fnc] = noop;
        });
    };
    exports.unmock = function() {
        console = nativeConsole;
    };

    if (typeof console === 'undefined') {
        exports.mock();
    }
    return exports;
}));
