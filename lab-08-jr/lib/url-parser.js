'use strict';

//parse req.body (this is assumed to be JSON? this is moving across the stream as....whatever is set in the header?)

const parseURL = require('url').parse;
const parseQuery = require('querystring').parse;

//setting exports = a function that takes a request. the function passes the url property of the request into parseURL.
//parseQuery uses querystring to turn the query string into key value pairs
//we then promise to resolve the request itself.
module.exports = function(req) {
  req.url = parseURL(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
