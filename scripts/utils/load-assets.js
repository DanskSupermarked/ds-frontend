/**
 * Load javascript and style sheet sources async from within javascript.
 * Taken from the filamentgroup.
 */

/**
 * Load javascript async
 * @param         {string}        src        Url to javascript
 * @return        {element}
 */
module.exports.js = function(src) {
    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = src;
    ref.parentNode.insertBefore(script, ref);
    return script;
};

/**
 * Load css async
 * @param         {string}        href        Url to css
 * @return        {element}
 */
module.exports.css = function(href) {
    var styleSheet = window.document.createElement('link');
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
