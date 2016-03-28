var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './test.js',
  output: {
    path: 'target',
    filename: 'hexagon-react.test.js'
  },
  resolve: {
    extensions: ['', 'js', 'jsx']
  },
  babel: {
    presets: ['es2015', 'react']
  },
  isparta: {
    embedSource: true,
    noAutoWrap: true,
    babel: {
      presets: ['es2015', 'react']
    }
  },
  module: {
    loaders: [
      {
        test: /test.js/,
        loader: 'babel'
      },
      {
        test: /.jsx?$/,
        loader: 'isparta'
      }
    ]
  },
}
