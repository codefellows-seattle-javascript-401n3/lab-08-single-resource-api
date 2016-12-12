'use strict';

const Song = require('../model/song.js');
const storage = require('../lib/storage.js');
const response = require('../lib/response.js');

module.exports = function(router){
  router.get('/api/song', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('song', req.url.query.id)
      .then( song => {
        response.sendJSON(res, 200, song);
        // res.writeHead(200, {'Content-Type': 'application/json'});
        // res.write(JSON.stringify(song));
        // res.end();
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
        // res.writeHead(404, {'Content-Type': 'text/plain'});
        // res.write('not found');
        // res.end();
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
    // console.error(err);
    // res.writeHead(400, {'Content-Type': 'text/plain'});
    // res.write('bad request');
    // res.end();
  });

  router.post('/api/song', function(req,res) {
    try {
      var song = new Song(req.body.title, req.body.artist);
      storage.createItem('song', song);
      response.sendJSON(res, 200, song);
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.write(JSON.stringify(song));
      // res.end();
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
      // res.writeHead(400, {'Content-Type': 'text/plain'});
      // res.write('bad request');
      // res.end();
    }
  });

  router.delete('/api/song', function(req, res){
    if(req.url.query.id){
      storage.deleteItem('song', req.url.query.id)
      .then(() => {
        response.sendText(res, 204, 'no content');
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        // res.end();
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
        // res.writeHead(404, {'Content-Type': 'text/plain'});
        // res.write('not found');
        // res.end();
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
    // res.writeHead(400, {'Content-Type': 'text/plain'});
    // res.write('bad request');
    // res.end();
  });
};
