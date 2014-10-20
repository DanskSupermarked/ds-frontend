(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports.VERSION = factory();
    } else {
        root.ds = root.ds || {};
        root.ds.VERSION = factory();
    }
}(this, function() {
    return '0.1.4';
}));
