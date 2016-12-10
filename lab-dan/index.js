'use strict';

const http = require('http');
const Router = require('./lib/router');

const PORT = process.env.PORT || 3000;

// this is called dependency injection
let router = new Router();
require('./routes/dog-routes')(router);

Router.get('/cats', function(req, res) {
  res.write('meowwwwww');
  res.end();
});
