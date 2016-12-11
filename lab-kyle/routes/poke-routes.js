const storage = require('../lib/storage');
const response = require('../lib/response');
const Pokemon = require('../model/resource');

module.exports = function(router){
  router.get('api/pokemon', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('pokemon', req.url.query.id)
        .then( pokemon => {
          response.sendJSON(res, 200, pokemon);
        })
        .catch( err => {
          console.err(err);
          response.sendText(res, 404, 'not found');
        });
      return;
    }
    response.sendTest(res, 400, 'bad request');
  });

  router.post('api/pokemon', function(req, res) {
    try {
      var pokemon = new Pokemon(req.body.name, req.body.color);
      storage.createItem('pokemon', pokemon);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(pokemon));
      res.end();
    } catch(err) {
      console.error(err);
      res.writeHead(44, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });
};
