/**
 * Compile less files into a css file using autoprefix for CSS3 prefixes.
 * Inlcude source maps for debugging
 */

// Dependencies
var path = require('path');
var gulp = require('gulp');
var csswring = require('csswring');
var mqpacker = require('css-mqpacker');
var autoprefixer = require('autoprefixer-core');
var $ = require('gulp-load-plugins')();

gulp.task('ds-less', function(done) {
    if (!gulp.dsConfig) {
        throw new $.util.PluginError('ds-less', '`gulp.dsConfig` was not set.');
    }
    if (!gulp.dsConfig.less) {
        throw new $.util.PluginError('ds-less', '`gulp.dsConfig.less` was not set.');
    }
    if (!gulp.dsConfig.less.src) {
        throw new $.util.PluginError('ds-less', '`gulp.dsConfig.less.src` must be an Array.');
    }
    if (!gulp.dsConfig.less.dest) {
        throw new $.util.PluginError('ds-less', '`gulp.dsConfig.less.dest` was not set.');
    }

    if (typeof gulp.dsConfig.less.src === 'string') {
        gulp.dsConfig.less.src = [gulp.dsConfig.less.src];
    }

    var count = 0;

    gulp.dsConfig.less.src.forEach(function(entry) {

        gulp.src(entry)
            .pipe($.sourcemaps.init())
            .pipe($.less())
            .pipe($.concat(path.basename(entry)))
            .pipe($.postcss([autoprefixer(), mqpacker, csswring]))
            .pipe($.rename({
                extname: '.css'
            }))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(gulp.dsConfig.less.dest))
            .pipe($.filter('*.css'))
            .pipe($.rev())
            .pipe(gulp.dest(gulp.dsConfig.less.dest))
            .pipe($.rev.manifest())
            .pipe($.rename({
                basename: path.basename(entry, '.less'),
                suffix: '.css.rev'
            }))
            .pipe(gulp.dest(gulp.dsConfig.less.dest))
            .on('end', function() {
                count++;
                if (count >= gulp.dsConfig.less.src.length) {
                    done();
                }
            });
    });
});
