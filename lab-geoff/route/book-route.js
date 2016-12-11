'use strict';

let storage = require('./model/storage.js');
let response = require('./lib/response.js'); //does not exist yet
let book = require('./model/book.js');

module.exports = function(router) {
  router.get('api/books', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('books', req.url.query.id)
        .then(book => {
          response.sendJSON(res, 200, book);
        })
        .catch(err => {
          console.error(err);
          response.sendText(res, 404, 'not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
  // router.post()
};