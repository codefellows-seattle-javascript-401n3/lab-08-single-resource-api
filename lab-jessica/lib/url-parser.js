'use strict';

// node modules
const url = require('url');
const querystring = require('querystring');

function urlParser(req) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  return Promise.resolve(req);
}

module.exports = urlParser;
