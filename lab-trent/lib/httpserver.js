'use strict';

const http = require('http');
const EE = require('events');
const getEmitter = new EE();
const putEmitter = new EE();
const delEmitter = new EE();
const postEmitter = new EE();

const requestParser = require('./requestparser');

let server = null;

function createServer(port, callback) {
  server = http.createServer(function(req, res) {
    requestParser.parseUrlData(req);
    requestParser.parseBody(req, function(body) {
      switch(req.method) {
      case 'GET':
        getEmitter.emit(req.url.pathname, req, res);
        break;
      case 'PUT':
        putEmitter.emit(req.url.pathname, req, res);
        break;
      case 'DELETE':
        delEmitter.emit(req.url.pathname, req, res);
        break;
      case 'POST':
        postEmitter.emit(req.url.pathname, req, res);
        break;
      }
      req.body = body;
    });
  });
  server.listen(port, callback);
}

function get(path, callback) {
  getEmitter.on(path, callback);
}

function put(path, callback) {
  putEmitter.on(path, callback);
}

function del(path, callback) {
  delEmitter.on(path, callback);
}

function post(path, callback) {
  postEmitter.on(path, callback);
}

function on(path, callback) {
  getEmitter.on(path, callback);
  postEmitter.on(path, callback);
  delEmitter.on(path, callback);
  putEmitter.on(path, callback);
}

module.exports = {
  get, put, del, post, on, createServer,
};
