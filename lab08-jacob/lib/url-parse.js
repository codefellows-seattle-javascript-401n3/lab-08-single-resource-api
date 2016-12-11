'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  console.log('parsing url...');
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  console.log('query')
  console.log(typeof req.url)
  console.log(req.url.query)
  return Promise.resolve(req);
};
