/**
 * Load javascript and style sheet sources async from within javascript.
 * Taken from the filamentgroup.
 */
(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ds = root.ds || {};
        root.ds.utils = root.ds.utils || {};
        root.ds.utils.loadAssets = factory();
    }
}(this, function() {

    var exports = {};

    /**
     * Load javascript async
     * @param         {string}        src        Url to javascript
     * @return        {element}
     */
    exports.js = function(src, onload) {
        var ref = window.document.getElementsByTagName('script')[0];
        var script = window.document.createElement('script');
        if (onload) {
            script.onload = onload;
        }
        script.src = src;
        ref.parentNode.insertBefore(script, ref);
        return script;
    };

    /**
     * Load css async
     * @param         {string}        href        Url to css
     * @return        {element}
     */
    exports.css = function(href, done) {

        var TIMEOUT = 20000;

        var sheet;
        var cssRules;
        var startTime;
        var styleSheet = window.document.createElement('link');

        var checkLoaded = function() {
            try {
                if (styleSheet[sheet] && styleSheet[sheet][cssRules].length) {
                    done();
                } else {
                    if (startTime + TIMEOUT < new Date().getTime()) {
                        console.warn('Callback for load of ' + href + ' timed out');
                    }
                    setTimeout(checkLoaded, 10);
                }
            } catch (e) {
                console.warn(e);
            }
        };

        // Check when css is loaded if a callback is present
        if (done) {
            if ('sheet' in styleSheet) {
                sheet = 'sheet';
                cssRules = 'cssRules';
            } else {
                sheet = 'styleSheet';
                cssRules = 'rules';
            }
            startTime = new Date().getTime();
            checkLoaded();
        }

        var ref = window.document.getElementsByTagName('script')[0];
        styleSheet.rel = 'stylesheet';
        styleSheet.href = href;
        // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
        styleSheet.media = 'only x';
        // inject link
        ref.parentNode.insertBefore(styleSheet, ref);
        // set media back to `all` so that the styleshet applies once it loads
        setTimeout(function() {
            styleSheet.media = 'all';
        }, 0);
        return styleSheet;
    };

    return exports;
}));
