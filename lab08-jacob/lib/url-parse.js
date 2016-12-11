
const url = require('url');
const queryString = require('querystring');

module.exports = function parseUrl(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET') {
      req.path = url.parse(req.url).pathname;
      req.str = req.url.split('?')[1];
      req.query = queryString.parse(req.str);
      resolve(req);
    }
    req.on('error', err => {
      console.error(err);
      reject(err);
    });
  });
};
