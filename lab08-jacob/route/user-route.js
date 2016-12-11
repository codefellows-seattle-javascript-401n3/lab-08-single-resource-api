const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const User = require('../model/resource.js');

module.exports = function(router) {
  router.get('/api/users', function(req, res) {
    console.log('got to the get');
    if (req.url.query.id) {
      console.log('finally made it!');
      storage.fetchItem('users', req.url.query.id)
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

  router.post('/api/users', function(req, res) {
    console.log(req.body.username);
    try {
      var user = new User(req.body.username);
      storage.createItem('users', user);
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
