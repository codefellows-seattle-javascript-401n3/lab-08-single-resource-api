let http = require('http');
let Router = require('./lib/router.js');
let router = new Router();
let PORT = process.env.PORT || 3000;
require('./routes/dog-routes.js')(router);



let server = http.createServer(router.route());

server.listen(3000, function(){
  console.log('server is up, listening on: ', PORT);
});
