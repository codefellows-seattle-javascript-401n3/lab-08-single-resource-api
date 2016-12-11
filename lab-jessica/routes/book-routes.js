'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Book = require('../model/book.js');

module.exports = function(router){
  router.get('/api/books', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('book', req.url.query.id)
      .then( book => {
        response.sendJSON(res, 200, book);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/books', function(req, res) {
    try {
      var book = new Book(req.body.title, req.body.author);
      storage.createItem('book', book);
      response.sendJSON(res, 200, book);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  
};
