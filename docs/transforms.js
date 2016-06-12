var babel = require('babel-core')
var stream = require('stream')
var browserify = require('browserify')

exports.jsx = function (entity, page, transform) {
  const id = page.nextId()

  const codeblock = entity.clone()
  codeblock.params = ['jsx']
  codeblock.type = 'codeblock'

  const s = new stream.Readable
  s._read = function () {}

  const buffers = []
  const promise = new Promise((resolve, reject) => {
    browserify(s)
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .on('data', (b) => buffers.push(b))
      .on('end', () => resolve(Buffer.concat(buffers)))
      .on('error', (err) => reject(err))
  })

  s.push(entity.cs().replace("from 'hexagon-react'", "from './hexagon-react.js'") + '\nReactDOM.render(example, document.getElementById("' + id + '"))')
  s.push(null)

  return promise.then((js) => {
    page.body.add(page.create('script').text(js, true), true)

    return page.create('div').class('hxr-example')
      .add(page.create('div').class('hxr-example-container')
        .add(page.create('div').id(id)))
      .add(page.create('div').class('hxr-example-code')
        .add(transform(codeblock)))
  })

}
