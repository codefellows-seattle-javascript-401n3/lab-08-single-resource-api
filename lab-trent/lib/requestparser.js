'use strict';

const url = require('url');
const queryString = require('querystring');

exports.parseBody = function(req) {
  return new Promise(function(res, rej) {
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
      res(body);
    });
  });
};

exports.parseUrlData = function(req) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
};
