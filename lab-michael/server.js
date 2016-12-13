'use strict';


const http = require('http');
// const uuid = require('node-uuid');

// const Recipe = require('./model/recipe.js');
const Router = require('./lib/router.js');
// const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

require('./model/recipe.js')(router);

const server = http.createServer(router.route());
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//   res.write(JSON.stringify({message: 'Hello World'}));
//   res.end();
// });

server.listen(PORT, function() {
  console.log('Server is listening d(- -)b', PORT);
});

