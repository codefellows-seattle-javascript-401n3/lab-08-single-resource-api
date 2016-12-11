'use strict';

const parseURL = require ('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback; //.endpoint would be interpreted as a string, not variable
                                        //with brqcket notation
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  return(req, res) => {
    Promise.all([ //runs these promises first, before anything else
      parseURL(req),
      parseJSON(req),
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){ //removed type of and === function
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }

      console.error('route not found');
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('not found');
      res.end();

    })
    .catch( err => {
      // if parse body fails log error to server and respond 400 to user
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
  };
};
