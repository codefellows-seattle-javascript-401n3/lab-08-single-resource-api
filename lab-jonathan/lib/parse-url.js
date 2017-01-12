let parseUrl = require('url').parse;
let parseQuery = require('querystring').parse;

module.exports = function(req){
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
