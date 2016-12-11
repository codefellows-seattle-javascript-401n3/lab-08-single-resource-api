'use strict';

let querystring = require('querystring');
let url = require('url');

module.exports = function(req) {
  req.url = url.parse(req.url);
  console.log(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log(req.url.query);
  return Promise.resolve(req);
};