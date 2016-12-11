'use strict'

let response = {}

response.sendJSON = function(response, status, data) {
  response.writeHeader(status, {'Content-Type':'application/json'})
  response.write(JSON.stringify(data))
  response.write('\n')
  response.end()
}

response.sendText = function(response, status, text) {
  response.writeHeader(status, {'Content-Type':'text/plain'})
  response.write(text)
  response.end()
}

module.exports = response
