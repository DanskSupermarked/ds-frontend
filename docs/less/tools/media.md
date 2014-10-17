# `tools/media.less`

Transfer media queries in css to javascript using the `content` of `body:after`.

Based on Bootstrap breakpoint classes on the `<body>` will be set/changed to
`is-media-xs`, `is-media-sm`, `is-media-md` and `is-media-lg`.

Dependencies:

- [Bootstrap](http://getbootstrap.com/)
- [ds.utils.responsiveClasses](../../scripts/utils/responsive-classes.md)

In LESS:

```less
@import "/node_modules/ds-frontend/less/tools/media.less";
```
