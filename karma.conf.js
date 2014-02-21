/*globals module*/
// Karma configuration
// Remember devs: export PATH="./node_modules/.bin:$PATH"

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: 'build/quarry',

        // frameworks to use
        frameworks: ['qunit'],

        // list of files / patterns to load in the browser
        files: [
            'js/jquery-2.0.3.min.js',
            'js/sha256.js',
            'js/bootstrap.min.js',
            'js/handlebars.js',
            'js/ember-1.4.0.js',
            'js/mantel.js',
            'js/quarry-data.js',
            'test/lib/jquery.mockjax.js',
            'test/quarry-test.js',
            'test/mocks/*.js',
            'js/app.js',
            'test/init.js',
            'test/templates/*.hbs',
            {
                pattern: 'images/quarry.png',
                included: false,
                served: true
            },
            {
                pattern: 'js/models.js',
                included: false,
                served: true
            },
            'test/models/*.js',
            'test/ajax/*.js',
            'test/integration/*.js'
        ],

        plugins: [
            'karma-qunit',
            'karma-ember-preprocessor',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ],

        preprocessors: {
            'test/templates/*.hbs': 'ember'
        },

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots', 'junit'],

        junitReporter: {
            outputFile: 'junit_output.xml'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        customLaunchers: {
            chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
