# ds.utils.geo

Geolocation utilities.

Dependencies:

- [jQuery](http://jquery.com/download/)

In browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/geo.js"></script>
<script>
    ds.utils.geo;
</script>
```

With browserify:

```js
var geo = require('ds-frontend/scripts/utils/geo');
```

- [#.clientLocation](#clientlocation)
- [#.distance](#distancefromcoords-tocoords)
- [#.kmToMiles](#kmtomileskm-decimals)

## #.clientLocation()

Get clients location using the html5 API. If native API is not supported it
falls back to geolocation based on ip address.

### Returns

`Promise` (jQuery deffered): If resolved the Promise return a coordinate
consisting of `latitude` and `longitude`.

### Example

```js
ds.utils.geo.clientLocation()
    .done(function(coords) {
        coords; // => {latitude: 56.00, longitude: 45.00}
    })
```

## #.distance(fromCoords, toCoords)

Calculate the distance between two geopositions in kilometers.

| Name | Type | Description |
| --- | --- | --- |
| `fromCoords` | object |  |
| - `fromCoords.latitude` | number |  |
| - `fromCoords.longitude` | number |  |
| `toCoords` | object |  |
| - `toCoords.latitude` | number |  |
| - `toCoords.longitude` | number |  |

### Returns

`Number`: The distance in km.

### Example

```js
var from = {
    latitude: 56.00,
    longitude: 10.00
};
var to = {
    latitude: 46.00,
    longitude: 20.00
};
ds.utils.geo.distance(from, to); // => 1310.062581460199
```

## #.kmToMiles(km, [decimals])

Calculate the distance between two geopositions in kilometers.

| Name | Type | Description |
| --- | --- | --- |
| `km` | Number, String | A number or a string formatted as a number |
| `decimals` | Number, String | How many decimals shpuld be rounded to. Default to `2` |

### Returns

`String`: The calculated distance

### Example

```js
ds.utils.geo.kmToMiles(10); // => '6.21'
ds.utils.geo.kmToMiles(10, 5); // => '6.21371'
```
