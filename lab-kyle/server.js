const http = require('http');

const Router = require('./lib/router');

const PORT = process.env.PORT || 3000;
const router = new Router();

require('./routes/poke-routes')(router);

const server = http.createServer(router.route);

server.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
