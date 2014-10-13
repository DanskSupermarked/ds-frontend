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

- [`ds.utils.allowConsole`](scripts/utils/allow-console.md)
- [`ds.utils.data`](scripts/utils/data.md)
