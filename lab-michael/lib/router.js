'use strict';


const parseBody = require('./bodyParser.js');    // PARSE INFO
const parseURL = require('./urlParser.js');

const Router = module.exports = function() {      // Router Constructor
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};
// function callback() {
//   res.write('h');
//   res.end();
// }
// if (path === '/recipes' && verb === 'GET') {
//   callback();

// }

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
} ;

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    // console.log(req);
    Promise.all([
      parseBody(req),
      parseURL(req)
    ])
    .then(() => {
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      console.log('route not found\n');
      res.writeHead(404, {
        'Content-Type': 'text/plain',

      });
      res.write('Error 404: not found\n');
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Error 400: bad request');
      res.end();

    });
  };
};
// ['get', 'post', 'put', 'delete'].forEach( verb => {
//   Router.prototype[verb] = function(endpoint, callback) {
//     this.routes[verb.toUpperCase()][ENDPOINT] = callback;
//   };
// });
module.exports = Router;
