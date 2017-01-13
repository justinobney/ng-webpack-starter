var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var SplitByPathPlugin = require('webpack-split-by-path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var copyIndex = new CopyWebpackPlugin([{from: './app1/index.html'}]);
var splitPath = new SplitByPathPlugin(
  [{ name: 'vendor', path: path.join(__dirname, 'node_modules') }],
  {manifest: 'app-entry'}
);
var extractCSS = new ExtractTextPlugin('[name].css');

var resolve = path.resolve;
var _slice = [].slice;
var PROJECT_PATH = resolve(__dirname, './src');

function inProject() {
  var resolved = resolve.apply(resolve, [PROJECT_PATH].concat(_slice.apply(arguments)));
  console.log('inProject', arguments, resolved);
  return resolved;
}

module.exports = {

  // set the context (optional)
  context: path.join( __dirname, './src'),
  // entry: 'index.js',
  entry: {
    app1: ['webpack/hot/dev-server', path.resolve(__dirname, './src/app1/index.js')]
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js', // filename: '[name]-[hash].js',
    chunkFilename: '[name].js' //chunkFilename: '[name]-[hash].js'
  },

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: path.join( __dirname, '/src'),
    modulesDirectories: ['src', 'tests', 'node_modules'],
    extensions: ['', '.webpack.js', '.js'],
    alias: {
      core: inProject('core'),
      app1: inProject('app1'),
    },
  },

  module: {
    loaders: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:'babel', query: { presets: ['es2015', 'stage-1'] } },

      // load css and process less
      { test: /\.css$/, loader: extractCSS.extract(["css"])},

      { test: /\.scss$/, loader: extractCSS.extract(["css", "sass"]) },

      // load JSON files and HTML
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, exclude: /node_modules/, loader:'raw' },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: 'file' },
      { test: /\.woff(2)?$/, loader: 'url?limit=8192&minetype=application/font-woff'},

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './src/core'),
      path.resolve(__dirname, './src/app1'),
    ]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: './src',
    noInfo: false,
    hot: true
  },

  plugins: [
    splitPath,
    extractCSS,
    copyIndex
    // new BundleAnalyzerPlugin()
  ],

  // support source maps
  devtool: '#inline-source-map'
};
