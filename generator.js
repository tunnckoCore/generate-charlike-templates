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

  app.task('charlike', ['default'])
  task(app, 'default', ['**/*'], [
    'editorconfig',
    'license-mit',
    'travis'
  ])
}

function task (app, name, patterns, deps) {
  app.task(name, deps || [], function (cb) {
    var src = app.options.srcBase || path.join(__dirname, 'templates');
    return app.src(patterns, { cwd: src })
      .pipe(app.renderFile('*')).on('error', console.error)
      .pipe(app.conflicts(app.cwd)).on('error', console.error)
      .pipe(app.dest(app.cwd)).on('error', console.error)
  })
}
