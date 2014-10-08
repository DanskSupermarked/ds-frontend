/**
 * Prevent console errors in IE
 */

var _ = require('lodash');

if (typeof window.console === 'undefined') {
    window.console = {};
    var functions = 'log error info debug warn trace dir dirxml group groupEnd time timeEnd assert profile'.split(' ');
    var noop = function() {};
    _.forEach(functions, function(fnc) {
        window.console[fnc] = noop;
    });
}
