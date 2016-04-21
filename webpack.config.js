var path = require('path');

module.exports = {

  // set the context (optional)
  context: path.join( __dirname, './src'),
  // entry: 'index.js',
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname, './src'),
    filename: 'bundle.js'
  },

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: path.join( __dirname, '/src'),
    modulesDirectories: ['src', 'tests', 'node_modules'],
    extensions: ['', '.webpack.js', '.js']
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
    includePaths: [path.resolve(__dirname, "./src")]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    noInfo: false,
    hot: true
  },

  // support source maps
  devtool: "#inline-source-map"
};
