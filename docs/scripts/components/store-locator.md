# `ds.components.storeLocator`

Logic for making store locator. The component is divided into a store model, a
stores collection and a controller.

These can be used to create a view for the store locator.

See a very [basic example implementation](../../../examples/store-locator.html).

Dependencies:

- [Lo-Dash](https://lodash.com/)
- [jQuery](http://jquery.com/download/)
- [EventEmitter](https://github.com/Wolfy87/EventEmitter) (native EventEmitter is used in Browserify)
- [ds.utils.loadAssets](../utils/load-assets.md)
- [ds.utils.loadGoogleMapsAPI](../utils/load-google-maps-api.md)
- [ds.utils.geo](../utils/geo.md)
- ds.components.storeLocator.Store
- ds.components.storeLocator.stores

In browser:

```html
<script src="scripts/libs/lodash.js"></script>
<script src="scripts/libs/jquery.js"></script>
<script src="scripts/libs/eventemitter.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/load-assets.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/load-google-maps-api.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/geo.js"></script>
<script src="scripts/libs/ds-frontend/scripts/components/store-locator/store.js"></script>
<script src="scripts/libs/ds-frontend/scripts/components/store-locator/stores.js"></script>
<script src="scripts/libs/ds-frontend/scripts/components/store-locator/controller.js"></script>
<script>
    ds.components.storeLocator.stores
    ds.components.storeLocator.controller
</script>
```

With browserify:

```js
var stores = require('ds-frontend/scripts/components/store-locator/stores');
var controller = require('ds-frontend/scripts/components/store-locator/controller');
```

- [`#.controller.init(options)`](#controllerinitoptions)
- [`#.controller.zoomTo(region)`](#controllerzoomtoregion)
- [`#.controller.search(query)`](#controllersearchquery)
- [`#.stores.get()`](#storesget)
- [`#.stores.sortByGeo(coords)`](#storessortbygeocoords)
- [`#.stores.add(data)`](#storesadddata)

## `#.controller.init(options)`

Initialize the store locator component.

| Name | Type | Description |
| --- | --- | --- |
| `options` | object | Key/value pair of settings for the store locator component |

### Possible settings

`data` (array): Data for stores. The data must be formatted as the Dansk SuperMarked API is formatting stores: [developer.dansksupermarked.dk/v1/api/reference/stores/](https://developer.dansksupermarked.dk/v1/api/reference/stores/)

`dataUrl` (string): URL to API service serving data as json

`countryCode` (string): Restrict search result to a country. E.g. 'DK'

### Events

Stores collection fires a `store:added` event for each store added to the
collection.

### Example

```js
ds.components.storeLocator.stores.on('store:added', function(store) {
    // Add store to view
});

ds.utils.loadGoogleMapsAPI.settings({
    libraries: 'places', // required by the store locator component
});

ds.components.storeLocator.controller.init({
    dataUrl: 'https://api.dansksupermarked.dk/v1/stores/netto/dk',
    countryCode: 'DK'
});
```

## `#.controller.zoomTo(region)`

Get bounds of a search result. Can e.g. be used to zoom the map to Denmark.
This function will only fire, if `#.controller.search()` have not had a
successful search yet.

| Name | Type | Description |
| --- | --- | --- |
| `region` | string | Area to search for. E.g. 'DK' |

### Event

Controller fires a `map:bounds` event when successfully translated input to
google map bounds.

### Example

```js
ds.components.storeLocator.controller.on('map:bounds', function(bounds) {
    map.fitBounds(bounds); // Zoom to Denmark
});
ds.components.storeLocator.controller.zoomTo('DK');
```

## `#.controller.search(query)`

Trying to convert query to a geoposition using Google Maps.
If query is successfully converted the stores collection is sorted based on
the distance to queried geoposition.

| Name | Type | Description |
| --- | --- | --- |
| `query` | string | Some query Google Maps accepts |

### Event

Controller fires a `search:succeeded` event when successfully translated query to
google maps geoposition.

Controller fires a `search:failed` event when query could not be translated to
a google maps geoposition.

Stores collection fires a `stores:sorted` event when successfully translated
query to google maps geoposition and stores has been sorted.

### Example

```js
ds.components.storeLocator.controller.on('search:succeeded', function() {
    // Show message to the user, that the search was successful
});

ds.components.storeLocator.controller.on('search:failed', function() {
    // Show message to user, that query was not valid
});

ds.components.storeLocator.stores.on('stores:sorted', function() {
    ds.components.storeLocator.stores.get(); // Sorted collection of stores
    // Update view
});

ds.components.storeLocator.controller.search('bjødstrupvej 18');
```

## `#.stores.get()`

Get the current sorted list of stores.

### Return

`array`: List of stores

### Example

```js
ds.components.storeLocator.stores.get(); // Sorted collection of added stores
```

## `#.stores.sortByGeo(coords)`

Sort the list of stores by distance to a geoposition.

| Name | Type | Description |
| --- | --- | --- |
| `coords` | object | Geoposition |
| - `coords.latitude` | number | Latitude |
| - `coords.longitude` | number | Longitude |

### Event

Stores collection fires a `stores:sorted` event when stores have been sorted.

### Example

```js
ds.components.storeLocator.stores.on('stores:sorted', function() {
    ds.components.storeLocator.stores.get(); // Sorted collection of stores
    // Update view
});

ds.components.storeLocator.stores.sortByGeo({
    latitude: 45.00,
    longitude: 12.00
});
```

## `#.stores.add(data)`

Add a Store to the collection. Data must be formatted as on the Dansk
Supermarked API: [developer.dansksupermarked.dk/v1/api/reference/stores/](https://developer.dansksupermarked.dk/v1/api/reference/stores/).

| Name | Type | Description |
| --- | --- | --- |
| `data` | object|array | Data for a single Store or an array of stores |

### Event

Stores collection fires a `store:added` event when a store has been added.

### Example

```js
ds.components.storeLocator.stores.on('store:added', function(store) {
    // Add store to view
});

$.getJSON('https://api.dansksupermarked.dk/v1/stores/netto/dk')
    .done(function(data) {
        ds.components.storeLocator.stores.add(data);
    });
```

The above code could also be done with:

```js
ds.components.storeLocator.stores.on('store:added', function(store) {
    // Add store to view
});

ds.components.storeLocator.controller.init({
    dataUrl: 'https://api.dansksupermarked.dk/v1/stores/netto/dk'
});
```
