'use strict';

module.exports = (router, storage) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('./dogs', function(req, res) {
    storage.fetchItem(item) // does this return JSON?
      .then(dogs => {
        res.writeHeader(200, {'Content-Type': 'text/plain'}); // won't this be JSON?
        res.write(dogs);
        res.end();
      })
      .catch(err => {
        res.writeHeader(400, {'Content-Type': 'text/plain'});
        res.write(err);
        res.end();
      });
  });
  router.post('./dogs', function(req, res) {
    storage.postItem(item)
      .then(() => {
        res.writeHeader(200, {'Content-Type': 'text/plain'});
        res.write('success!');
        res.end();
      })
      .catch(err => {
        res.writeHeader(400, {'Content-Type': 'text/plain'});
        res.write(err);
        res.end();
      });
  });
  router.put('./dogs', function(req, res) {
    storage.putItem(item)
      .then(() => {
        res.writeHeader(200, {'Content-Type': 'text/plain'});
        res.write('success!');
        res.end();
      })
      .catch(err => {
        res.writeHeader(400, {'Content-Type': 'text/plain'});
        res.write(err);
        res.end();
      });
  });
  router.delete('./dogs', function(req, res) {
    storage.deleteItem(item)
      .then(() => {
        res.writeHeader(200, {'Content-Type': 'text/plain'});
        res.write('success!');
        res.end();
      })
      .catch(err => {
        res.writeHeader(400, {'Content-Type': 'text/plain'});
        res.write(err);
        res.end();
      });
  });
};
