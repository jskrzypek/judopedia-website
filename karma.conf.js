// Karma configuration
// Generated on Mon Jul 27 2015 17:20:40 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'requirejs',
      'mocha',
      'chai',
      'sinon'
    ],


    // list of files / patterns to load in the browser
    // NOTE: Order matters!
    files: [
      // Our source code to test
      // If using RequireJS, we don't want to include any as we should use RequireJS to load these.
      // Basically load all the files not loaded by RequireJS
      {pattern: 'js/**/*.js', included: false},

      // The tests themselves
      {pattern: 'test/**/*.js', included: false},

      // The purpose of the test-main.js file is to find and load your test files before starting Karma.
      // It connects the dots between Karma and RequireJS
      'app/Lib/karma/test-main.js'
    ],


    // list of files to exclude
    //exclude: [
    //],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/webroot/js/**/*.js': [
        // coverage is from: https://github.com/karma-runner/karma-coverage
        'coverage'
      ]
    },

    // coverage is from: https://github.com/karma-runner/karma-coverage
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // coverage is from: https://github.com/karma-runner/karma-coverage
    reporters: [
      'coverage',
      //'dots',
      //'progress',
      //'mocha',
      'nyan'
    ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS', 'Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    //singleRun: true
    singleRun: false
  });
};
