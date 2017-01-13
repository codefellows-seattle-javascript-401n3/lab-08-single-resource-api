'use strict';

const http = require('http');
const Router = require('./lib/router.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

require('./routes/recipe-routes.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, function() {
  console.log('Server is listening d(- -)b', PORT);
});

