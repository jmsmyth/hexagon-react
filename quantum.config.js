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
      .then(template({
        variables: {
          baseurl: process.env.GITHUB_PAGES ? '/hexagon-react' : ''
        }
      }))
      .then(changelog())
      .then(version())
      .map(docs.populateTableOfContents())
      .map(html({ transforms: htmlTransforms }))
      .map(html.stringify())
      .map(html.htmlRenamer())
  }
}

const resources = [
  'docs/resources/**/*',
  {
    files: [
      'node_modules/hexagon-js/dist/hexagon-light/hexagon.js',
      'node_modules/hexagon-js/dist/hexagon-light/hexagon.css'
    ],
    base: 'node_modules/hexagon-js/dist/hexagon-light',
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
    files: [
      'node_modules/font-awesome/css/**/*',
      'node_modules/font-awesome/fonts/**/*'
    ],
    base: 'node_modules/font-awesome',
    dest: 'libs/font-awesome'
  }
]

module.exports = {
  pipeline: pipeline,
  pages: 'docs/pages/**/*.um',
  resources: resources,
  dest: 'target/site',
  htmlTransforms: htmlTransforms
}
