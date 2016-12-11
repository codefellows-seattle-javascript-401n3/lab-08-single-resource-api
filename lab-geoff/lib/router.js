// create a router constructor for GET, POST, PUT and DELETE requests
// create a route for CREATE, READ and DELETE operations
'use strict';

module.exports = Router;

function Router() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
}

Router.prototype.get = function(ENDPOINT, callback) {
  this.routes.GET[ENPOINT] = callback;
};