'use strict';

const url = require('url');
const queryString = require('querystring');

exports.parseBody = function(req, callback) {
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
    callback(body);
  });
};

exports.parseUrlData = function(req) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
};
