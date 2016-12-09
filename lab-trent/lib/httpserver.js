'use strict';

const http = require('http');
const EE = require('events');
const getEmitter = new EE();
const putEmitter = new EE();
const delEmitter = new EE();
const postEmitter = new EE();

const requestParser = require('./requestparser');

let server = null;

http.ServerResponse.prototype.out = function(data, returnCode) {
  if (typeof data === 'object') {
    this.setHeader('Content-Type', 'application/json');
    this.write(JSON.stringify(data));
  } else if (typeof data === 'string') {
    this.setHeader('Content-Type', 'text/plain');
    this.write(data);
  }
  if (returnCode)
    this.returnCode = returnCode;
  else
    this.returnCode = 200;
};

function createServer(port, callback) {
  server = http.createServer(function(req, res) {
    requestParser.parseUrlData(req);
    requestParser.parseBody(req).then(function(err) {
      if (err) console.error(err);
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
    }).catch(function(err) {
      console.error(err);
    });
  });
  server.listen(port, callback);
}

function closeServer() {
  if (this.server)
    this.server.close();
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
  createServer: createServer,
  closeServer: closeServer,
  get: get,
  put: put,
  del: del,
  post: post,
  on: on,
};
