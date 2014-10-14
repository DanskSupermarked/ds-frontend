/**
 * Bundle javascript with Browserify, minify and make source maps.
 * The bundeled files are split into custom scripts and a file with vendor scripts.
 */

// Dependencies
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('browserify', function() {
    if (!gulp.dsConfig) {
        throw new $.util.PluginError('browserify', '`gulp.dsConfig` was not set.');
    }
    if (!gulp.dsConfig.browserify) {
        throw new $.util.PluginError('browserify', '`gulp.dsConfig.browserify` was not set.');
    }
    if (!gulp.dsConfig.browserify.src) {
        throw new $.util.PluginError('browserify', '`gulp.dsConfig.browserify.src` was not set.');
    }
    if (!gulp.dsConfig.browserify.dest) {
        throw new $.util.PluginError('browserify', '`gulp.dsConfig.browserify.dest` was not set.');
    }

    return gulp.src(gulp.dsConfig.browserify.src)
        .pipe($.browserify({
            debug: true,
            transform: ['hbsfy']
        }))
        .pipe(gulp.dest(gulp.dsConfig.browserify.dest));
});
