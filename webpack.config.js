var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './hexagon-react.js',
  output: {
    path: 'target',
    filename: 'hexagon-react.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
}
