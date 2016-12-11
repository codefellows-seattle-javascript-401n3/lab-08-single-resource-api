const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const User = require('../model/resource.js');

module.exports = function(router) {
  router.get('/api/user', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('user', req.url.id)
      .then(user => {
        response.sendJSON(res, 200, user);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/user', function(req, res) {
    try {
      var user = new User(req.body.name);
      storage.createItem('user', user);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(user));
      res.end();
    } catch (err) {
      console.error(err);
      res.writehead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('you can\'t post that smut!');
      res.end();
    }
  });
};
