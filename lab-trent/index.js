'use strict';

const httpServer = require('./lib/httpserver');

const PORT = process.env.PORT || 3000;

httpServer.createServer(PORT, function() {
  console.log('Server listening on port: ' + PORT);
});

httpServer.get('/', function(req, res) {
  res.status = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Testing ' + req.method);
  res.end();
});
