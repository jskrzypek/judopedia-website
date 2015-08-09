'use strict';

var gulp = require('gulp');
//var debug = require('gulp-debug');
var cache = require('gulp-cached');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');
var html5Lint = require('gulp-html5-lint');
var KarmaServer = require('karma').Server;

var paths = {
  //html: '',
  scss: 'scss/**/*.scss',
  js: 'js/**/*.js',
  karmaConfig: __dirname + '/karma.conf.js'
};



gulp.task('default', function() {
  // place code for your default task here
});



//gulp.task('html5-lint', function() {
//  'use strict';
//  return gulp.src(paths.html)
//      .pipe(cache('html5-lint'))
//      .pipe(html5Lint());
//});
//gulp.task('html5-lint:watch', function() {
//  gulp.watch(paths.html, ['html5-lint']);
//});



gulp.task('karma', function() {
  return new KarmaServer({
    configFile: paths.karmaConfig,
    singleRun: true
  }).start();
});
gulp.task('karma:watch', function() {
  new KarmaServer({
    configFile: paths.karmaConfig
  }).start();
});



gulp.task('jscs', function() {
  return gulp.src(paths.js)
      .pipe(cache('jscs-lint'))
      .pipe(jscs());
});
gulp.task('jscs:watch', function() {
  gulp.watch(paths.js, ['jscs']);
});



gulp.task('eslint', function() {
  return gulp.src(paths.js)
      .pipe(cache('eslint-lint'))
      // eslint() attaches the lint output to the eslint property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // Stop a task/stream if an eslint error has been reported for
      // any file, but wait for all of them to be processed first.
      .pipe(eslint.failAfterError());
});
gulp.task('eslint:watch', function() {
  gulp.watch(paths.js, ['eslint']);
});



gulp.task('scss-lint', function() {
  return gulp.src(paths.scss)
      .pipe(cache('scss-lint'))
      .pipe(scsslint({
        // if this is too low, then we get this error:
        // Error: stdout maxBuffer exceeded.
        'maxBuffer': 1000 * 1024 // Default: 300 * 1024
      }))
      .pipe(scsslint.failReporter('E'));
});
gulp.task('scss-lint:watch', function() {
  gulp.watch(paths.scss, ['scss-lint']);
});


//https://github.com/sass/node-sass#options
gulp.task('sass', function() {
  gulp.src(paths.scss)
      .pipe(sourcemaps.init())
      .pipe(sass({
        //sourceComments: true,
        outputStyle: 'compressed' // nested, expanded, compact, compressed
      }).on('error', sass.logError))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.css));
});
gulp.task('sass:watch', function() {
  gulp.watch(paths.scss, ['sass']);
});






gulp.task('js-lint', [
  'jscs',
  'eslint'
]);
gulp.task('js-lint:watch', [
  'jscs:watch',
  'eslint:watch'
]);

gulp.task('watch', [
  'karma:watch',
  'sass:watch',
  'scss-lint:watch',
  'jscs:watch',
  'eslint:watch'
]);