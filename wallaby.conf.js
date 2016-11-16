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

webpackConfig.entry = null;

webpackConfig.entryPatterns = [
  'src/app1/index.wallaby.js',
  'before-each-test.js',
  'src/**/*.spec.js'
];

function getPatterns(folder){
  return [
    {pattern: `src/${folder}/**/*.html`, load: false},
    {pattern: `src/${folder}/**/*.scss`, load: false},
    {pattern: `src/${folder}/**/*.css`, load: false},
    {pattern: `src/${folder}/**/*.js`, load: false},
    {pattern: `src/${folder}/**/*.spec.js`, ignore: true}
  ]
}

module.exports = function (wallaby) {
  var staticFiles = [
      {pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      {pattern: 'before-each-test.js', load: false},
  ];
  var files = [].concat.apply(
    staticFiles,
    [
      'core',
      'app1',
    ].map(folder => getPatterns(folder))
  );
  console.log(files);
  return {
      debug: true,
      files: files,
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
      testFramework: 'jasmine',
      bootstrap: function () {
          window.__moduleBundler.loadTests();
      }
  }
};
