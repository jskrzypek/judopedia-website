var allTestFiles = [];
var modules = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
var SRC_REGEXP = /app\/webroot\/js\//;
var JS_REGEXP = /\.js$/;

var jsToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  } else if (SRC_REGEXP.test(file) && JS_REGEXP.test(file)) {
    modules.push(jsToModule(file));
  }
});

var startTest = function () {
  //loading all the existing requirejs src modules before
  //triggering the karma test
  require(modules, function () {
    window.__karma__.start();
  });
};

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // path translations: allow us to refer to different library dependencies, without using relative paths
  paths: {
    jquery: [
      //'//code.jquery.com/jquery-2.1.1.min',
      'app/webroot/vendors/jquery/jquery-2.1.4.min' // Fallback
    ],
    bootstrap: [
      //'//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
      'app/webroot/vendors/bootstrap/bootstrap-3.2.0.min' // Fallback
    ]
  },

  // example of using a shim, to load non AMD libraries (such as underscore)
  shim: {
    //'underscore': {
    //    exports: '_'
    //},
    'bootstrap': {
      'deps': ['jquery']
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff mocha, as it is asynchronous
  callback: startTest //window.__karma__.start

});
