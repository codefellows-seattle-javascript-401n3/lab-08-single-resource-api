'use strict';

module.exports = exports = {};

exports.sendJSON = function(res, status, data) {
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data) + '\n');
  res.end();
};

exports.sendText = function(res, status, msg) {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(msg + '\n');
  res.end();
};
