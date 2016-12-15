'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Note = require('../model/note.js');


module.exports = function(router){

  router.get('/api/note', function(req, res) {
    console.log('inside of the router function, note-route.js');
    if (req.url.query.id) {
      storage.fetchItem('note', req.url.query.id)
      .then(note => {
        // response.sendJSON(res, 200, note);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      })
      .catch( err => {
        console.error(err);
        // response.sendText(res, 404, 'not found');
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('note found line 24\n');
        res.end();
      });
      return;
    } else {
      if(!req.url.query.id) {
        storage.fetchAll('note')
        .then( note => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(note));
          res.end();
        })
        .catch(err => {
          console.error(err);
          res.writeHead(404, {'Content-Type':'text/plain'});
          res.write('not found line 39\n');
        });
        return;
      }
      res.writeHead(400, {'Content-Type':'text/plain'});
      res.write('bad request line 44');
      res.end();
    }
    // response.sendText(res, 400, 'bad request fetchAll');
  });

  router.post('/api/note', function(req,res) {
    try {
      var note = new Note(req.body.note, req.body.content);
      storage.createItem('note', note);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(note));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request, line50');
      res.end();
    }
  });
  router.delete('/api/note', function(req, res){
    console.log(req.body);
    if(req.body.id){
      storage.deleteItem('note', req.body.id)
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
    res.write('bad request line83');
    res.end();
  });
};
