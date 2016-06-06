var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config.js');
var babel = require('babel-core');

webpackConfig.module.loaders = webpackConfig.module.loaders.filter(function (l) {
    return l.loader !== 'babel';
}).map(function(l) {
    if(l.name === 'scss' || l.name === 'css') {
        l.loader = 'null-loader'; //node-sass conflict with wallaby, so not loading styles for wallaby tests.
    }
    return l;
});

webpackConfig.entryPatterns = ['src/index.js', 'before-each-test.js', 'src/**/*.spec.js'];

module.exports = function (wallaby) {
    return {
        debug: true,
        files: [
            {pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
            {pattern: 'src/**/*.html', load: false},
            {pattern: 'src/**/*.scss', load: false},
            {pattern: 'src/**/*.css', load: false},
            {pattern: 'before-each-test.js', load: false},
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/**/*.spec.js', ignore: true}
        ],
        tests: [
            {pattern: 'src/**/*.spec.js', load: false}
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babel: babel,
                sourceMap: true,
                presets: ['es2015', 'stage-1']
            })
        },
        postprocessor: wallabyWebpack(webpackConfig),
        env: {
            type: 'browser',
            runner: require('phantomjs2').path,
            params: {runner: '--web-security=false'}
        },
        testFramework: 'jasmine',
        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    }
};
