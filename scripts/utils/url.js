/**
 * Utilities related to URL
 */

/**
 * Get value of query from url.
 * @param         {string}        name        key
 * @return        {string}                    value
 */
module.exports.getQuery = function(name) {
    var val = decodeURI(
        (new RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
    if (val === 'null') {
        val = undefined;
    }
    return val;
};
