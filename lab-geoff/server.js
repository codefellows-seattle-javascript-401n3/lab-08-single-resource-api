'use strict';

let http = require('http');
let Router = require('./lib/router.js');

let PORT = process.env.PORT || 3000;
let router = new Router();

require('./route/book-route.js')(router);

let server = http.createServer(router.route());

server.listen(3000, () => {
  console.log('server up on ' + PORT);
});