'use strict';

const url = require('url');
const queryString = require('querystring');

exports.parseBody = function(req) {
  return new Promise(function(res, rej) {
    try {
      let body = '';

      req.on('data', function(data) {
        body += data.toString();
      });

      req.on('end', function() {
        if (body) {
          body = JSON.parse(body);
        } else {
          body = {};
        }
        req.body = body;
        res(null);
      });
    } catch(err) {
      rej(err);
    }
  });
};

exports.parseUrlData = function(req) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
};
