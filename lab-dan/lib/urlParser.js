'use strict'

const parse = require('url').parse

module.exports = function(request) {
  request.url = parse(request.url, true)
  return Promise.resolve(request)
}
