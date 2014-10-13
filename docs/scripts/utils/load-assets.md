# ds.utils.loadAssets

Async load javascript and styles.

In browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/load-assets.js"></script>
<script>
    ds.utils.loadAssets;
</script>
```

With browserify:

```js
var loadAssets = require('ds-frontend/scripts/utils/load-assets');
```

- [#.js](#js)
- [#.css](#css)

## #.js(src, [callback])

| Name | Type | Description |
| --- | --- | --- |
| `src` | string | URL to javascript source to load |
| `callback` | function | Callback when javascript has been loaded |

### Return

`Element`: dom element for script

### Example

```js
ds.utils.loadAssets.js('/scripts/async-scripts.js', function() {
    console.log('Script has been loaded.');
})
```

## #.css(href, [callback])

| Name | Type | Description |
| --- | --- | --- |
| `href` | string | URL to style to load |
| `callback` | function | Callback when style has been loaded |

### Return

`Element`: dom element for style

### Example

```js
ds.utils.loadAssets.css('/scripts/async-style.css', function() {
    console.log('Style has been loaded.');
})
```
