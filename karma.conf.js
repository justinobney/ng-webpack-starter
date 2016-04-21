var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['progress'],
        port: 9876,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['PhantomJS2'],
        singleRun: false,
        autoWatchBatchDelay: 300,
        files: [
            'node_modules/babel-polyfill/browser.js',
            'src/index.js',
            'before-each-test.js',
            'src/**/*.spec.js',
            'src/**/*.html'
        ],

        preprocessors: {
            'before-each-test.js': ['webpack'],
            'src/**/*.spec.js': ['webpack'],
            'src/index.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: false
        }
    });
};
