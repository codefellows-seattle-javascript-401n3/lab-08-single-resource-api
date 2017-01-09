'use strict';

const storage = require('../storage/storage');
const Recipe = require('../model/recipe');
const response = require('../lib/response-logic');

module.exports = function(router){
  router.get('/api/recipe', function(req, res){
    if(req.url.query.id){
      storage.fetchItem('recipe', req.url.query.id)
      .then(recipe => {
        console.log(recipe, recipe.name, recipe.ingredients);
        response.sendJSON(res, 200, recipe);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'nope');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/recipe', function(req, res) {
    try {
      var recipe = new Recipe(req.body.name, req.body.ingredients);
      storage.createItem('recipe', recipe);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(recipe));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });
  router.delete('/api/recipe', function(req, res){
    if(req.url.query.id){
      storage.deleteItem('recipe', req.url.query.id)
      .then(() => {
        res.writeHead(204, {
          'Content-Type': 'text/plain',
        });
        res.end();
      })
      .catch(() => {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.write('server error');
        res.end();
      });
    } else {
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });
};
