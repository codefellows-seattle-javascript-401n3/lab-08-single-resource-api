'use strict';
// create a constructor function
function Router () {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
}
//
// Router.prototype.get = function (endpoint, callback) {
//   this.routes.GET[endpoint] = callback;
// };
//
// Router.prototype.post = function (endpoint, callback) {
//   this.routes.POST[endpoint] = callback;
// };
//
// Router.prototype.put = function (endpoint, callback) {
//   this.routes.PUT[endpoint] = callback;
// };
//
// Router.prototype.delete = function (endpoint, callback) {
//   this.routes.DELETE[endpoint] = callback;
// };

// OR

['get', 'post', 'put', 'delete'].forEach(verb => {
  Router.prototype[verb] = function(endpoint, callback) {
    this.routes[verb.toUpperCase()][endpoint] = callback;
  };
});
