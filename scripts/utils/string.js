/**
 * Common string manipulation
 */

module.exports = function(source) {
    return {
        startsWith: function(needle) {
            return (source.indexOf(needle) === 0);
        },
        stipTags: function() {
            return source.replace(/(<([^>]+)>)/ig, '');
        }
    };
};
