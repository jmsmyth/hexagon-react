var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './test.js',
  output: {
    path: 'target',
    filename: 'hexagon-react.test.js'
  },
  babel: {
    presets: ['es2015']
  },
  isparta: {
    embedSource: true,
    noAutoWrap: true,
    babel: {
      presets: ['es2015']
    }
  },
  module: {
    loaders: [
      {
        test: /test.js/,
        loader: 'babel'
      },
      {
        test: /hexagon-react.js/,
        loader: 'isparta',
        ignore: /test.jsx/
      }
    ]
  },
}
