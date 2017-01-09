'use strict';

const http = require('http');
const Router = require('./lib/router');
const PORT = process.env.PORT || 3000;
const router = new Router();

//dependency injection (kinda like IIFE)
require('./route/recipe-route')(router);
const server = http.createServer(router.route());

//setup router.method logic. what's going on here? what does router.get take in as parameters? if resolved, what? if rejected, what?

server.listen(PORT, () => {
  console.log('serving port 3000');
});

module.exports = server;
