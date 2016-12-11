'use strict'

const http = require('http')

const PORT = process.env.PORT || 3000

function start (router) {
  let server = http.createServer(router)
  server.listen(PORT, () => console.log('Server started on PORT:', PORT))
  return server
}

module.exports.start = start
