# `ds.utils.string`

Helper functions for working with strings.

In browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/string.js"></script>
<script>
    ds.utils.string;
</script>
```

With browserify:

```js
var string = require('ds-frontend/scripts/utils/string');
```

- [`#(source).startsWith(needle)`](#sourcestartswithneedle)
- [`#(source).stripTags()`](#sourcestartswith)

## `#(source).startsWith(needle)`

| Name | Type | Description |
| --- | --- | --- |
| `source` | string | String to check up against |
| `needle` | string | String to check for |

Checks if strings start with `needle`.

### Return

`boolean`: Whether the `source` starts with `needle`.

### Example

```js
ds.utils.string('this is a test').startsWith('this'); // => true
ds.utils.string('this is a test').startsWith('test'); // => false
```

## `#(source).stripTags()`

| Name | Type | Description |
| --- | --- | --- |
| `source` | string | String to remove html tags from |

Remove all html tags from string.

### Return

`string`: The stripped string

### Example

```js
ds.utils.string('<a href="#">this <i>is</i> a test</a>').stripTags();
// => 'this is a test'
```
