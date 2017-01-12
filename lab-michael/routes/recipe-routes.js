'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Recipe = require('../model/recipe.js');

module.exports = function(router) {
  router.get('/api/recipe', function(req, res){
    if(req.url.query.id){
      storage.fetchItem('recipe', req.url.query.id)
      .then(recipe => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(recipe));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('not found\n');
        res.end();
      });
      return;
    }
    storage.fetchAll('recipe')
    .then (_recipe => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(_recipe));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('not found\n');
      res.end();
    });
    return;
  });


  //should create a recipe on the storage
  router.post('/api/recipe', function(req, res){
    // console.log(req.body);
    try {
      var recipe = new Recipe(req.body.name, req.body.content, req.body.mealType);
      storage.createItem('recipe', recipe);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log(recipe);
      res.write(JSON.stringify(recipe));
      res.end();
    } catch(err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });

  //should delete an already existing recipe
  router.delete('/api/recipe', function(req, res){
    if(req.url.query.id){
      storage.deleteItem('recipe', req.url.query.id)
      .then(() => {
        res.writeHead(204);
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  });
};
