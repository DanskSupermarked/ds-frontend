(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ds = root.ds || {};
        root.ds.testFramework = factory();
    }
}(this, function() {
    var exports = true;
    // Your actual module
    return exports;
}));
