/**
 * Commands:
 *
 * gulp test: Lint and test code
 * gulp coverage: Generate and show a coverage report
 */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var map = require('map-stream');
var runSequence = require('run-sequence');

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

gulp.task('prepare-coverage', function() {
    return gulp.src([
            'scripts/**/*.js',
        ])
        .pipe($.istanbul()); // Covering files
});

gulp.task('test-and-coverage', function() {

    return gulp.src('test/**/*.js', {
            read: false
        })
        .pipe($.mocha({
            bin: './node_modules/mocha/bin/mocha',
            reporter: 'spec'
        }))
        .pipe($.istanbul.writeReports()); // Creating coverage report
});

gulp.task('enforce-coverage', function() {
    var options = {
        thresholds: {
            statements: 90,
            branches: 90,
            lines: 90,
            functions: 90
        },
        coverageDirectory: 'coverage',
        rootDirectory: ''
    };
    return gulp
        .src('.')
        .pipe($.istanbulEnforcer(options))
        .on('error', function(err) {
            $.util.log(err.message);
            process.exit(1);
        });
});

gulp.task('coveralls', function() {
    if (process.env.NODE_ENV !== 'build') {
        return $.util.log('Not on build server: No push to coveralls.io');
    }
    return gulp.src('coverage/**/lcov.info')
        .pipe($.coveralls());
});

/**
 * Tests
 */

gulp.task('test', function(done) {
    runSequence(
        ['jshint', 'jscs', 'prepare-coverage'],
        'test-and-coverage',
        'coveralls',
        'enforce-coverage',
        done);
});

/**
 * Coverage report
 */

gulp.task('coverage', function() {
    runSequence(
        'prepare-coverage',
        'test-and-coverage',
        function() {
            var connect = require('connect');
            var serveStatic = require('serve-static');
            connect()
                .use(serveStatic('coverage/lcov-report'))
                .listen(9003);
            require('opn')('http://localhost:9003');
        });
});

/**
 * Watch
 */

gulp.task('watch-test', function(done) {
    runSequence(
        ['jshint', 'jscs', 'prepare-coverage'],
        'test-and-coverage',
        done);
});

gulp.task('watch', ['watch-test'], function() {
    gulp.watch(['scripts/**/*.js', 'test/**/*.js'], ['watch-test']);
});
