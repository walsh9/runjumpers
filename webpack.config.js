var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: ['./game.js'],
  include: [
    './utils.js',
    './graphics.js',
    './character.js',
    './map.js',
    './screen.js',
    './screens',
    './timer.js',
    './game.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin()
  ],
  stats: {
      // Nice colored output
      colors: true
  },
  debug: true
};