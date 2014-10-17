# ds-lint

Lints javascripts using [jshint](http://www.jshint.com/) and
[jscs](https://www.npmjs.org/package/jscs).

In the root folder of your project you should include a `.jshintrc` and a
`.jscsrc` file with project specific settings for linting.

You could use Dansk Supermarkeds settings for [jscs](https://github.com/DanskSupermarked/ds-frontend/blob/master/.jscsrc) adnd [jshint](https://github.com/DanskSupermarked/ds-frontend/blob/master/.jshintrc).

## Config

```js
var gulp = require('gulp');
require('ds-frontend/build');

gulp.dsConfig = {
    lint: {
        src: 'scripts/**/*.js'
    }
}

gulp.task('lint', ['ds-lint']);
```

- `gulp.dsConfig.lint.src` (string|array): Sources to be tested. Could be any [glob](https://github.com/isaacs/node-glob) accepted by [`gulp.src`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options).
