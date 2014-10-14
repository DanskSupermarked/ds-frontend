# `ds.utils.url`

Helper functions working with URLs.

In browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/url.js"></script>
<script>
    ds.utils.url;
</script>
```

With browserify:

```js
var url = require('ds-frontend/scripts/utils/url');
```

- [`#.getQuery(key)`](#getquerykey)

## `#.getQuery(key)`

Get the value of a key in the url query.

| Name | Type | Description |
| --- | --- | --- |
| `key` | string | Key to find value for |

### Return

`string|undefined`: Value of key. `undefined` if key does not exist.

### Example

```js
// Url: example.com?test=popcorn
ds.utils.url.getQuery('test'); // => 'popcorn'
ds.utils.url.getQuery('invalid'); // => undefined
```
