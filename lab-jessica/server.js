'use strict';
// node modules
const http = require('http');
// app modules
const Router = require('./lib/router.js');
// module constants
const PORT = process.env.PORT || 3000;
const router = new Router();
// reguster routes
require('./routes/book-routes.js')(router);
// module logic
const server = http.createServer(router.route());

server.listen(PORT, function() {
  console.log('server listening on port', PORT);
});
