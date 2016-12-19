'use strict';

const http = require('http');

const Router = require('./lib/router.js');
// const Song = require('./model/song.js');
// const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

require('./route/song-route.js')(router);

// router.get('/api/song', function(req, res) {
//   if (req.url.query.id) {
//     storage.fetchItem('song', req.url.query.id)
//     .then( song => {
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.write(JSON.stringify(song));
//       res.end();
//     })
//     .catch( err => {
//       console.error(err);
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.write('not found');
//       res.end();
//     });
//     return;
//   }
//   console.error(err);
//   res.writeHead(400, {'Content-Type': 'text/plain'});
//   res.write('bad request');
//   res.end();
// });
//
// router.post('/api/song', function(req,res) {
//   try {
//     var song = new Song(req.body.title, req.body.artist);
//     storage.createItem('song', song);
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.write(JSON.stringify(song));
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.writeHead(400, {'Content-Type': 'text/plain'});
//     res.write('bad request');
//     res.end();
//   }
// });
//
// router.delete('/api/song', function(req, res){
//   if(req.url.query.id){
//     storage.deleteItem('song', req.url.query.id)
//     .then(() => {
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end();
//     })
//     .catch(err => {
//       console.error(err);
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.write('not found');
//       res.end();
//     });
//     return;
//   }
//   res.writeHead(400, {'Content-Type': 'text/plain'});
//   res.write('bad request');
//   res.end();
// });


const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server started on port ', PORT);
});
