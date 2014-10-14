# `ds.utils.loadGoogleMapsAPI`

Wrap load of Google Maps API with promise (jQuery deffered).

Dependencies:

- [Lo-Dash](https://lodash.com/)
- [jQuery](http://jquery.com/download/)

In browser:

```html
<script src="scripts/libs/lodash.js"></script>
<script src="scripts/libs/jquery.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/load-google-maps-api.js"></script>
<script>
    ds.utils.loadGoogleMapsAPI;
</script>
```

With browserify:

```js
var loadGoogleMapsAPI = require('ds-frontend/scripts/utils/load-google-maps-api');
```

- [`#.settings(options)`](#settingsoptions)
- [`#()`](#)

## `#.settings(options)`

| Name | Type | Description |
| --- | --- | --- |
| `options` | object | Key/value pairs of settings for google maps API |

Settings should be applied before the first request of Google Maps API.

### Possible options

`libraries`: See [developers.google.com/maps/documentation/javascript/libraries](https://developers.google.com/maps/documentation/javascript/libraries)

### Example

```js
ds.utils.loadGoogleMapsAPI.settings({
    libraries: 'places,geometry'
});
```

## `#()`

Load google maps api and return a promise.

### Return

`Promise`(jQuery deferred).

### Exampels

```js
ds.utils.loadGoogleMapsAPI().done(function(google) {
    // Do something with the google maps api
});
```

```js
$.when(ds.utils.loadGoogleMapsAPI()).then(function(google) {
    // Do something with the google maps api
});
```
