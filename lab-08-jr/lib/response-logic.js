'use strict';

//how to structure my export since i'm exporting 2 functions (sendJSON and sendText)?

exports.sendJSON = function(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(data));
  res.end();
};

exports.sendText = function(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'text/plain',
  });
  res.write(data);//data = response message
  res.end();
};
