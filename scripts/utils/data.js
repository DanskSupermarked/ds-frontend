// Dependencies
var $ = require('jquery');

var data = $('body').data();

module.exports = function(type) {
    var incaseType = type.toLowerCase();
    return {
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
