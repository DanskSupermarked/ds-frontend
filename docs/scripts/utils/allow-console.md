# `ds.utils.allowConsole`

Make sure that older browsers like IE8 do not crash if there is a console.#
statement.

Dependencies:

- [Lo-Dash](https://lodash.com/)

In browser:

```html
<script src="scripts/libs/lodash.js"></script>
<script src="scripts/libs/ds-frontend/scripts/utils/allow-console.js"></script>
```

With browserify:

```js
require('ds-frontend/scripts/utils/allow-console');
```

