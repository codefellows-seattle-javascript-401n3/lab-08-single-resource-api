'use strict';

const storage = require('../lib/storage');
const response = require('../lib/response.js');
const Recipe = require('../model/recipe.js');

module.exports - function(router) {
  router.get('/api/recipe', function(req, res) {
    if( req.url.query.id) {
      storage.fetchItem('recipe', req.url.query.id)
      .then( recipe => {
        console.log(recipe.toString());
        response.sendJSON(res, 200, recipe);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found\n');
      });
      return;
    }
    response.sendText(res,400, 'bad request\n');
  });

  router.post('api/recipe', function(req,res) {
    var recipe = new Recipe(req.body.name, req.body.content); // add from constructor
    storage.createItem('recipe', recipe);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
  });
};