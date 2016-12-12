'use strict'

const Server = require('./server.js')
const Router = require('./lib/router')
const storage = require('./model/storage')

// this is called dependency injection
let router = new Router()
require('./routes/dog-routes')(router, storage)

// init server
const server = Server.start(router.route())

// for testing purposes
module.exports = server
