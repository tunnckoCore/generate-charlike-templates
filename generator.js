/*!
 * generate-charlike-templates <https://github.com/tunnckoCore/generate-charlike-templates>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')
var isValid = require('is-valid-app')

module.exports = function generateCharlikeTemplates (app) {
  if (!isValid(app, 'generate-charlike-templates')) return

  /**
   * Plugins
   */

  app.use(require('generate-defaults'))
  app.use(require('generate-install'))

  /**
   * Micro-generators (as plugins)
   */

  app.use(require('generate-editorconfig'))
  app.use(require('generate-license'))
  app.use(require('generate-travis'))

  task(app, 'default', ['**/*'], [
    'package',
    'editorconfig',
    'contributing',
    'license-mit',
    'travis',
    'install'
  ])

  app.task('contributing', function (cb) {
    return file(app, 'CONTRIBUTING.md', cb)
  })

  app.task('package', function (cb) {
    return file(app, 'package.json', cb)
  })
}

function task (app, name, patterns, deps) {
  app.task(name, deps || [], function (cb) {
    return file(app, patterns, cb)
  })
}

function file(app, patterns, cb) {
  var src = app.options.srcBase || path.join(__dirname, 'templates')
  return app.src(patterns || [], { cwd: src })
    .pipe(app.renderFile('*')).on('error', cb)
    .pipe(app.conflicts(app.cwd)).on('error', cb)
    .pipe(app.dest(app.cwd)).on('error', cb)
}
