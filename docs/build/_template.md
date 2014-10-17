# {{name-of-task}}

{{description}}

Dependencies:

- [hbsfy](https://www.npmjs.org/package/hbsfy) to be in `package.json`
- [handlebars](https://www.npmjs.org/package/handlebars) to be in `package.json`

## Config

```js
var gulp = require('gulp');
require('ds-frontend/build');
gulp.dsConfig = {
    {{name}}: {
        // {{include example of config}}
    }
};

gulp.task('{{example-of-task}}', ['{{name-of-task}}']);
```

- `gulp.dsConfig.browserify.src` (string|array): Path(s) to javascript to bunlde from.
- `gulp.dsConfig.browserify.dest` (string): Path for compiled javascript and source maps.
