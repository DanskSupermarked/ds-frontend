# ds-lint

Compile [LESS](http://lesscss.org/).

The task includes [autoprefixer](https://github.com/postcss/autoprefixer),
source maps, minifying using
[csswring](https://www.npmjs.org/package/csswring),
pack media queries using
[css-mqpacker](https://www.npmjs.org/package/css-mqpacker) and
[revisioning](https://github.com/sindresorhus/gulp-rev).

## Config

```js
var gulp = require('gulp');
require('ds-frontend/build');

gulp.dsConfig = {
    less: {
        src: ['less/main.less', 'less/ie8.less'],
        dest: 'dist/css'
    }
};

gulp.task('build', ['ds-less']);
```

- `gulp.dsConfig.less.src` (string|array): Path(s) to less to compile from.
- `gulp.dsConfig.less.dest` (string): Path for compiled css and source maps.
