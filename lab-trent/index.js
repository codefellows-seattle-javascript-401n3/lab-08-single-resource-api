'use strict';

const httpServer = require('./lib/httpserver');

const PORT = process.env.PORT || 3000;

httpServer.createServer(PORT, function() {
  console.log('Server listening on port: ' + PORT);
});

httpServer.on('/', function(req, res) {
  res.out('Testing out method.');
  res.end();
});
