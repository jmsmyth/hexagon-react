var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: {
    'hexagon-react': './index.js',
    'demo': './demo.jsx'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', 'js', 'jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
}
