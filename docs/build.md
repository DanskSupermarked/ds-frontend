# Build with Gulp

This includes a list of common gulp tasks used by Dansk Supermarked.

## How to use

In `gulpfile.js`:

```js
var gulp = require('gulp');
require('ds-frontend/build');

gulp.dsConfig = {
    // Configs for tasks beeing used. Read more about configs in each task
};
```

Then the ds gulp task could be used like:

```js
gulp.task('test', ['ds-lint'], function() {
    return gulp.src('test/index.html')
        .pipe($.mochaPhantomjs());
});

gulp.task('build', ['ds-browserify', 'ds-less']);
```

## Tasks

- [`ds-lint`](build/ds-lint.md): Lint javascript files
- [`ds-browserify`](build/ds-browserify.md): Bundle javascript with Browserify
- [`ds-less`](build/ds-less.md): Compile LESS

## Example

```js
// gulpfile.js
var gulp = require('gulp');
require('ds-frontend/build');

gulp.dsConfig = {
    lint: {
        src: 'scripts/**/*.js'
    },
    browserify: {
        src: ['scripts/main.js', 'scripts/head.js'],
        dest: 'dist/scripts'
    },
    less: {
        src: ['less/master.less', 'less/ie8.less'],
        dest: 'dist/css'
    }
};


gulp.task('build', ['ds-lint', 'ds-less', 'ds-browserify']);

gulp.task('watch', function() {
    gulp.watch('scripts/**/*.{js,hbs}', ['ds-lint', 'ds-browserify']);
    gulp.watch('less/**/*.less', ['ds-less']);
});
```
