var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.plugins = [];

module.exports = function(config) {
    config.set({
        basePath: 'src/',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        port: 9876,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        autoWatchBatchDelay: 300,
        files: [
            '../node_modules/babel-polyfill/browser.js',
            'core/index.test.js',
            'app1/index.js',
            '../before-each-test.js',
            'core/**/*.spec.js',
            'core/**/*.html',
            'app1/**/*.spec.js',
            'app1/**/*.html',
        ],

        preprocessors: {
            '../before-each-test.js': ['webpack'],
            'core/**/*.spec.js': ['webpack'],
            'app1/**/*.spec.js': ['webpack'],
            'core/index.test.js': ['webpack'],
            'app1/index.js': ['webpack'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: false
        }
    });
};
