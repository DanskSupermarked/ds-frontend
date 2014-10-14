/**
 * Static syntax analysis:
 * Lint all javascript files using jshint and jscs.
 * Fail on errors.
 * Based on https://github.com/spenceralger/gulp-jshint/issues/10
 */

// Dependencies
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
    if (!gulp.dsConfig) {
        throw new $.util.PluginError('lint', '`gulp.dsConfig` was not set.');
    }
    if (!gulp.dsConfig.lint) {
        throw new $.util.PluginError('lint', '`gulp.dsConfig.lint` was not set.');
    }
    if (!gulp.dsConfig.lint.src) {
        throw new $.util.PluginError('lint', '`gulp.dsConfig.lint.src` was not set.');
    }

    return gulp.src(gulp.dsConfig.lint.src)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});
