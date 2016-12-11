
const url = require('url');
const queryString = require('querystring');

module.exports = function parseUrl(req) {
  req.path = url.parse(req.url).pathname;
  req.str = req.url.split('?')[1];
  req.query = queryString.parse(req.str);
  return req;
};
