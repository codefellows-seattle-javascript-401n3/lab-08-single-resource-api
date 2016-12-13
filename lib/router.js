'use strict';

const parseJSON = require('./body-parser');
const parseURL = require('./url-parser');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};


//why are we setting callback as this??
//This registers a GET request at an endpoint (path.../user..or/car.../note) -> ie- it registers a (req, res for that endpoint).
Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
  //allows us to dynamically access a variable, NOT A STRING!
  //callback is what will handle the request/response
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};

//create a Router.route because that is what our server is expecting to be passed. the server takes a (req, res), so that is what our router.route will return! if it recieves a GET/POST/PUT/DELETE, then parse the request out and handle the resolve/reject logic:

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseJSON(req),
      parseURL(req),
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){//if that verb combo exists, then do this stuff
        this.routes[req.method][req.url.pathname](req,res);//handle the request/response
        return;
      }
      console.error('route not found');
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('no route found');
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
  };
};
