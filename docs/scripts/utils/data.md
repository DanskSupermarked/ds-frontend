# `ds.utils.data`

Helper for retrieving data in `data-*` attributes on `body`. This data is e.g.
used for environment specific javascript settings og dictionary strings.

Dependencies:

- [jQuery](http://jquery.com/download/)

In browser:

```html
<script src="scripts/libs/jquery.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/data.js"></script>
<script>
    ds.utils.data;
</script>
```

With browserify:

```js
var data = require('ds-frontend/scripts/utils/data');
```

## `#(category).get(item, [returnUndefined])`

| Name | Type | Description |
| --- | --- | --- |
| `category` | string | Name of the attribute |
| `item` | string | Name of the item in the category |
| `returnUndefined` | boolean | If `true` the function will return `undefined` istead of a warning messages |

### Returns

A string with the value of the category-item.

If category or item was not found it will return a string formatted like `{category:item} or `undefined` if `returnUndefined` is set to `true`.

### Example

```html
<body data-dictionary="{&quot;newsletterSubscribeButtonSending&quot;:&quot;Signing up...&quot;}">
```

```js
ds.utils.data('dictionary').get('newsletterSubscribeButtonSending'); // => 'Signing up...'
ds.utils.data('dictionary').get('newsletterHeader'); // => '{dictionary: newsletterHeader}'
ds.utils.data('dictionary').get('newsletterHeader', true); // => undefined
```
