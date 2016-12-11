'use strict';

let storage = require('./../lib/storage.js');
let response = require('../lib/response.js'); //does not exist yet
let Book = require('../model/book.js');

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
  router.post('api/books', function(req, res) {
    try {
      let book = new Book(req.body.name, req.body.content); //req.body.name -> something like this
      storage.createItem('book', book);
      res.writeHead(200, {
        'Content-type' : 'application/json',
      });
      res.write(JSON.stringify(book));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-type' : 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });
};