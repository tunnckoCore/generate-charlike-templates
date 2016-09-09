/*!
 * generate-charlike-templates <https://github.com/tunnckoCore/generate-charlike-templates>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')
var isValid = require('is-valid-app')

function arraify (val) {
  if (!val) return []
  if (!Array.isArray(val)) return [val]
  return val
}

module.exports = function generateCharlikeTemplates (app) {
  if (!isValid(app, 'generate-charlike-templates')) return

  /**
   * Plugins
   */

  app.use(require('generate-defaults'))
  app.use(require('generate-install'))
  app.use(function (app) {
    app.define('taskAlias', function taskAlias (name, aliases) {
      aliases = arraify(aliases)
      aliases.forEach(function (alias) {
        app.task(alias, [name])
      })
    })
    app.define('taskRender', function taskRender (name, deps, patterns) {
      // if you wanna add only `name` and `deps`,
      // use the `.task` method instead
      patterns = arguments.length === 2 ? deps : patterns
      deps = arguments.length === 2 ? [] : deps

      app.task(name, arraify(deps), function (cb) {
        var src = app.options.srcBase || path.join(__dirname, 'templates')
        return app.src(patterns, { cwd: src })
          .pipe(app.renderFile('*')).on('error', cb)
          .pipe(app.conflicts(app.cwd)).on('error', cb)
          .pipe(app.dest(app.cwd)).on('error', cb)
      })
    })
  })

  /**
   * Micro-generators (as plugins)
   */

  app.use(require('generate-gitignore'))
  app.use(require('generate-license'))
  app.use(require('generate-travis'))

  app.taskAlias('default', ['charlike', 'ch'])
  app.taskRender('default', [
    'package',
    'gitignore-node',
    'editorconfig',
    'contributing',
    'license-mit',
    'travis',
    'install'
  ], ['**/*'])

  app.taskAlias('contributing', ['contrib', 'cg'])
  app.taskRender('contributing', 'CONTRIBUTING.md')

  app.taskAlias('editorconfig', ['econfig', 'ec'])
  app.taskRender('editorconfig', '.editorconfig')

  app.taskAlias('package', ['pkg'])
  app.taskRender('package', 'package.json')
}
