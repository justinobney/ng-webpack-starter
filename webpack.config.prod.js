var path = require('path');
var SplitByPathPlugin = require('webpack-split-by-path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  // set the context (optional)
  context: path.join( __dirname, './src'),
  // entry: 'index.js',
  entry: {
    app1: path.resolve(__dirname, './src/app1/index.js')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js", // filename: "[name]-[hash].js",
    chunkFilename: "[name].js" //chunkFilename: "[name]-[hash].js"
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
      { test: /\.js$/, exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },

      // load css and process less
      { test: /\.css$/, loader: "style!css"},

      { test: /\.scss$/, loaders: ["style", "css", "sass"] },

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
      { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "./src/core"),
      path.resolve(__dirname, "./src/app1"),
    ]
  },

  plugins: [
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: path.join(__dirname, 'node_modules')
      }
    ], {
      manifest: 'app-entry'
    })
  ],

  // support source maps
  devtool: "#inline-source-map"
};
