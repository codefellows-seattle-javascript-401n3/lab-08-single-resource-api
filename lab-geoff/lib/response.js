'use strict';

exports.sendJSON = function(req) {
  console.log('send json function');
};

exports.sendText = function(res, status, string) {
  console.log('send text function');
  res.writeHead(status, {
    'Content-type': 'text/plain',
  });
  res.write(string);
  res.end();
};