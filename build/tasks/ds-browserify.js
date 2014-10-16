/**
 * Bundle javascript with Browserify, minify and make source maps.
 * The bundeled files are split into custom scripts and a file with vendor scripts.
 */

// Dependencies
var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var hbsfy = require('hbsfy');
var moldSourceMap = require('mold-source-map');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();

gulp.task('ds-browserify', function(done) {
    if (!gulp.dsConfig) {
        throw new $.util.PluginError('ds-browserify', '`gulp.dsConfig` was not set.');
    }
    if (!gulp.dsConfig.browserify) {
        throw new $.util.PluginError('ds-browserify', '`gulp.dsConfig.browserify` was not set.');
    }
    if (!gulp.dsConfig.browserify.src) {
        throw new $.util.PluginError('ds-browserify', '`gulp.dsConfig.browserify.src` must be an Array.');
    }
    if (!gulp.dsConfig.browserify.dest) {
        throw new $.util.PluginError('ds-browserify', '`gulp.dsConfig.browserify.dest` was not set.');
    }

    if (typeof gulp.dsConfig.browserify.src === 'string') {
        gulp.dsConfig.browserify.src = [gulp.dsConfig.browserify.src];
    }

    var count = 0;

    gulp.dsConfig.browserify.src.forEach(function(entry) {
        var basename = path.basename(entry, '.js');
        browserify({
            entries: entry,
            debug: true
        })
            .transform(hbsfy)
            .bundle()
            .pipe(moldSourceMap.transformSourcesRelativeTo(gulp.dsConfig.browserify.dest))
            .pipe(source(basename + '.js'))
            .pipe($.buffer())
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe($.uglify())
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(gulp.dsConfig.browserify.dest))
            .pipe($.filter(['*.js']))
            .pipe($.rev())
            .pipe(gulp.dest(gulp.dsConfig.browserify.dest))
            .pipe($.rev.manifest())
            .pipe($.rename({
                basename: basename,
                suffix: '.js.rev'
            }))
            .pipe(gulp.dest(gulp.dsConfig.browserify.dest))
            .on('end', function() {
                count++;
                if (count >= gulp.dsConfig.browserify.src.length) {
                    done();
                }
            });
    });
});
