'use strict'

const urlParser = require('./urlParser')
const bodyParser = require('./bodyParser')
const responseHandler = require('./responseHandler')

// create a constructor function
function Router () {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  }
}

['get', 'post', 'put', 'delete'].forEach(verb => {
  Router.prototype[verb] = function(endpoint, callback) {
    this.routes[verb.toUpperCase()][endpoint] = callback
  }
})

Router.prototype.route = function () {
  console.log('route function called')
  return (request, response) => {
    console.log('inside route handler. Handling request url:', request.url)
    Promise.all([
      urlParser(request),
      bodyParser(request),
    ]).then(() => {
      if(typeof this.routes[request.method][request.url.pathname] === 'function') {
        return this.routes[request.method][request.url.pathname](request, response)
      }

      console.error('PATH NOT FOUND FOR:', request.url.pathname)
      return responseHandler.sendText(response, 400, new Error('PATH NOT FOUND FOR:' + request.url.pathname))
    })
    .catch(error => responseHandler.sendText(response, 400, error))
  }
}

module.exports = Router
