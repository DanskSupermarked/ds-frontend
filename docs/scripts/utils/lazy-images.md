# `ds.utils.lazyImages`

Lazy load images with class `lazy` by deferring load until they are near the
viewable area of the window.
When images are loaded the `lazy` class is removed, if you wish to style the
loading.

Dependencies:

- [jQuery](http://jquery.com/download/)

In browser:

```html
<script src="scripts/libs/jquery.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/lazy-images.js"></script>
<script>
    ds.utils.lazyImages;
</script>
```

With browserify:

```js
var lazyImages = require('ds-frontend/scripts/utils/lazy-images');
```

## Markup

```html
<!-- Normal image -->
<img data-src="images/lazy-loaded-image.jpg" class="lazy">

<!-- Responsive image. Use picturefill for cross browser functionality -->
<img data-srcset="images/lazy-loaded-image.jpg 1000w, images/lazy-loaded-image-small.jpg 500w" class="lazy">
```

## `#.refresh()`

Use this to refresh lazy loaded images. Used if images are added to the dom
after DomReady has been called. E.g. if adding images async with AJAX.
