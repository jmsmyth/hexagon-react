var Promise = require('bluebird')

var html = require('quantum-html')
var api = require('quantum-api')
var version = require('quantum-version')
var template = require('quantum-template')
var changelog = require('quantum-changelog')
var docs = require('quantum-docs')
var site = require('./docs/transforms')
var codeHighlight = require('quantum-code-highlight')

var htmlTransforms = {
  html: html.transforms,
  api: api(),
  changelog: changelog.transforms(),
  docs: docs(),
  codeHighlight: codeHighlight(),
  site: site
}

function pipeline () {
  return function (obj) {
    return Promise.resolve(obj)
      .then(template())
      .then(changelog())
      .then(version())
      .map(docs.populateTableOfContents())
      .map(html({ transforms: htmlTransforms }))
      .map(html.stringify())
      .map(html.htmlRenamer())
  }
}

module.exports = {
  pipeline: pipeline,
  pages: 'docs/pages/**/*.um',
  resources: [
    'docs/resources/**/*',
    {
      files: 'bower_components/hexagon-js/dist/hexagon-light/**/*',
      dest: 'libs/hexagon-js'
    },
    {
      files: 'node_modules/react-dom/dist/**/*',
      dest: 'libs/react-dom'
    },
    {
      files: 'node_modules/react/dist/**/*',
      dest: 'libs/react'
    },
    {
      files: 'bower_components/font-awesome',
      dest: 'libs/font-awesome'
    }
  ],
  dest: 'target/site',
  htmlTransforms: htmlTransforms
}
