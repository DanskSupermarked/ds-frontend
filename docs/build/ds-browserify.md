# ds-browserify

Bundle javascript with [Browserify](http://browserify.org/).

The task includes [transform of handlebars templates](https://www.npmjs.org/package/hbsfy), uglify with [uglify-js](https://www.npmjs.org/package/uglify-js), source
maps and [revisioning](https://github.com/sindresorhus/gulp-rev).

Dependencies:

- [hbsfy](https://www.npmjs.org/package/hbsfy) to be in `package.json`
- [handlebars](https://www.npmjs.org/package/handlebars) to be in `package.json`

## Config

```js
var gulp = require('gulp');
require('ds-frontend/build');

gulp.dsConfig = {
    browserify: {
        src: ['scripts/main.js','scripts/head.js']
        dest: 'dist/scripts'
    }
};

gulp.task('build', ['ds-browserify']);
```

- `gulp.dsConfig.browserify.src` (string|array): Path(s) to javascript to bunlde from.
- `gulp.dsConfig.browserify.dest` (string): Path for compiled javascript and source maps.
