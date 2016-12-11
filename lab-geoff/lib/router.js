// create a router constructor for GET, POST, PUT and DELETE requests
// create a route for CREATE, READ and DELETE operations
'use strict';

let parseBody = require('./parser.js');
let parseUrl = require('./parseUrl.js');

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

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseBody(req),
      parseUrl(req),
    ])
      .then(() => {
        if(this.routes[req.method][req.url.pathname]) {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        console.error('route not found');
        res.writeHead(404, {
          'Content-type': 'text/plain',
        });
        res.write('not found');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {
          'Content-type': 'text/plain',
        });
        res.write('bad request');
        res.end();
      });
  };
};