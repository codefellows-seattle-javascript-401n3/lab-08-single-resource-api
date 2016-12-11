'use strict';

// node modules
const http = require('http');
// npm modules
// app modules
const Song = require('./model/song.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
// module constants
const PORT = process.env.PORT || 3000;
const router = new Router();
// module logic

router.get('/api/song', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('song', req.url.query.id)
    .then( song => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(song));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  console.error(err);
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.post('/api/song', function(req,res) {
  try {
    var song = new Song(req.body.title, req.body.artist);
    storage.createItem('song', song);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(song));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server started on port ', PORT);
});
