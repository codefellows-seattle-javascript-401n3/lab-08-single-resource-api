'use strict'

const Server = require('./server.js')
const Router = require('./lib/router')
const storage = require('./model/storage')

// this is called dependency injection
let router = new Router()
require('./routes/dog-routes')(router, storage)

console.log(router)

// init server
const server = Server.start(router.route())

console.log('Check server status good =', server.listening)
