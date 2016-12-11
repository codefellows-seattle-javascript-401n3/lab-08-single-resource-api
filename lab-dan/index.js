'use strict'

const http = require('http') // am I integrating my server.js into my index.js file this time?

const Router = require('./lib/router')
const storage = require('./lib/storage')

const PORT = process.env.PORT || 3000

// this is called dependency injection
let router = new Router()
require('./routes/dog-routes')(router, storage)



// this is an example -- delete
// Router.get('/cats', function(req, res) {
//   res.write('meowwwwww');
//   res.end();
// });
