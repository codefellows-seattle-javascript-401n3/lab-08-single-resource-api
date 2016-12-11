'use strict';

let http = require('http');

let PORT = process.env.PORT || 3000;
let server = http.createServer();

server.listen(3000, () => {
  console.log('server up on ' + PORT);
});