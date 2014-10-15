/**
 * Commands:
 *
 * gulp test: Lint and test code
 * gulp serve: Test code and livereload
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.dsConfig = {
    lint: {
        src: 'scripts/**/*.js'
    },
    browserify: {
        entries: './test/browserify.js',
        dest: '.tmp'
    }
};
require('./build');

gulp.task('test', ['lint', 'browserify'], function() {
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
