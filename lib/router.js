'use strict';

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

//why are we setting callback as this??
Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};
