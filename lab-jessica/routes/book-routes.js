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

  //  * should return 204 status with no content in the body

  router.delete('/api/books', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('book', req.url.query.id)
      .then(() => {
        response.sendText(res, 204, 'no content in the body after a delete');
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'could not delete a file that does not exist');
      });
    }
  });
};
