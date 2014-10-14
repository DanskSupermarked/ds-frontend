# Javascript

This library is split into many modules. They are all available to use directly
from the browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/geo.js"></script>
<script>
    ds.utils.geo.clientLocation().done(function(coords) { console.log(coords); });
</script>
```

or with browserify:

```js
var geo = require('ds-frontend/scripts/utils/geo');
geo.clientLocation().done(function(coords) {
    console.log(coords);
});
```

Some of the modules have external dependencies. External libraries used is:

- [jQuery](http://jquery.com/download/)
- [Lo-Dash](https://lodash.com/)
- [EventEmitter](https://github.com/Wolfy87/EventEmitter) (native EventEmitter is used i Browserify)

## Modules

- [`ds.utils.allowConsole`](scripts/utils/allow-console.md): No errors when using `console`in old browsers
- [`ds.utils.data`](scripts/utils/data.md): Retrieve `data-*` from from `<body>`
- [`ds.utils.geo`](scripts/utils/geo.md): Geolocation utilities
- [`ds.utils.lazyImages`](scripts/utils/lazy-images.md): Lazyload images
- [`ds.utils.loadAssets`](scripts/utils/load-assets.md): Async load frontend assets
- [`ds.utils.loadGoogleMapsAPI`](scripts/utils/load-google-maps-api.md): Async load Google Maps API
- [`ds.utils.responsiveClasses`](scripts/utils/responsive-classes.md): Update responsive classes on `<html>` when window resizes
- [`ds.utils.string`](scripts/utils/string.md): Helper functions to manipulate strings
- [`ds.utils.url`](scripts/utils/url.md): Helper functions working with URLs
