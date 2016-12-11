'use strict';

const http = require('http');
const Note = require('./model/note.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

require('./route/note-route.js')(router);

const server = http.createServer(router.route());
server.listen(PORT, function(){
  console.log('server is running', PORT);
});
