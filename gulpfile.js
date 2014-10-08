/**
 * Commands:
 *
 * gulp test: Lint and test code
 * gulp serve: Test code and livereload
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var map = require('map-stream');

var exitCode = 0;
var totalLintErrors = 0;

process.on('exit', function() {
    process.nextTick(function() {
        var msg = 'gulp `' + gulp.seq + '` failed';
        console.log($.util.colors.red(msg));
        process.exit(exitCode);
    });
});

function lintOnEnd() {
    var errString = totalLintErrors + '';
    if (exitCode) {
        console.log($.util.colors.magenta(errString), 'errors\n');
        $.util.beep();
    }
}

gulp.task('jshint', function() {
    return gulp.src('scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(map(function(file, cb) {
            if (!file.jshint.success) {
                totalLintErrors += file.jshint.results.length;
                exitCode = 1;
            }
            cb(null, file);
        }))
        .on('end', function() {
            lintOnEnd();
            if (exitCode) {
                process.emit('exit');
            }
        });
});

gulp.task('jscs', function() {
    return gulp.src('scripts/**/*.js')
        .pipe($.jscs())
        .pipe(map(function(file, cb) {
            cb(null, file);
        }));
});

gulp.task('test', ['jshint', 'jscs'], function() {
    return gulp.src('index.html')
        .pipe($.mochaPhantomjs({
            reporter: 'spec'
        }));
});

gulp.task('serve', function(done) {
    $.livereload.listen();
    gulp.watch([
        'scripts/**/*.js',
        'test/**/*.js',
        'index.html'
    ])
        .on('change', $.livereload.changed);

    var connect = require('connect');
    var serveStatic = require('serve-static');
    connect()
        .use(serveStatic('./'))
        .listen(9003, done);
    require('opn')('http://localhost:9003');
});

gulp.task('watch', ['serve']);
gulp.task('default', ['serve']);
