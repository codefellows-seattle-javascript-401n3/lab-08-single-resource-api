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
  this.routes.GET[ENDPOINT] = callback;
};
Router.prototype.post = function(ENDPOINT, callback) {
  this.routes.POST[ENDPOINT] = callback;
};
Router.prototype.put = function(ENDPOINT, callback) {
  this.routes.PUT[ENDPOINT] = callback;
};
Router.prototype.delete = function(ENDPOINT, callback) {
  this.routes.DELETE[ENDPOINT] = callback;
};