// your tests should start your server when they begin and stop your server when they finish
// write a test to ensure that your api returns a status code of 404 for routes that have not been registered
// write tests to ensure your /api/simple-resource-name endpoint responds as described for each condition below:
// GET - test 404, responds with 'not found' for valid request made with an id that was not found
// GET - test 400, responds with 'bad request' if no id was provided in the request
// GET - test 200, response body like {<data>} for a request made with a valid id
// POST - test 400, responds with 'bad request' for if no body provided or invalid body
// POST - test 200, response body like {<data>} for a post request with a valid body
//
'use strict';

let request = require('superagent');
let expect = require('chai').expect;
require('../server.js');

describe('testing the routes for book api', function() {
  let book = null;

  describe('testing POST request', function() {
    it('should add a book to storage', function(done) {
      request.post('http://localhost:3000/books')
      .send({title: 'testTitle', author: 'testAuthor'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal('testTitle');
        book = res.body;
        done();
      });
    });
  });
  describe('testing GET request', function() {
    it('should get a book from storage', function(done) {
      request.get(`http://localhost:3000/books?id=${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).to.equal(book.id);
        done();
      });
    });
  });
  describe('testing DELETE request', function() {
    it('should remove the book from storage', function(done) {
      request.delete(`http://localhost:3000/books?id=${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});