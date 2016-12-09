'use strict';

const http = require('http');
const EE = require('events');
const get = new EE();
const put = new EE();
const del = new EE();
const post = new EE();

const requestParser = require('./requestparser');

let server = null;

function createServer(port, callback) {
  server = http.createServer(function(req, res) {
    requestParser.parseUrlData(req);
    requestParser.parseBody(req, function(body) {
      switch(req.method) {
      case 'GET':
        get.emit(req.url.pathname, req, res);
        break;
      case 'PUT':
        put.emit(req.url.pathname, req, res);
        break;
      case 'DELETE':
        del.emit(req.url.pathname, req, res);
        break;
      case 'POST':
        post.emit(req.url.pathname, req, res);
        break;
      }
      req.body = body;
    });
  });
  server.listen(port, callback);
}

module.exports = {
  get, put, del, post, createServer,
};
