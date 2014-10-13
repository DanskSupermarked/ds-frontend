# ds.utils.data

Helper for retirving data in `data-*` attributes on `body`. This data is e.g.
used for environment specific javascript settings og dictionary strings.

In browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/data.js"></script>
<script>
    ds.utils.data;
</script>
```

With browserify:

```js
var data = require('ds-frontend/scripts/utils/data');
```

## #(cateogry).get(item, [returnUndefined])

| Name | Type | Description |
| --- | --- | --- |
| `category` | string | Name of the attribute |
| `item` | string | Name of the item in the category |
| `returnUndefined` | boolean | If `true` the function return `indefined` if item was not found instead of a warning messages |

### Returns

A string with the value of the category-item.
