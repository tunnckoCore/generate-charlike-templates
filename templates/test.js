/*!
 * <%= ask('name') %> <https://github.com/<%= ask('owner') %>/<%= ask('name') %>>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */
'use strict'

var test = require('mukla')
var <%= camelcase(ask('name')) %> = require('./index')

test('foo', function (done) {
  done()
})
