'use strict';

exports.sendJSON = function(res, status, data) {
  console.log('send json function');
  res.writeHead(status, {
    'Content-type': 'application/json',
  });
  res.write(JSON.stringify(data));
  res.end();
};

exports.sendText = function(res, status, string) {
  console.log('send text function');
  res.writeHead(status, {
    'Content-type': 'text/plain',
  });
  res.write(string);
  res.end();
};