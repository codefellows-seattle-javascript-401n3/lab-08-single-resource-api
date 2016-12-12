'use strict';


const http = require('http');
// const uuid = require('node-uuid');

const Recipe = require('./model/recipe.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

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
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
  // storage.fetchItem()
});

//should create a recipe on the storage
router.post('/api/recipe', function(req, res){
  console.log(req.body);
  try {
    var recipe = new Recipe(req.body.name, req.body.content, req.body.mealType);
    storage.createItem('recipe', recipe);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
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

const server = http.createServer(router.route());
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//   res.write(JSON.stringify({message: 'Hello World'}));
//   res.end();
// });

server.listen(PORT, function() {
  console.log('Server is listening d(- -)b', PORT);
});

// 'use strict';
//
//
// const http = require('http');
// // const uuid = require('node-uuid');
//
// const Recipe = require('./model/recipe.js');
//
// const PORT = process.env.PORT || 3000;
// const router = new Router();
// //register not routes
//
// require('./routes/recipe-routes.js')(router);
//
// const server = http.createServer(router.route());
//
// server.listen(PORT, function() {
//   console.log('Server is listening d(- -)b', PORT);
// });