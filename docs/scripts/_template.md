# `ds.{{name.of.module}}`

{description}

Dependencies:

- [Lo-Dash](https://lodash.com/)
- [jQuery](http://jquery.com/download/)
- [EventEmitter](https://github.com/Wolfy87/EventEmitter) (native EventEmitter is used i Browserify)

In browser:

```html
<script src="scripts/libs/lodash.js"></script>
<script src="scripts/libs/jquery.js"></script>
<script src="scripts/libs/eventemitter.js"></script>
<script src="scripts/libs/ds-frontend/scripts/{{path-to-file}}.js"></script>
<script>
    ds.{{name.of.module}};
</script>
```

With browserify:

```js
var {{nameOfModule}} = require('ds-frontend/scripts/{{path-to-module}}');
```

- [`#.table-of-content()`](#table-of-content)

## `#{{.init(callback)}}`

{{description}}

| Name | Type | Description |
| --- | --- | --- |
| `callback` | function | Callback when class/media has changed |

### Return

`boolean`: {{description}}

### Example

```js
{{some js code}}
```
