var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './hexagon-react.jsx',
  output: {
    path: 'target',
    filename: 'hexagon-react.js'
  },
  resolve: {
    extensions: ['', 'js', 'jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
}
