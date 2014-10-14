# `ds.utils.responsiveClasses`

Add responsive classes to html and changes when window resizes.
Used in combination with css, which set `content` on `body:after`.

Content in `body:after` should always be one of the following:

- `is-media-xs`
- `is-media-sm`
- `is-media-md`
- `is-media-lg`

Dependencies:

- [Lo-Dash](https://lodash.com/)
- [jQuery](http://jquery.com/download/)
- [EventEmitter](https://github.com/Wolfy87/EventEmitter) (native EventEmitter is used i Browserify)

In browser:

```html
<script src="scripts/libs/lodash.js"></script>
<script src="scripts/libs/jquery.js"></script>
<script src="scripts/libs/eventemitter.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/responsive-classes.js"></script>
<script>
    ds.utils.responsiveClasses;
</script>
```

With browserify:

```js
var responsiveClasses = require('ds-frontend/scripts/utils/responsive-classes');
```

- [`#.init()`](#init)
- [`#.isXs()`](#isxs-issm-ismd-islg)
- [`#.isSm()`](#isxs-issm-ismd-islg)
- [`#.isMd()`](#isxs-issm-ismd-islg)
- [`#.isLg()`](#isxs-issm-ismd-islg)
- [`#.isGtXs()`](#isgtxs-isgtsm-isltmd-isltlg)
- [`#.isGtSm()`](#isgtxs-isgtsm-isltmd-isltlg)
- [`#.isLtMd()`](#isgtxs-isgtsm-isltmd-isltlg)
- [`#.isLtLg()`](#isgtxs-isgtsm-isltmd-isltlg)

### Example css

```css
body:after {
    position: fixed;
    left: -99999px;
    content: "is-media-xs";
}
@media (min-width: 768px) {
    body:after { content: "is-media-sm"; }
}
@media (min-width: 992px) {
    body:after { content: "is-media-md"; }
}
@media (min-width: 1200px) {
    body:after { content: "is-media-lg"; }
}
```

## `#.init()`

Set class on `<body>` and updates on window resize and orienchange.

## `#.on('media:changed', callback)`

| Name | Type | Description |
| --- | --- | --- |
| `callback` | function | Callback when class/media has changed |

### Example

```js
ds.utils.responsiveClasses.on('media:changed', function() {
    if (ds.utils.resposiveClasses.isXs()) {
        // Collapsed menu
    } else {
        // Full menu
    }
});
```

## `#.isXs()`, `#.isSm()`, `#.isMd()`, `#.isLg()`

Checks if media size is of type.

__Return__

`boolean`: Whether the midea size is of type.

__Example__

```js
ds.utils.responsiveClasses.on('media:changed', function() {
    if (ds.utils.resposiveClasses.isXs()) {
        // Collapsed menu
    } else {
        // Full menu
    }
});
```

## `#.isGtXs()`, `#.isGtSm()`, `#.isLtMd()`, `#.isLtLg()`

Checks if media size is greater/less than.

__Return__

`boolean`: Whether the midea size is greater/less than.

__Example__

```js
ds.utils.responsiveClasses.on('media:changed', function() {
    if (ds.utils.resposiveClasses.isGtXs()) {
        // Full menu for sm, md and lg
    }
});
```
